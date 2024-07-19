import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import GroupsIcon from '@mui/icons-material/Groups';
import Tooltip from '@mui/material/Tooltip';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { api_join_project, api_edit_project } from '../../API/ProjectApi';

const uid = 'Richie_Hsieh'; // Replace with actual user ID

const ProjectCard = ({ project, isExpanded, onToggleExpand }) => {
  const [isJoined, setIsJoined] = useState(project.isJoinedByMe);
  const [joinedCount, setJoinedCount] = useState(project.joinedCount);
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(project.projectTitle);
  const [editDescription, setEditDescription] = useState(project.projectDescription);
  const [editFile, setEditFile] = useState(null);

  useEffect(() => {
    setIsJoined(project.isJoinedByMe);
    setJoinedCount(project.joinedCount);
  }, [project.projectId]);

  const handleJoin = (event) => {
    event.stopPropagation();
    api_join_project(uid, project.projectId, (data) => {
      setJoinedCount(data.joinedCount);
      setIsJoined(data.isJoinedByMe);
    });
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleEditSubmit = (event) => {
    event.stopPropagation();
    const formData = new FormData();
    formData.append('projectId', project.projectId);
    formData.append('title', editTitle);
    formData.append('description', editDescription);
    if (editFile) {
      formData.append('file', editFile);
    }
    api_edit_project(formData, (data) => {
      if (data.success) {
        setIsEditing(false);
        // Optionally, update the project data with the new values.
      }
    });
  };

  const handleFileChange = (event) => {
    setEditFile(event.target.files[0]);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditTitle(project.projectTitle);
    setEditDescription(project.projectDescription);
    setEditFile(null);
  };

  return (
    <Card style={{ margin: '20px', padding: '10px' }}>
      <CardContent>
        {!isEditing ? (
          <>
            <Typography variant="h5" component="div" onClick={onToggleExpand} style={{ cursor: 'pointer' }}>
              {project.projectTitle}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {project.projectDescription}
            </Typography>
            {project.userId === uid && (
              <Button onClick={handleEditToggle} color="primary" style={{ marginLeft: '10px' }}>
                Edit
              </Button>
            )}
          </>
        ) : (
          <>
            <TextField
              fullWidth
              variant="outlined"
              label="Title"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
            />
            <TextField
              fullWidth
              variant="outlined"
              label="Description"
              multiline
              rows={4}
              value={editDescription}
              onChange={(e) => setEditDescription(e.target.value)}
              style={{ marginTop: '10px' }}
            />
            <input type="file" onChange={handleFileChange} style={{ marginTop: '10px' }} />
            <Button onClick={handleEditSubmit} color="primary" style={{ marginTop: '10px' }}>
              Submit
            </Button>
            <Button onClick={handleCancelEdit} color="secondary" style={{ marginTop: '10px', marginLeft: '10px' }}>
              Cancel
            </Button>
          </>
        )}
        <div style={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
          <Tooltip title="Join">
            <IconButton onClick={handleJoin} style={{ color: isJoined ? '#3f51b5' : 'gray' }}>
              <GroupsIcon />
            </IconButton>
          </Tooltip>
          <Typography variant="body2" color="text.secondary" style={{ marginRight: '16px' }}>
            {joinedCount}
          </Typography>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProjectCard;
