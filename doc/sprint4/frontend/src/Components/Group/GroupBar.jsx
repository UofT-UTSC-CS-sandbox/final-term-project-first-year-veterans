import * as React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 

import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';

import ChatIcon from '@mui/icons-material/Chat';
import AddIcon from '@mui/icons-material/Add';

import { api_group_fetch } from '../../API/GroupAPI';
import AddGroupDialog from './AddGroupDialog';
import CreateServerDialog from './CreateServerDialog';
import AddOrCreateDialog from './AddOrCreateDialog';
import SecondCreateDialog from './SecondCreateDialog';

function formatDateTime(dateTimeString) {
    const date = new Date(dateTimeString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is 0-indexed, so we add 1
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}`;
}

export default function GroupBar({uid}) {
    const [open, setOpen] = useState(false);
    const [openCreate, setOpenCreate] = useState(false);
    const [openJoin, setOpenJoin] = useState(false);
    const [openSecondCreate, setOpenSecondCreate] = useState(false);
    const [groupList, setGroupList] = useState([]);

    useEffect(() => {
        // Fetch group list from the backend
        if (uid){
            api_group_fetch({uid: uid}, data => {
                console.log(data);
                setGroupList(data.groups);
            });
        }
    }, [uid]);

    useEffect(() => {
        console.log('update group list:', groupList);
    }, [groupList]);

    const navigate = useNavigate();
    const handleGroupClick = (e) => {
        navigate('/main/groupPage');
    };

    const handleOpenCreate = () => {
        setOpenCreate(true);
        setOpen(false);
    };

    const handleOpenJoin = () => {
        setOpenJoin(true);
        setOpen(false);
    };

    const handleOpenSecondCreate = () => {
        setOpenSecondCreate(true);
        setOpenCreate(false);
    };

    const handleBack = () => {
        if (openSecondCreate) {
            setOpenCreate(true);
            setOpenSecondCreate(false);
        } else if (openCreate || openJoin) {
            setOpen(true);
            setOpenCreate(false);
            setOpenJoin(false);
        }
    };

    const handleClickOpen = () => {
        setOpen(true);
    };
  
    const handleClose = () => {
        setOpen(false);
        setOpenCreate(false);
        setOpenJoin(false);
        setOpenSecondCreate(false);
    };

    return (
        <List sx={{ 
            width: '100%', 
            maxWidth: '100%', 
            bgcolor: 'background.paper',
            marginLeft: 'auto',
            marginRight: 'auto',
        }}>
            {groupList.map((group, index) => (
                <div key={index}>
                    <ListItemButton alignItems="flex-start" onClick={handleGroupClick}>
                        <ListItemAvatar style={{marginTop: 'auto', marginBottom: 'auto'}}>
                            <Avatar alt={group.name} />
                        </ListItemAvatar>
                        <ListItemText
                            primary={group.name}
                            secondary={
                                <React.Fragment>
                                    <Typography component="span" variant="body2" color="textPrimary">
                                        last update:
                                    </Typography>
                                    <br />
                                    <Typography component="span" variant="body2" color="textSecondary">
                                        {formatDateTime(group.lastUpdateAt)}
                                    </Typography>
                              </React.Fragment>
                            }
                        />
                        <Tooltip title="Chat" style={{marginTop: 'auto', marginBottom: 'auto'}}>
                            <IconButton 
                                edge="end" 
                                aria-label="chat" 
                                sx={{ marginRight: "10px", marginLeft: 'auto'}}
                            >
                                <ChatIcon />
                            </IconButton>
                        </Tooltip>
                    </ListItemButton>
                    <Divider variant="fullWidth" component="li" />
                </div>
            ))}
            <ListItemButton alignItems="flex-start" onClick={handleClickOpen}>
                <AddIcon sx={{ marginRight: "auto", marginLeft: 'auto', marginTop: '5px', marginBottom: '5px'}}/>
            </ListItemButton>
            <AddOrCreateDialog open={open} handleClose={handleClose} handleOpenCreate={handleOpenCreate} handleOpenJoin={handleOpenJoin} />
            <CreateServerDialog open={openCreate} handleClose={handleClose} handleBack={handleBack} handleOpenSecondCreate={handleOpenSecondCreate} />
            <AddGroupDialog open={openJoin} handleClose={handleClose} handleBack={handleBack} />
            <SecondCreateDialog open={openSecondCreate} handleClose={handleClose} handleBack={handleBack} setGroupList={setGroupList} uid={uid} />
        </List>
    )
}
