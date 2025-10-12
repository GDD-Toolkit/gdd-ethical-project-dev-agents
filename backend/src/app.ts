import { config } from "dotenv";
import express, { Request, Response } from "express";
import { getCaseStudyProject } from "./dynamodb";

config();

const app = express();
const PORT = process.env.PORT || 3000;

// Enable JSON parsing
app.use(express.json());

// Enable CORS
app.use((req: Request, res: Response, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.get("/projects/:id", async (req: Request, res: Response) => {
  try {
    const project = await getCaseStudyProject(req.params.id);
    res.json(project);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});