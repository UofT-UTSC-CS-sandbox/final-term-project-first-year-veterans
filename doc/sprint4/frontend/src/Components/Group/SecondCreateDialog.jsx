import * as React from 'react';
import { useState, useEffect } from 'react';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import { api_group_create } from "../../API/GroupAPI"

function SecondCreateDialog({ open, handleClose, handleBack, setGroupList, uid }) {
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

export default SecondCreateDialog;
