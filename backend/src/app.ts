import { config } from "dotenv";
import express, { Request, Response } from "express";
import { getCaseStudyProject, queryCaseStudyProjectsByKeyword, queryCaseStudyProjectsByRegion } from "./dynamodb";

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

//Get project by id
app.get("/projects/:id", async (req: Request, res: Response) => {
  try {
    const project = await getCaseStudyProject(req.params.id);
    res.json(project);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//Get projects by region
app.get("/projects/region/:region", async (req, res) => {
  try {
    const region = decodeURIComponent(req.params.region).replace(/\+/g, " ");
    
    const projects = await queryCaseStudyProjectsByRegion(region);

    if (!projects || projects.length === 0) {
      return res.status(404).json({ error: "No projects found for this region" });
    }

    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//Get projects by keyword
app.get("/projects/keyword/:keyword", async (req, res) => {
  try {
    const keyword = decodeURIComponent(req.params.keyword).replace(/\+/g, " ");
    
    const projects = await queryCaseStudyProjectsByKeyword(keyword);

    if (!projects || projects.length === 0) {
      return res.status(404).json({ error: "No projects found for this keyword" });
    }

    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});