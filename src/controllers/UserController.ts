import { Request, Response } from "express";
import User from "../models/users";
import UserService from "../services/UserService";

export default class UserController {
  static async create(req: Request, res: Response) {
    const { email, password } = req.body;

    try {
      const newUser = await UserService.createUser(email, password);

      return res
        .status(201)
        .json({ message: "Usuário criado com sucesso!", newUser });
    } catch (error: any) {
      if (error.message === "Usuário com esse email já cadastrado.") {
        return res.status(400).json({ message: error.message });
      }
      console.log(`Error: ${error}`);
      return res.status(500).json({ message: "Erro ao criar Usuário" });
    }
  }

  static async getAll(req: Request, res: Response) {
    try {
      const Users = await UserService.getAllUsers();

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
      const user = await UserService.getUserById(id);

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
      const updatedUser = await UserService.updateUser(id, updateData);

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
      await UserService.deleteUser(id);

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
