import { Response, Request, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/users";
dotenv.config();

interface IPayload {
  id: string;
}

const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ message: "Usuário não autorizado!" });
  }

  const token = authorization.split(" ")[1];

  try {
    const { id } = jwt.verify(token, process.env.JWT_SECRET || "") as IPayload;
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: "Usuário não existe" });
    }

    req.userId = id;
    next();
  } catch (error) {
    return res.json({ message: "Token Inválido!" });
  }
};

export default authMiddleware;
