import express, { Request, Response } from 'express';

const app = express();

app.get("/", (req: Request, res: Response) => {
   return res.json({ message: "Hello" });
 });


app.listen(3000, ()=>{
   console.log("server rodando")
});