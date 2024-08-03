import * as React from 'react';
import { useState } from 'react';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';

import SearchComponent from '../General/SearchComponent';

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
                    <SearchComponent searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
                </List>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleBack}>Back</Button>
                <Button onClick={handleClose}>Close</Button>
            </DialogActions>
        </Dialog>
    );
}

export default AddGroupDialog;
