import * as React from 'react'; 

import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';

import CreateIcon from '@mui/icons-material/Create';
import AddIcon from '@mui/icons-material/Add';

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

export default AddOrCreateDialog;