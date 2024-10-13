import { Request, Response } from "express";
import AuthService from "../services/authService";


export default class AuthenticateController {
   
  static async login(req: Request, res: Response) {
    const { email, password } = req.body;

    const { user, token } = await AuthService.authenticate(email, password);

    return res.status(200).json({
      user,
      token,
    });
  }
}
