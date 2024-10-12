import mongoose, { Schema, model } from "mongoose";

export interface ITags {
  name: string;
  color: string;
  createdBy: mongoose.Types.ObjectId;
}

export const tagsSchema = new Schema<ITags>(
  {
    name: { type: String, required: true },
    color: { type: String, required: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  {
    timestamps: true,
  }
);

const Tags = model<ITags>("Tags", tagsSchema);

export default Tags;
