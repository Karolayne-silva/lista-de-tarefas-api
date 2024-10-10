import {Schema, model} from "mongoose";
import { ITags } from "../models/tags";

interface ITask{
 title: string;
 status:  'Para fazer' | 'Em andamento' | 'Finalizado';
 description: string;
 priority: number;
 tags: ITags[];
}

export const taskSchema = new Schema<ITask>({
   title: {type: String, required: true},
   status: {type: String, required: true, enum: ['Para fazer', 'Em andamento', 'Finalizado']},
   description: {type: String},
   priority: {type: Number, required: true, min: 1, max: 10},
   tags: [{ type: Schema.Types.ObjectId, ref: 'Tag' }]
}, {
   timestamps: true
})

const Task = model<ITask>('Task', taskSchema);
export default Task;