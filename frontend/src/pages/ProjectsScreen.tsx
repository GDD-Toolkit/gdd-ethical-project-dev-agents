import type { Project } from '../../../shared/types/types';
import { useState } from 'react';

import Button from '@/components/Button';

interface ProjectsScreenProps {
  projectArray?: Project[];
  onClick?: () => void;
}
const ProjectsScreen = ({ projectArray, onClick} : ProjectsScreenProps) => {
  const [tag, setTag] = useState('');

  if (!projectArray) {
    return (
      <div>
        <h1>You have no projects yet.</h1>
        Create one <button className="!bg-transparent !border-none !p-0 text-blue-600 hover:underline" style={{ outline: 'none' }}>here</button>!
      </div>
    )
  }
  return (
    <>
      <h1 className="font-semibold">View Your Projects</h1>
      <div className="border border-2 rounded-xl border-black bg-gradient-to-b from-[#262633] to-[#727299] h-[50vh] w-[50vw] overflow-y-scroll my-10">
        <div className='text-white font-bold mt-3'>
          Filter by Tag: <input className="!bg-white text-black px-2 py-0.5 font-normal" value={tag} onChange={({target}) => setTag(target.value)} />
        </div>
        {projectArray?.filter(proj=> !tag || proj.tags?.some(projectTag => projectTag.toLowerCase().includes(tag.toLowerCase())))
        .map(proj =>(
          <div key={proj.project_id} onClick={onClick} className={`flex flex-col md:flex-row items-center justify-center bg-[#D9D9D9] border border-2 border-black m-10  h-30 rounded-lg p-5 hover:brightness-90 transition duration-200 hover:cursor-pointer overflow-y-hidden`}>
            <p className='font-bold mb-2 hover:cursor-pointer'>{proj.title}</p>
            <p className='overflow-y-scroll pr-2 hover:cursor-pointer'>{proj.description}</p>
          </div>
        ))}
      </div>
      <Button label='Back' />
    </>
      
  );
}

export default ProjectsScreen;