import {Schema, model} from "mongoose";

export interface ITags{
   name: string
   color: string;
}

export const tagsSchema = new Schema<ITags>({
   name: {type: String, required: true},
   color: {type: String, required: true}
},
{
   timestamps: true
})


const Tags = model<ITags>('Tags', tagsSchema);
export default Tags;