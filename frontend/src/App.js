import React from 'react'
import Header from './components/Header'
import api from './services/api'


import './App.css'

function App() {

  const [projects, setProjects] = React.useState([])

  React.useEffect(() => {
    api.get('projects').then(response => {
      console.log(response)
      setProjects(response.data)
    })
  }, [])

  async function handleAddProject() {
    // setProjects([...projects, `Novo projeto ${Date.now()}`])
    const response = await api.post('/projects', {
      title: `Novo projeto ${Date.now()}`,
      owner: "Caique Moraes"
    })

    const project = response.data
    setProjects([...projects, project])
  }

  return (
    <React.Fragment>
      <Header title="Homepage" />
      <ul>
        {
          projects.map(project => (
            <li key={project.id}>{project.title}</li>
          ))
        }
      </ul>
      <button onClick={handleAddProject}>Adicionar Projeto</button>
    </React.Fragment>
  )
}

export default App