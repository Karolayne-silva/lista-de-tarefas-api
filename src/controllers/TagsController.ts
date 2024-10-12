import { Request, Response } from "express";
import Tag from "../models/tags";
import TagService from "../services/TagService";

export default class TagsController {
  static async create(req: Request, res: Response) {
    const { name, color } = req.body;
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({ message: "Usuário não autenticado." });
    }

    try {
      const newTag = await TagService.createTag(userId, name, color);
      return res
        .status(201)
        .json({ message: "Tag criada com sucesso!", tag: newTag });
    } catch (error: any) {
      if (error.message === "Já existe essa tag para esse usuário") {
        res.status(400).json({ message: error.message });
      }
      console.log(`error: ${error}`);
      return res.status(500).json({ message: "Error ao criar tag" });
    }
  }

  static async getAll(req: Request, res: Response) {
    const userId = req.userId;
    if (!userId) {
      return res.status(401).json({ message: "Usuário não autenticado." });
    }

    try {
      const tags = await TagService.getAllTags(userId);
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
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({ message: "Usuário não autenticado." });
    }

    try {
      const tag = await TagService.getTagById(id);

      if (!tag || tag.createdBy.toString() !== userId) {
        return res.status(404).json({ message: "Tag não encontrada" });
      }

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
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({ message: "Usuário não autenticado." });
    }

    try {
      const tag = await TagService.updateTag(id, userId, updateData);

      return res
        .status(200)
        .json({ message: "Tag atualizada com sucesso!", tag });
    } catch (error: any) {
      if (error.message === "Tag não encontrada") {
        return res.status(404).json({ message: error.message });
      }
      if (error.name === "CastError") {
        return res.status(404).json({ message: "Tag não encontrada" });
      }
      console.log(`error: ${error}`);
      res.status(500).json({ message: "Erro ao atualizar a tag" });
    }
  }

  static async delete(req: Request, res: Response) {
    const { id } = req.params;
    const userId = req.userId;
    if (!userId) {
      return res.status(401).json({ message: "Usuário não autenticado." });
    }
    
    try {
      await TagService.deleteTag(id, userId);

      return res.status(200).json({ message: "Tag deletada com sucesso!" });
    } catch (error: any) {
      if (error.message === "Tag não encontrada") {
        return res.status(404).json({ message: error.message });
      }
      if (error.name === "CastError") {
        return res.status(404).json({ message: "Tag não encontrada" });
      }
      console.log(`error: ${error}`);
      return res.status(500).json({ message: "Erro ao deletar tag" });
    }
  }
}
