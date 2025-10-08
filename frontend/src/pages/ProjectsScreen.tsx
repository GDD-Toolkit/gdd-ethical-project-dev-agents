import type { Project } from "../../../shared/types/types";
import { useState, useEffect, useRef } from "react";
import Button from "@/components/Button";

interface ProjectsScreenProps {
  projectArray?: Project[];
  onClick?: () => void;
}

const ProjectsScreen = ({ projectArray, onClick }: ProjectsScreenProps) => {
  const [projectSearch, setProjectSearch] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const projectsListRef = useRef<HTMLDivElement>(null);

  // Collect all unique tags
  const allTags = Array.from(
    new Set(projectArray?.flatMap((p) => p.tags || []) || [])
  );

  // Set all tags as selected by default
  useEffect(() => {
    setSelectedTags(allTags.map((t) => t.toLowerCase()));
  }, [projectArray]);

  if (!projectArray || projectArray.length === 0) {
    return (
      <div className="h-screen w-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#262633] to-[#727299] text-white">
        <h1 className="text-2xl mb-4">You have no projects yet.</h1>
        Create one{" "}
        <button
          onClick={() => {
            /* TODO: implement create project flow */
          }}
          className="!bg-transparent !border-none !p-0 text-blue-300 hover:underline ml-1"
          style={{ outline: "none" }}
        >
          here
        </button>
        !
      </div>
    );
  }

  // Filter projects based on selected tags AND search input
  const filteredProjects = projectArray.filter((proj) => {
    const tags = proj.tags?.map((t) => t.toLowerCase()) || [];

    const matchesTags =
      selectedTags.length === 0 ||
      selectedTags.some((sel) => tags.includes(sel.toLowerCase()));

    const matchesSearch =
      !projectSearch ||
      proj.title.toLowerCase().includes(projectSearch.toLowerCase()) ||
      proj.description.toLowerCase().includes(projectSearch.toLowerCase());

    return matchesTags && matchesSearch;
  });

  const toggleTag = (tag: string) => {
    const lowerTag = tag.toLowerCase();
    setSelectedTags((prev) =>
      prev.includes(lowerTag)
        ? prev.filter((t) => t !== lowerTag)
        : [...prev, lowerTag]
    );
  };

  return (
    <div className="h-screen w-screen bg-gradient-to-b from-[#262633] to-[#727299] flex flex-col p-8">
      {/* Main content: tags + projects */}
      <div className="flex flex-col md:flex-row gap-6 flex-1 overflow-hidden mt-3">
        {/* Tags column */}
        <div className="md:w-1/10 flex-shrink-0 flex flex-col gap-4">
          <h2 className="text-white font-bold text-lg mb-2">Filter by Tag</h2>
          <div
            className="flex flex-col gap-2 overflow-y-auto"
            style={{ height: projectsListRef.current?.clientHeight || "auto" }}
          >
            {allTags.map((tag) => {
              const lowerTag = tag.toLowerCase();
              const checked = selectedTags.includes(lowerTag);
              return (
                <label
                  key={tag}
                  className={`flex items-center gap-2 px-3 py-1 rounded-full border cursor-pointer transition ${
                    checked
                      ? "bg-[#727299] border-blue-600"
                      : "bg-white text-black border-gray-400 hover:bg-gray-200"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => toggleTag(tag)}
                    className="accent-[#727299] cursor-pointer"
                  />
                  <span className={checked ? "text-white" : "text-black"}>
                    {tag}
                  </span>
                </label>
              );
            })}
          </div>
        </div>

        {/* Projects + search */}
        <div className="flex-1 flex flex-col">
          {/* Search bar - stays static */}
          <div className="flex justify-center mb-4">
            <input
              className="!bg-white text-black px-2 py-1 rounded-md w-full md:w-1/2"
              placeholder="Type project title or description..."
              value={projectSearch}
              onChange={({ target }) => setProjectSearch(target.value)}
            />
          </div>

          {/* Scrollable project list */}
          <div
            ref={projectsListRef}
            className="flex-1 overflow-y-auto flex flex-col gap-6"
          >
            {filteredProjects.map((proj) => (
              <div
                key={proj.project_id}
                onClick={onClick}
                className="bg-[#D9D9D9] text-black border border-black rounded-xl p-5 hover:brightness-90 transition duration-200 hover:cursor-pointer"
              >
                <p className="font-bold text-lg mb-2">{proj.title}</p>
                <p className="mb-3">{proj.description}</p>

                {/* Tags display */}
                <div className="flex flex-wrap gap-2">
                  {proj.tags?.map((tag) => (
                    <span
                      key={tag}
                      className="bg-[#727299] text-white px-2 py-0.5 rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Back button - stays static */}
          <div className="mt-4">
            <Button
              label="Back"
              onClick={() => {
                /* TODO: implement back navigation */
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectsScreen;
