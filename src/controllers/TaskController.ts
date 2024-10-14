import { Request, Response } from "express";
import TaskService from "../services/TaskService";

export default class TaskController {
  static async create(req: Request, res: Response) {
    const { title, status, description, priority, tags } = req.body;
    const userId = req.userId;

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    try {
      const taskData = {
        title,
        status,
        description,
        priority,
        tags,
        createdBy: userId,
      };

      const newtask = await TaskService.createTask(taskData, userId);

      res
        .status(201)
        .json({ message: "Tarefa criada com sucesso!", task: newtask });
    } catch (error) {
      console.log(`error: ${error}`);
      return res.status(500).json({ message: "Erro ao criar tarefa" });
    }
  }

  static async getAll(req: Request, res: Response) {
    const userId = req.userId;
    if (!userId) {
      return res.status(401).json({ message: "Usuário não autenticado." });
    }

    try {
      const tasks = await TaskService.getAllTasks(userId);

      return res
        .status(200)
        .json({ message: "Tarefas recuperadas com sucesso!", task: tasks });
    } catch (error) {
      console.log(`error: ${error}`);
      return res.status(500).json({ message: "Erro ao recuperar tarefas!" });
    }
  }

  static async getFindById(req: Request, res: Response) {
    const { id } = req.params;
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({ message: "Usuário não autenticado." });
    }

    try {
      const task = await TaskService.getTaskById(id);

      if (!task || task.createdBy.toString() !== userId) {
        return res.status(404).json({ message: "Tarefa não encontrada!" });
      }

      return res
        .status(200)
        .json({ message: "Tarefa recuperada com sucesso!", task: task });
    } catch (error: any) {
      if (error.name === "CastError") {
        return res.status(404).json({ message: "ID inválido" });
      }
      console.log(`error: ${error.name}`);
      return res.status(500).json({ message: "Erro ao recuperar tarefa" });
    }
  }

  static async tasksByTag(req: Request, res: Response) {
    const { tags } = req.body;
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({ message: "Usuário não autenticado." });
    }

    try {
      const tasks = await TaskService.getTasksByTags(tags, userId);

      if (!tasks) {
        return res.status(404).json({ message: "Nenhuma tarefa encontrada" });
      }
      return res
        .status(200)
        .json({ message: "tarefas encontradas com sucesso!", tasks: tasks });
    } catch (error: any) {
      console.log(`Error: ${error}`);
      return res.status(500).json({ message: "Erro ao recuperar tarefas" });
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
      const task = await TaskService.updateTask(id, userId, updateData);

      return res
        .status(200)
        .json({ message: "Tarefa atualizada com sucesso!", task });
    } catch (error: any) {
      if (error.message === "Tag não existe e não pode ser atribuida") {
        return res.status(404).json({ message: error.message });
      }
      if (error.message === "Tarefa não encontrada") {
        console.log("entrou aqui");
        return res.status(404).json({ message: "Tarefa não encontrada" });
      }
      console.log(`error: ${error}`);
      res.status(500).json({ message: "Erro ao atualizar a tarefa" });
    }
  }

  static async delete(req: Request, res: Response) {
    const { id } = req.params;
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({ message: "Usuário não autenticado." });
    }

    try {
      const task = await TaskService.deleteTask(id, userId);

      return res.status(200).json({ message: "Tarefa deletada com sucesso!" });
    } catch (error: any) {
      if (error.message === "Tarefa não encontrada!") {
        console.log("entrou aq tbm");
        return res.status(404).json({ message: error.message });
      }
      console.log(`error: ${error}`);
      return res.status(500).json({ message: "Erro ao deletar tarefa" });
    }
  }
}
