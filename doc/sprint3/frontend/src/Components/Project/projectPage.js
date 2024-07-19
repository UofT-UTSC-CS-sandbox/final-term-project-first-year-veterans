import React, { useState, useEffect } from "react";
import "../../Asset/Css/ProjectPage.css";
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import CircularProgress from '@mui/material/CircularProgress';
import Container from '@mui/material/Container';
import ProjectCard from './ProjectCard';
import { api_create_project, api_fetch_all_projects } from '../../API/ProjectApi.js';

function ProjectPage() {
  const [showCreateProject, setShowCreateProject] = useState(false);
  const [projectTitle, setProjectTitle] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const [projectFile, setProjectFile] = useState(null);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedProjectId, setExpandedProjectId] = useState(null);

  useEffect(() => {
    api_fetch_all_projects((data) => {
      setProjects(data);
      setLoading(false);
    });
  }, []);

  const handleCreateProjectClick = () => {
    setShowCreateProject(!showCreateProject);
    setExpandedProjectId(null);
  };

  const handleSubmitProject = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('userId', "Richie_Hsieh");
    formData.append('projectTitle', projectTitle);
    formData.append('projectDescription', projectDescription);
    if (projectFile) {
      formData.append('file', projectFile);
    }
    api_create_project(formData, (data) => {
      setProjects([...projects, data]);
      setShowCreateProject(false);
      setProjectTitle('');
      setProjectDescription('');
      setProjectFile(null);
    });
  };

  const handleFileChange = (event) => {
    setProjectFile(event.target.files[0]);
  };

  const handleProjectClick = (projectId) => {
    setExpandedProjectId(projectId === expandedProjectId ? null : projectId);
    setShowCreateProject(false);
  };

  return (
    <div className="projectcontainer">
      <button className="createprojectbutton" onClick={handleCreateProjectClick}>
        {showCreateProject ? 'Cancel' : 'Create Project'}
      </button>
      <div className="sidebar">
        {loading ? (
          <CircularProgress />
        ) : (
          projects.map(project => (
            <div 
              key={project.projectId} 
              onClick={() => handleProjectClick(project.projectId)} 
              className={`project-list-item ${expandedProjectId === project.projectId ? 'selected' : ''}`}
            >
              <h4>{project.projectTitle}</h4>
            </div>
          ))
        )}
      </div>
      <Container className="main-content">
        {showCreateProject ? (
          <div className="create-project-template">
            <h2>Create a New Project</h2>
            <form onSubmit={handleSubmitProject}>
              <FormControl fullWidth margin="normal">
                <InputLabel htmlFor="project-title">Title</InputLabel>
                <OutlinedInput
                  id="project-title"
                  label="Title"
                  value={projectTitle}
                  onChange={(e) => setProjectTitle(e.target.value)}
                />
              </FormControl>
              <FormControl fullWidth margin="normal">
                <InputLabel htmlFor="project-description">Description</InputLabel>
                <OutlinedInput
                  id="project-description"
                  label="Description"
                  multiline
                  rows={4}
                  value={projectDescription}
                  onChange={(e) => setProjectDescription(e.target.value)}
                />
              </FormControl>
              <input type="file" onChange={handleFileChange} style={{ marginTop: '10px' }} />
              <button type="submit" className="submitprojectbutton">Submit</button>
            </form>
          </div>
        ) : (
          expandedProjectId && projects.filter(project => project.projectId === expandedProjectId).map(project => (
            <ProjectCard 
              key={project.projectId} 
              project={project} 
              isExpanded={true}
              onToggleExpand={() => handleProjectClick(project.projectId)}
            />
          ))
        )}
      </Container>
    </div>
  );
}

export default ProjectPage;
