import { Request, Response } from "express";
import User from "../models/users";

export default class UserController {
  static async create(req: Request, res: Response) {
    const { email, password } = req.body;

    try {
      const existingEmail = await User.findOne({ email });
      if (existingEmail) {
        return res
          .status(400)
          .json({ message: "Usuário com esse email já cadastrado" });
      }

      const newUser = new User({
        email,
        password,
      });

      await newUser.save();

      return res.status(201).json({ message: "Usuário criado com sucesso!" });
    } catch (error) {
      console.log(`error: ${error}`);
      return res.status(500).json({ message: "Erro ao criar Usuário" });
    }
  }

  static async getAll(req: Request, res: Response) {
    try {
      const Users = await User.find();
      return res
        .status(200)
        .json({ message: "Usuários recuperados com sucesso!", Users: Users });
    } catch (error) {
      console.log(`error: ${error}`);
      return res.status(500).json({ message: "Erro ao recuperar usuários" });
    }
  }

  static async getUserById(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const user = await User.findById(id);

      return res
        .status(200)
        .json({ message: "Usuário recuperado com sucesso!", user: user });
    } catch (error: any) {
      if (error.name === "CastError") {
        return res.status(404).json({ message: "ID inválido!" });
      }

      console.log(`error: ${error}`);
      res.status(500).json({ message: "Erro ao recuperar Usuário" });
    }
  }

  static async update(req: Request, res: Response) {
    const { id } = req.params;
    const updateData = req.body;
    try {

      if (updateData.email) {
        const existingUser = await User.findOne({ email: updateData.email });

        if (existingUser && existingUser._id.toString() !== id) {
          return res
            .status(400)
            .json({ message: "Email já cadastrado por outro usuário!" });
        }
      }

      const updatedUser = await User.findByIdAndUpdate(id, updateData, {
        new: true,
        runValidators: true,
      });

      return res.status(200).json({
        message: "Usuário atualizado com sucesso!",
        user: updatedUser,
      });
    } catch (error: any) {
      if (error.name === "CastError") {
        return res.status(404).json({ message: "ID inválido!" });
      }
      console.log(`error: ${error}`);
      res.status(500).json({ message: "Erro ao atualizar Usuário" });
    }
  }

  static async delete(req: Request, res: Response) {
    const { id } = req.params;

    try {
      await User.findByIdAndDelete(id);

      return res.status(200).json({ message: "Usuário deletado com sucesso!" });
    } catch (error: any) {
      if (error.name === "CastError") {
        return res.status(404).json({ message: "Usuário não encontrada" });
      }
      console.log(`error: ${error}`);
      return res.status(500).json({ message: "Erro ao deletar Usuário" });
    }
  }
}
