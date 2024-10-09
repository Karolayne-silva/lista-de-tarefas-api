import express, { Request, Response } from 'express';
import connectDB from './db/database';

const app = express();

app.get("/", (req: Request, res: Response) => {
   return res.json({ message: "Hello" });
 });

connectDB();

app.listen(3000, ()=>{
   console.log("server rodando")
});