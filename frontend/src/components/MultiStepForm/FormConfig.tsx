import { i } from "framer-motion/client";

export const formSteps = [
  {
    title: "Ethicality",
    page: 1,
    questions: [
      { 
        id: 1,
        question: "What issue is at stake? What do you want to solve?", 
        description: "Tell us more about your project proposal’s goals, values, etc. "},
      { 
        id: 2,
        question: "What and who is affected by the project?", 
        description: "List any potential individuals that may be affected by this project. "},
      { 
        id: 3,
        question: "How will it change things? What goal will it accomplish?", 
        description: "State the positive changes or outcomes your project aims to achieve."}
    ]
  },
  {
    title: "Desirability",
    page: 2,
    questions: [
      { 
        id: 4,
        question: "What specific need(s) or problem(s) can this project address?",
        description: "Identify the core needs or challenges your solution directly targets."},
      { 
        id: 5,
        question: "Who are our potential partners, and what are their needs?",
        description: "List key organizations or stakeholders you might work with and what they’re looking for."},
      { 
        id: 6,
        question: "What can we offer?",
        description: "Describe what your project brings to the table—resources, skills, or solutions."},
      {  
        id: 7,
        question: "What results or benefits can be created?",
        description: "Summarize the main benefits your project will provide to the community."}
    ]

  },
  {
    title: "Feasibility",
    page: 3,
    questions: [
      { 
        id: 8,
        question: "What is the timeline for this project?", 
        description: "Restate the most urgent or solvable issue your project will tackle."},
      { 
        id: 9, 
        question: "Who should we work with to address these problems?", 
        description: "Suggest partners or collaborators who can help make the project successful."},
      { 
        id: 10,
        question: "How do we communicate to potential partners?",
        description: "Share how you plan to reach out to partners and get them on board."}
    ]
  },
  {
    title: "Visibility",
    page: 4,
    questions: [
      { 
        id: 11,
        question: "What is the timeline for this project?", 
        description: "Routline what assets you already have and what additional resources are required."},
      { 
        id: 12,
        question: "How do we generate income?", 
        description: "Explain how your project could become financially sustainable or bring in revenue."},
      { 
        id: 13, 
        question: "What are the costs? How do we cover them?",
        description: "List expected expenses and your strategy for funding them."}
    ]
  }
];