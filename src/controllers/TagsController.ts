import { Request, Response } from "express";
import Tag from "../models/tags";

export default class TagsController {
  static async create(req: Request, res: Response) {
    const { name, color, createdBy } = req.body;
    const userId = req.userId;

    try {
      const existingTag = await Tag.findOne({ name: name, createdBy: userId });

      if (existingTag) {
        return res.status(400).json({ message: "Já existe essa tag para esse usuário" });
      }

      const newTag = new Tag({ name, color, createdBy: userId });

      await newTag.save();
      return res
        .status(201)
        .json({ message: "Tag criada com sucesso!", tag: newTag });
    } catch (error) {
      console.log(`error: ${error}`);
      return res.status(500).json({ message: "Error ao criar tag" });
    }
  }

  static async getAll(req: Request, res: Response) {
    const userId = req.userId;
    
    try {
      const tags = await Tag.find({createdBy: userId });
      return res
        .status(200)
        .json({ message: "Tags recuperadas com sucesso!", tag: tags });
    } catch (error) {
      console.log(`error: ${error}`);
      return res.status(500).json({ message: "Erro ao recuperar Tags" });
    }
  }

  static async getFindById(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const tag = await Tag.findById(id);

      return res
        .status(200)
        .json({ message: "Tag recuperada com sucesso!", tag: tag });
    } catch (error: any) {
      if (error.name === "CastError") {
        return res.status(404).json({ message: "ID inválido!" });
      }

      console.log(`error: ${error}`);
      res.status(500).json({ message: "Erro ao recuperar a tag" });
    }
  }

  static async update(req: Request, res: Response) {
    const { id } = req.params;
    const updateData = req.body;
    try {
      const updatedTag = await Tag.findByIdAndUpdate(id, updateData, {
        new: true,
        runValidators: true,
      });

      return res
        .status(200)
        .json({ message: "Tag atualizada com sucesso!", tag: updatedTag });
    } catch (error: any) {
      if (error.name === "CastError") {
        return res.status(404).json({ message: "Tag não encontrada" });
      }
      console.log(`error: ${error}`);
      res.status(500).json({ message: "Erro ao atualizar a tag" });
    }
  }

  static async delete(req: Request, res: Response) {
    const { id } = req.params;
    try {
      await Tag.findByIdAndDelete(id);

      return res.status(200).json({ message: "Tag deletada com sucesso!" });
    } catch (error: any) {
      if (error.name === "CastError") {
        return res.status(404).json({ message: "Tag não encontrada" });
      }
      console.log(`error: ${error}`);
      return res.status(500).json({ message: "Erro ao deletar tag" });
    }
  }
}
