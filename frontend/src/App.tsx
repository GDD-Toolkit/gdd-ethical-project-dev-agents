import './App.css'
import ProjectsScreen from './pages/ProjectsScreen'
import type { Project } from '../../shared/types/types';

/**
 * Root application component that supplies a sample list of projects to the ProjectsScreen.
 *
 * @returns The root JSX element rendering ProjectsScreen with a `projectArray` prop containing sample `Project` objects.
 */
function App() {

  const projects: Project[] = [
    {
      project_id: 'a1b2c3d4-e5f6-7890-1234-567890abcdef',
      user_id: 'us-east-1:12345678-abcd-efgh-ijkl-mnopqrstuvwx',
      title: 'Community Garden Initiative',
      description: 'A project to establish a community garden in the local park to promote healthy eating and community engagement.',
      status: 'in_progress',
      questionnaire_id: 'q1w2e3r4-t5y6-7890-uio-pasdfghjkl',
      tags: ['environment', 'social', 'health'],
      created_at: '2025-09-15T10:30:00Z',
      updated_at: '2025-10-01T14:45:10Z',
    },
    {
      project_id: 'f1e2d3c4-b5a6-7890-fedc-ba9876543210',
      user_id: 'us-east-1:zxcvbnm-lkjh-gfds-apoi-uytrewq',
      title: 'Tech for Seniors Workshop',
      description: 'A series of workshops to teach essential technology skills to senior citizens.',
      status: 'ready',
      questionnaire_id: 'z9x8c7v6-b5n4-m3l2-k1j0-h9g8f7d6e5s4',
      tags: ['social', 'economic'],
      created_at: '2025-08-01T09:00:00Z',
      updated_at: '2025-09-20T11:20:30Z',
    },
    {
      project_id: '09876543-21fe-dcba-0987-654321fedcba',
      user_id: 'us-east-1:12345678-abcd-efgh-ijkl-mnopqrstuvwx', // Same user as the first project
      title: 'Local River Cleanup Program',
      status: 'archived',
      questionnaire_id: 'p0o9i8u7-y6t5-r4e3-w2q1-asdfghjkl',
      tags: ['environment'],
      created_at: '2024-05-10T12:00:00Z',
      updated_at: '2024-11-30T18:00:00Z',
    },
    {
      project_id: 'b4a3c2d1-f6e5-4321-fedc-ba9876543210',
      user_id: 'us-west-2:abcdefgh-1234-5678-ijkl-mnopqrstuvwx',
      title: 'Renewable Energy Feasibility Study',
      description: 'Assessing the viability of installing solar panels on municipal buildings.',
      status: 'in_progress',
      questionnaire_id: 'lkjhgfdsa-poiuytrewq-mnbvcxz-098765',
      created_at: '2025-10-05T11:00:00Z',
      updated_at: '2025-10-05T11:00:00Z',
    }
  ];

  return (
    <>
      <ProjectsScreen projectArray={projects} />
    </>
  )
}

export default App