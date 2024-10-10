import mongoose, { Schema, model } from "mongoose";

interface ITask {
  title: string;
  status: "Para fazer" | "Em andamento" | "Finalizado";
  description: string;
  priority: number;
  tags: mongoose.Types.ObjectId[];
  createdBy: mongoose.Types.ObjectId;
}

export const taskSchema = new Schema<ITask>(
  {
    title: { type: String, required: true },
    status: {
      type: String,
      required: true,
      enum: ["Para fazer", "Em andamento", "Finalizado"],
    },
    description: { type: String },
    priority: { type: Number, required: true, min: 1, max: 10 },
    tags: [{ type: mongoose.Schema.Types.ObjectId, ref: "Tag" }],
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  {
    timestamps: true,
  }
);

const Task = model<ITask>("Task", taskSchema);
export default Task;
