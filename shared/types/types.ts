// Since we are using AWS Cognito, the user_id is the Cognito sub -> used to identify the user
// and check the user session.

export type Interest = "health" | "environment" | "social" | "economic";
export type Status = "in_progress" | "ready" | "archived";
export type Role = "user" | "bot";

export type User = {
  user_id: string; // PK (Cognito sub)
  email: string;
  name: string;
  age: number;
  country: string;
  language: string;
  interests: Interest[];
  created_at: string; // timestamp ISO 8601 format
  updated_at: string; // timestamp ISO 8601 format
};

// this way the we can have multiple projects for a user and we can track the project history and progress
// we can also have a multiple chat system for a project -> similar to ChatGPT's interface for projects
export type Project = {
  project_id: string; // PK (uuid)
  user_id: string; // FK -> User
  title: string;
  description: string;
  status: Status;
  questionnaire_id: string; // FK -> Questionnaire
  tags?: string[];
  created_at: string;
  updated_at: string;
};

export type Chat = {
  chat_id: string; // PK (uuid)
  project_id: string; // FK -> Project
  user_id: string; // FK -> User who started it
  title?: string;
  created_at: string;
  updated_at: string;
};

// we still have to figure out how we will use RAG here for better context and responses
export type Message = {
  message_id: string; // PK (uuid)
  chat_id: string; // FK -> Chat
  role: Role; // to identify the role of the message for proper display
  content: string;
  created_at: string;
  // optional metadata for RAG/function-calls -> currently unsure about how this will work
  attachments?: Array<{
    document_id?: string;
    s3_key?: string;
    mime?: string;
  }>;
};

// we are assuming that the document is a PDF
export type Document = {
  id: string; // PK (uuid)
  user_id: string; // FK -> User
  project_id: string; // FK -> Project
  chat_id: string; // FK -> Chat -> used to identify the document for the specific chat
  name: string;
  relevance_score: number; // relevance score of the document to the project
  s3_key: string;
  created_at: string;
  updated_at: string;
};

// this can change in the future based on necessary context required.
// the project consists of a key to the responses to the questionnaire (nested)
export type QuestionnaireResponse = {
  questionnaire_id: string; // PK (uuid)
  project_id: string; // FK -> Project
  status: "draft" | "approved";
  issue_statement?: string;
  who_is_affected?: string;
  goals_outcomes?: string;
  needs_addressed?: string;
  partners?: string[];
  offerings?: string;
  resources?: string;
  income_model?: string;
  costs_funding?: string;
  timeline?: string;
  budget_amount?: number;
  key_milestones?: string[];
  risks_mitigations?: string;
  target_population?: string;
  stakeholders?: string[];
  created_at: string;
  updated_at: string;
};

// we are assuming that the generated document is a PDF
export type GeneratedDocument = {
  generated_id: string; // PK (uuid) (s3-Key)
  project_id: string; // FK -> Project
  page_count: number;
  created_at: string;
};
