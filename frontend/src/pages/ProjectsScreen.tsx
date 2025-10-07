import type { Project } from '../../../shared/types/types';
import { useState } from 'react';
import Button from '@/components/Button';

interface ProjectsScreenProps {
  projectArray?: Project[];
  onClick?: () => void;
}

const ProjectsScreen = ({ projectArray, onClick }: ProjectsScreenProps) => {
  const [tagSearch, setTagSearch] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  if (!projectArray || projectArray.length === 0) {
    return (
      <div className="h-screen w-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#262633] to-[#727299] text-white">
        <h1 className="text-2xl mb-4">You have no projects yet.</h1>
        Create one{' '}
        <button
          onClick={() => {/* TODO: implement create project flow */}}
          className="!bg-transparent !border-none !p-0 text-blue-300 hover:underline ml-1"
          style={{ outline: 'none' }}
        >
          here
        </button>
        !
      </div>
    );
  }

  // Collect all unique tags
  const allTags = Array.from(new Set(projectArray.flatMap(p => p.tags || [])));

  // Filter projects based on selected or searched tags
  const filteredProjects = projectArray.filter(proj => {
    const tags = proj.tags?.map(t => t.toLowerCase()) || [];
    const matchesSearch = !tagSearch || tags.some(t => t.includes(tagSearch.toLowerCase()));
    const matchesSelected =
      selectedTags.length === 0 ||
      selectedTags.every(sel => tags.includes(sel.toLowerCase()));
    return matchesSearch && matchesSelected;
  });

  const toggleTag = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  return (
    <div className="h-screen w-screen bg-gradient-to-b from-[#262633] to-[#727299] flex flex-col p-8 overflow-hidden">
      <h1 className="font-semibold text-3xl mb-6 text-center">View Your Projects</h1>

      {/* Filter controls */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
        <div>
          <label className="font-bold mr-2">Filter by Tag:</label>
          <input
            className="!bg-white text-black px-2 py-1 rounded-md font-normal"
            placeholder="Search tags..."
            value={tagSearch}
            onChange={({ target }) => setTagSearch(target.value)}
          />
        </div>

        {/* Selectable tag buttons */}
        <div className="flex flex-wrap gap-2">
          {allTags.map(tag => (
            <button
              key={tag}
              onClick={() => toggleTag(tag)}
              className={`px-3 py-1 rounded-full text-sm border transition ${
                selectedTags.includes(tag)
                  ? 'bg-blue-400 border-blue-600'
                  : 'bg-white text-black border-gray-400 hover:bg-gray-200'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Project list */}
      <div className="flex-1 overflow-y-auto">
        {filteredProjects.map(proj => (
          <div
            key={proj.project_id}
            onClick={onClick}
            className="bg-[#D9D9D9] text-black border border-2 border-black rounded-xl p-5 mb-6 hover:brightness-90 transition duration-200 hover:cursor-pointer"
          >
            <p className="font-bold text-lg mb-2">{proj.title}</p>
            <p className="mb-3">{proj.description}</p>

            {/* Tags display */}
            <div className="flex flex-wrap gap-2">
              {proj.tags?.map(tag => (
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

      <div className="mt-4">
        <Button label="Back" onClick={() => {/* TODO: implement back navigation */}} />
      </div>
    </div>
  );
};

export default ProjectsScreen;
