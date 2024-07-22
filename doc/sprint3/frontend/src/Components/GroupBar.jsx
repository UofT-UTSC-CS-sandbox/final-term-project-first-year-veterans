import * as React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'; 

import { styled, alpha } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
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

const uid = 'Richie_Hsieh';

const groupList = [
    {name: 'Group 1'},
    {name: 'Group 2'},
    {name: 'Group 3'},
    {name: 'Group 4'},
    {name: 'Group 5'},
];

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
                    <ListItemButton onClick={(e) => handleOpenCreate(e)}>
                        <ListItemIcon>
                            <CreateIcon />
                        </ListItemIcon>
                        <ListItemText primary="Create My Own" />
                    </ListItemButton>
                    <ListItemButton onClick={(e) => handleOpenJoin(e)}>
                        <ListItemIcon>
                            <AddIcon />
                        </ListItemIcon>
                        <ListItemText primary="Join A Group" />
                    </ListItemButton>
                </List>
            </DialogContent>
            <DialogActions>
                <Button onClick={(e) => handleClose(e)}>Close</Button>
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
                        />
                    </Search>
                </List>
            </DialogContent>
            <DialogActions>
                <Button onClick={(e) => handleBack(e)}>Back</Button>
                <Button onClick={(e) => handleClose(e)}>Close</Button>
          </DialogActions>
        </Dialog>
    );
}

function CreateServerDialog({ open, handleClose, handleBack }) {
    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Create Your Server</DialogTitle>
            <DialogContent>
            <List>
                <ListItemButton>
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
                <Button onClick={(e) => handleBack(e)}>Back</Button>
                <Button onClick={(e) => handleClose(e)}>Close</Button>
            </DialogActions>
        </Dialog>
    );
  }

export default function GroupBar() {
    const [open, setOpen] = useState(false);
    const [openCreate, setOpenCreate] = useState(false);
    const [openJoin, setOpenJoin] = useState(false);

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

    const handleBack = (e) => {
        setOpenCreate(false);
        setOpenJoin(false);
        setOpen(true);
    };

    const handleClickOpen = () => {
        setOpen(true);
    };
  
    const handleClose = (e) => {
        setOpen(false);
        setOpenCreate(false);
        setOpenJoin(false);
    };

    return (
        <List sx={{ 
            width: '100%', 
            maxWidth: '100%', 
            bgcolor: 'background.paper',
            marginLeft: 'auto',
            marginRight: 'auto',
        }}>
            {groupList.map((group, index) => ( //{state, uid, last_name, first_name}
                <div>
                    <ListItemButton alignItems="flex-start" onClick={handleGroupClick}>
                        <ListItemAvatar style={{marginTop: 'auto', marginBottom: 'auto'}}>
                            <Avatar alt={group.name} />
                        </ListItemAvatar>
                        <ListItemText
                            primary={group.name}
                            secondary="Group Description"
                        />
                        <Tooltip title="Chat" style={{marginTop: 'auto', marginBottom: 'auto'}}>
                            <IconButton 
                            edge="end" 
                            aria-label="delete" 
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
            <CreateServerDialog open={openCreate} handleClose={handleClose} handleBack={handleBack} />
            <AddGroupDialog open={openJoin} handleClose={handleClose} handleBack={handleBack} />
        </List>
    )
}