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

  static async getAll(req: Request, res: Response) {}

  static async getFindById(req: Request, res: Response) {}

  static async getAllByTag(req: Request, res: Response) {}

  static async update(req: Request, res: Response) {}

  static async delete(req: Request, res: Response) {}
}
