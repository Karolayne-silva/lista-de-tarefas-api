import mongoose, {model, Schema} from "mongoose";

interface IUser{
   senha: string;
   email: string;
   tasks: mongoose.Types.ObjectId[];
}

const UserSchema = new Schema<IUser>({
   email: {
      type: String, 
      required: true,
   },
   senha: {
      type: String,
      required: true,
      min: 8
   },
   tasks: 
      [{ type: mongoose.Schema.Types.ObjectId, ref: "Task" }]

})

const User = model<IUser>("User", UserSchema);
export default User;