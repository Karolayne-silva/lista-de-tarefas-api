import Task from "../models/task";
import Tags from "../models/tags";
import User from "../models/users";

export interface ITaskCreate {
  title: string;
  status: "Para fazer" | "Em andamento" | "Finalizado";
  description: string;
  priority: number;
  tags: ITagCreate[];
  createdBy: string;
}

export interface ITagCreate {
  name: string;
  color: string;
  createdBy: string;
}

class TaskService {
  async createTask(taskData: ITaskCreate, userId: string) {
    const { title, status, description, priority, tags} = taskData;

    const createdTags: string[] = [];
    
    if(tags){
      for (let i = 0; i < tags.length; i++) {
        const name = tags[i].name;
        const color = tags[i].color;
  
        const existingTag = await Tags.findOne({ name });
  
        if (existingTag) {
          createdTags.push(existingTag._id.toString());
        } else {
          const newTag = new Tags({ name, color, createdBy: userId });
          await newTag.save();
          createdTags.push(newTag._id.toString());
        }
      }
    }
    

    const newtask = new Task({
      title,
      status,
      description,
      priority,
      tags: createdTags,
      createdBy: userId,
    });

    await newtask.save();

    await User.findByIdAndUpdate(
      userId,
      { $push: { tasks: newtask._id } },
      { new: true }
    );

    return newtask;
  }

  async getAllTasks(userId: string) {
    const tasks = await Task.find({ createdBy: userId }).populate({
      path: "tags",
      select: "name",
    });
    return tasks;
  }

  async getTaskById(id: string) {
    const task = await Task.findById(id).populate({
      path: "tags",
      select: "name",
    });

    return task;
  }

  async getTasksByTags(
    tags: { name: string; color: string }[],
    userId: string
  ) {
    const tagNames = tags.map((tag: { name: string }) => tag.name);
    const foundTags = await Tags.find({ name: { $in: tagNames } });
    const tagIds = foundTags.map((tag) => tag._id);

    const tasks = await Task.find({
      createdBy: userId,
      tags: { $in: tagIds },
    }).populate({
      path: "tags",
      select: "name",
    });

    if (tasks.length === 0) {
      throw new Error("Nenhuma tarefa encontrada");
    }

    return tasks;
  }

  async updateTask(
    id: string,
    userId: string,
    updateData: {
      title: string;
      status: string;
      description: string;
      priority: number;
    }
  ) {
    const task = await Task.findOne({ _id: id, createdBy: userId });

    if (!task) {
      throw new Error("Tarefa não encontrada");
    }

    const updatedTag = await Task.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    return updatedTag;
  }

  async deleteTask(id: string, userId: string) {
    const task = await Task.findOne({ _id: id, createdBy: userId });

    if (!task) {
      throw new Error("Tarefa não encontrada!")
    }
    await Task.findByIdAndDelete(id);

    return task;
  }
}

export default new TaskService();
