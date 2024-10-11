import { Request, Response } from "express";
import Task from "../models/task";
import Tags from "../models/tags";

export default class TaskController {
  static async create(req: Request, res: Response) {
    try {
      const { title, status, description, priority, tags, createdBy } =
        req.body;

      const createdTags: string[] = [];

      for (let i = 0; i < tags.length; i++) {
        const name = tags[i].name;
        const color = tags[i].color;

        const existingTag = await Tags.findOne({ name });
        console.log(existingTag);

        if (existingTag) {
          createdTags.push(existingTag._id.toString());
        } else {
          const newTag = new Tags({ name, color });
          await newTag.save();
          createdTags.push(newTag._id.toString());
        }
      }

      const newtask = new Task({
        title,
        status,
        description,
        priority,
        tags: createdTags,
        createdBy,
      });

      await newtask.save();
      res
        .status(201)
        .json({ message: "Tarefa criada com sucesso!", task: newtask });
    } catch (error) {
      console.log(`error: ${error}`);
      return res.status(500).json({ message: "Erro ao criar tarefa" });
    }
  }

  static async getAll(req: Request, res: Response) {
    try {
      const tasks = await Task.find().populate({
        path: "tags",
        select: "name",
      });
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
    try {
      const task = await Task.findById(id).populate({
        path: "tags",
        select: "name",
      });

      return res
        .status(200)
        .json({ message: "Tarefa recuperada com sucesso!", task: task });
    } catch (error: any) {
      if (error.name === "CastError") {
        return res.status(404).json({ message: "Tarefa não encontrada" });
      }
      console.log(`error: ${error.name}`);
      return res.status(500).json({ message: "Erro ao recuperar tarefa" });
    }
  }

  static async tasksByTag(req: Request, res: Response) {
    const { tags } = req.body;

    try {
      const tagNames = tags.map((tag: { name: string }) => tag.name);
      const foundTags = await Tags.find({ name: { $in: tagNames } });
      const tagIds = foundTags.map((tag) => tag._id);

      const tasks = await Task.find({ tags: { $in: tagIds } }).populate({
        path: "tags",
        select: "name",
      });


      if (tasks.length === 0) {
        return res.status(404).json({ message: "Nenhuma tarefa encontrada" });
      }

      return res
        .status(200)
        .json({ message: "tarefas encontradas com sucesso!", tasks: tasks });
    } catch (error) {
      console.log(`error: ${error}`);
      return res.status(500).json({ message: "Erro ao recuperar tarefas" });
    }
  }

  static async update(req: Request, res: Response) {}

  static async delete(req: Request, res: Response) {}
}
