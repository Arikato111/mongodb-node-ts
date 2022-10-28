import express from "express";
import { Express, Request, Response } from "express";
import Database from "./Database";
const app: Express = express();

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.status(200).send("welcome to api with mongodb");
});

app.get("/data", async (req: Request, res: Response) => {
  const DB = new Database();
  let data = await DB.getData();
  DB.close();
  res.status(201).json(data);
});

app.post("/data", async (req: Request, res: Response) => {
  const { name, age } = req.body;

  if (!name || !age) {
    res.status(300).json({ status: 0, message: "error input" });
  } else {
    const DB = new Database();
    await DB.insertData(name, age);
    DB.close();
    
    res.status(201).json({ status: 1, message: "add successfuly" });
  }
});

const port: string = process.env["PORT"] ?? "4000";
app.listen(port, () => {
  console.log("server start at port", port);
});
