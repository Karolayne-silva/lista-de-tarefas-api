import express from "express";
import connectDB from "./database/database";
import TaskRouter from "./routes/TaskRoutes";
import TagsRouter from "./routes/TagsRoutes";
import UserRouter from "./routes/UsersRoutes";
import AuthenticateRouter from "./routes/AuthenticateRoutes";

const app = express();
app.use(express.json());

connectDB();

app.use("/tasks", TaskRouter);
app.use("/tags", TagsRouter);
app.use("/users", UserRouter);
app.use("/login", AuthenticateRouter);

app.listen(3000, () => {
  console.log("Server is running!");
});
