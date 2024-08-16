import * as React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 

import { styled, alpha } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import InputBase from '@mui/material/InputBase';

import CreateIcon from '@mui/icons-material/Create';
import GameIcon from '@mui/icons-material/SportsEsports';
import SchoolIcon from '@mui/icons-material/School';
import StudyIcon from '@mui/icons-material/MenuBook';
import ChatIcon from '@mui/icons-material/Chat';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import TextField from '@mui/material/TextField';

import { api_group_create } from "../API/GroupAPI"
import { api_group_fetch } from '../API/GroupAPI';

const uid = 'Richie_Hsieh';

function formatDateTime(dateTimeString) {
    const date = new Date(dateTimeString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is 0-indexed, so we add 1
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}`;
}

// Styling for the search bar
const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.grey[700], 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.grey[800], 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    [theme.breakpoints.up('sm')]: {
      width: '66%',
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  }));
  
const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));
  
const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    width: '100%',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '100%',
      },
    },
}));

function AddOrCreateDialog({ open, handleClose, handleOpenCreate, handleOpenJoin }) {
    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Add or Create Your Server</DialogTitle>
            <DialogContent>
                <List>
                    <ListItemButton onClick={handleOpenCreate}>
                        <ListItemIcon>
                            <CreateIcon />
                        </ListItemIcon>
                        <ListItemText primary="Create My Own" />
                    </ListItemButton>
                    <ListItemButton onClick={handleOpenJoin}>
                        <ListItemIcon>
                            <AddIcon />
                        </ListItemIcon>
                        <ListItemText primary="Join A Group" />
                    </ListItemButton>
                </List>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Close</Button>
            </DialogActions>
        </Dialog>
    );
}

function AddGroupDialog({ open, handleClose, handleBack }) {
    const [searchTerm, setSearchTerm] = useState(''); // Search term for prefix search
    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Search & Join</DialogTitle>
            <DialogContent>
                <List>
                    <ListItem>
                        <ListItemText primary="Search on Group ID" />
                    </ListItem>
                    <Search sx={{ marginBottom: '1em',  marginTop: '1em'}}>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder="Search…"
                            inputProps={{ 'aria-label': 'search' }}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </Search>
                </List>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleBack}>Back</Button>
                <Button onClick={handleClose}>Close</Button>
            </DialogActions>
        </Dialog>
    );
}

function CreateServerDialog({ open, handleClose, handleBack, handleOpenSecondCreate }) {
    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Create Your Server</DialogTitle>
            <DialogContent>
            <List>
                <ListItemButton onClick={handleOpenSecondCreate}>
                    <ListItemIcon>
                        <CreateIcon />
                    </ListItemIcon>
                    <ListItemText primary="Create My Own" />
                </ListItemButton>
                <ListItem>
                    <ListItemText primary="START FROM A TEMPLATE" />
                </ListItem>
                <ListItemButton>
                    <ListItemIcon>
                        <GameIcon />
                    </ListItemIcon>
                    <ListItemText primary="Gaming" />
                </ListItemButton>
                <ListItemButton>
                    <ListItemIcon>
                        <SchoolIcon />
                    </ListItemIcon>
                    <ListItemText primary="School Club" />
                </ListItemButton>
                <ListItemButton>
                    <ListItemIcon>
                        <StudyIcon />
                    </ListItemIcon>
                    <ListItemText primary="Study Group" />
                </ListItemButton>
            </List>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleBack}>Back</Button>
                <Button onClick={handleClose}>Close</Button>
            </DialogActions>
        </Dialog>
    );
}

function SecondCreateDialog({ open, handleClose, handleBack, setGroupList }) {
    const [groupName, setGroupName] = useState('');
    const [maxUsers, setMaxUsers] = useState('');
    const [groupDescription, setGroupDescription] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        api_group_create({name: groupName, max: maxUsers, description: groupDescription, creator: uid}, (data) => {
            console.log(data);
            setGroupList((prevGroupList) => [...prevGroupList, data.newGroup]);
        });
        console.log('Group Name:', groupName);
        console.log('Max Users:', maxUsers);
        console.log('Group Description:', groupDescription);
        handleClose();
        setGroupDescription('');
        setGroupName('');
        setMaxUsers('');
    };

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Create a new Group!</DialogTitle>
            <DialogContent>
                <form onSubmit={handleSubmit}>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Group Name"
                        type="text"
                        fullWidth
                        variant="outlined"
                        value={groupName}
                        onChange={(e) => setGroupName(e.target.value)}
                    />
                    <TextField
                        margin="dense"
                        label="Max Number of Users"
                        type="number"
                        fullWidth
                        variant="outlined"
                        value={maxUsers}
                        onChange={(e) => setMaxUsers(e.target.value)}
                    />
                    <TextField
                        margin="dense"
                        label="Group Description"
                        type="text"
                        fullWidth
                        variant="outlined"
                        value={groupDescription}
                        onChange={(e) => setGroupDescription(e.target.value)}
                    />
                </form>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleBack}>Back</Button>
                <Button onClick={handleClose}>Close</Button>
                <Button onClick={handleSubmit} type="submit">Submit</Button>
            </DialogActions>
        </Dialog>
    );
}


export default function GroupBar() {
    const [open, setOpen] = useState(false);
    const [openCreate, setOpenCreate] = useState(false);
    const [openJoin, setOpenJoin] = useState(false);
    const [openSecondCreate, setOpenSecondCreate] = useState(false);
    const [groupList, setGroupList] = useState([]);

    useEffect(() => {
        // Fetch group list from the backend
        api_group_fetch({uid: uid}, data => {
            console.log(data);
            setGroupList(data.groups);
        });
    }, []);

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
            <SecondCreateDialog open={openSecondCreate} handleClose={handleClose} handleBack={handleBack} setGroupList={setGroupList}/>
        </List>
    )
}
