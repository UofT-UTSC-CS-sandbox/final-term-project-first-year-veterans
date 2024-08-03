import * as React from 'react';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';

import CreateIcon from '@mui/icons-material/Create';
import GameIcon from '@mui/icons-material/SportsEsports';
import SchoolIcon from '@mui/icons-material/School';
import StudyIcon from '@mui/icons-material/MenuBook';


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

export default CreateServerDialog;