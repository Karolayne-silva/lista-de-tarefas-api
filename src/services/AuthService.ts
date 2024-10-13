import User from "../models/users";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

class AuthService {
  async authenticate(email: string, password: string) {
    const user = await User.findOne({ email });

    if (!user) {
      throw new Error("Email ou senha incorreto");
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      throw new Error("Email ou senha incorreto");
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || "", {
      expiresIn: "1d",
    });

    const { password: _, ...userLogin } = user;

    return { user: userLogin, token };
  }
}
export default new AuthService();
