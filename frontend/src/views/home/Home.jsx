import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useAuth } from '../../contexts/AuthContext'
import './Home.css'

const Home = () => {

    const navigate = useNavigate()
    const { logout, user } = useAuth()
    const [projects, setProjects] = useState([])

    function navigateToProject(projectId) {
        navigate(`/project/${projectId}`)
    }

    function handleLogout() {
        logout()
        navigate('/login')
    }

    useEffect(() => {
        axios.get('http://localhost:3000/projects/get-all')
            .then(response => {
                console.log('Response:', response)
                setProjects(response.data.data)
            })
            .catch((error) => {
                console.error('Error fetching projects:', error)
            })
    }, [])

    return (
        <main className='home'>
            <section className='home-section'>
                <div className="home-header">
                    <h1>Welcome, {user?.name || 'User'}!</h1>
                    <button onClick={handleLogout} className="logout-btn">Logout</button>
                </div>
                
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
                                    key={project._id}
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
