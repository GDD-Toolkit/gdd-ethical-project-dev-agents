import './App.css'
import ProjectsScreen from './pages/ProjectsScreen'
import projects from './data/dummyProjects';

function App() {
  return (
    <>
      <ProjectsScreen projectArray={projects} />
    </>
  )
}

export default App
