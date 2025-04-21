import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import './Home.css'

const Home = () => {

    const navigate = useNavigate()
    const [projects, setProjects] = useState([])

    function navigateToProject(projectId) {
        navigate(`/project/${projectId}`)
    }

    useEffect(() => {
        axios.get('http://localhost:3000/projects/get-all')
            .then(response => {
                console.log('Response:', response) // Log the full response to check data structure
                setProjects(response.data.data) // Assuming the data is inside response.data.data
            })
            .catch((error) => {
                console.error('Error fetching projects:', error)
            })
    }, [])

    return (
        <main className='home'>
            <section className='home-section'>
                <button
                    onClick={() => {
                        navigate('/create-project')
                    }}
                >
                    New Project
                </button>

                {projects.length === 0 ? (
                    <div>
                        <p>No projects created</p>
                    </div>
                ) : (
                    <div className="projects">
                        {projects.map((project) => {
                            return (
                                <div
                                    key={project._id} // Add a unique key for each project
                                    onClick={() => {
                                        navigateToProject(project._id)
                                    }}
                                    className="project"
                                >
                                    {project.name}
                                </div>
                            )
                        })}
                    </div>
                )}
            </section>
        </main>
    )
}

export default Home
