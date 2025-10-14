"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
const express_1 = __importDefault(require("express"));
const dynamodb_1 = require("./dynamodb");
(0, dotenv_1.config)();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
// Enable JSON parsing
app.use(express_1.default.json());
// Enable CORS
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    next();
});
//Get project by id
app.get("/projects/:id", async (req, res) => {
    try {
        const project = await (0, dynamodb_1.getCaseStudyProject)(req.params.id);
        res.json(project);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
//Get projects by region
app.get("/projects/region/:region", async (req, res) => {
    try {
        const region = decodeURIComponent(req.params.region).replace(/\+/g, " ");
        const projects = await (0, dynamodb_1.queryCaseStudyProjectsByRegion)(region);
        if (!projects || projects.length === 0) {
            return res.status(404).json({ error: "No projects found for this region" });
        }
        res.json(projects);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
//Get projects by keyword
app.get("/projects/keyword/:keyword", async (req, res) => {
    try {
        const keyword = decodeURIComponent(req.params.region).replace(/\+/g, " ");
        const projects = await (0, dynamodb_1.queryCaseStudyProjectsByKeyword)(keyword);
        if (!projects || projects.length === 0) {
            return res.status(404).json({ error: "No projects found for this keyword" });
        }
        res.json(projects);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
//Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
//# sourceMappingURL=app.js.map