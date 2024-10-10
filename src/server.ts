import express from "express";
import connectDB from "./db/database";
import TaskRouter from "./routes/TaskRoutes";
import TagsRouter from "./routes/TagsRoutes";
import UserRouter from "./routes/UsersRoutes";

const app = express();
app.use(express.json());

app.use("/tasks", TaskRouter);
app.use("/tags", TagsRouter);
app.use("/users", UserRouter);

connectDB();

app.listen(3000, () => {
  console.log("server rodando");
});
