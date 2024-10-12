import User from "../models/users";
import bcrypt from "bcrypt";

class UserService {
  
  async createUser(email: string, password: string) {
    const existingEmail = await User.findOne({ email });

    if (existingEmail) {
      throw new Error("Usuário com esse email já cadastrado.");
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      email,
      password: hashPassword,
    });

    await newUser.save();

    return newUser;
  }

  async getAllUsers() {
    return await User.find().populate("tasks", "title");
  }

  async getUserById(id: string) {
    return await User.findById(id);
  }

  async updateUser(
    id: string,
    updateData: { email: string; password: string }
  ) {
    if (updateData.email) {
      const existingUser = await User.findOne({ email: updateData.email });

      if (existingUser && existingUser._id.toString() !== id) {
        throw new Error("Email já cadastrado por outro usuário!");
      }
    }

    const updatedUser = await User.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    return updatedUser;
  }

  async deleteUser(id: string) {
   return await User.findByIdAndDelete(id);
  }
}

export default new UserService();
