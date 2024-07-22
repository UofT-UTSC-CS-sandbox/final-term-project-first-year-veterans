import React from 'react';
import { useEffect, useRef } from 'react';
import { styled } from '@mui/system';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import Fab from '@mui/material/Fab';
import SendIcon from '@mui/icons-material/Send';
import { ListItemButton } from '@mui/material';

import { api_chat_fetch } from '../API/ChatAPI';
import { api_message_fetch } from '../API/ChatAPI';
import { api_message_send } from '../API/ChatAPI';

const ChatSection = styled(Paper)({
  width: '70%',
  height: '80vh',
  display: 'flex',
  flexDirection: 'row',
});

const BorderRight500 = styled(Grid)({
  borderRight: '1px solid #e0e0e0',
});

const MessageArea = styled(List)({
  height: '70vh',
  overflowY: 'auto',
});

const uid='Richie_Hsieh'; // Hardcoded user id

function formatDateTime(dateTimeString) {
    const date = new Date(dateTimeString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is 0-indexed, so we add 1
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}`;
}

function Chat({ newMessage, sendMessage }) {
    const messageEndRef = useRef(null);
    const inputRef = useRef(null);
    const [contacts, setContacts] = React.useState([]);
    const [chatWith, setChatWith] = React.useState({ uid: '', first_name: '', last_name: '', status: '', chat_id: '', isGroup: false});
    const [messages, setMessages] = React.useState([]);
    

    // Function to scroll to the bottom of the message list
    const scrollToBottom = () => {
        messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const handleClick = (e, contact) => {
        console.log("loading messages with ", contact);
        setChatWith(contact);
    };

    const handleSendMessage = () => {
        const input = inputRef.current.value.trim();
        if (input !== '') {
            sendMessage({ sender: uid, time: new Date().toISOString(), content: input, receiver: chatWith.uid });
            api_message_send({sender: uid, chat_id: chatWith.chat_id, content: input}, (data) => {
                console.log(data.message);
            });
            inputRef.current.value = ''; // Clear the input field
        }
    };

    // Scroll to the bottom every time messages change
    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    // Add the new message to the message list
    useEffect(() => {
        if (newMessage && newMessage.content) {
            setMessages((prevMessageList) => [...prevMessageList, newMessage]);
        }
    }, [newMessage]);

    // Fetch the contacts when the component mounts
    useEffect(() => {
        api_chat_fetch({uid: uid}, (data) => {
            console.log(data);
            setContacts(data.chats);
            setChatWith(data.chats[0]);
        });
    }, []);

    // Update the message list when the chatWith user changes
    useEffect(() => {
        api_message_fetch({uid: uid, user: chatWith.uid}, (data) => {
            console.log(data);
            setMessages(data.messages);
        });
    }, [chatWith]);

    return (
        <div>
            <Grid container>
                <Grid item xs={12}>
                    <Typography variant="h5" className="header-message">Chat</Typography>
                </Grid>
            </Grid>
            <ChatSection style={{height:"100%", marginLeft: "auto", marginRight: "auto"}}>
                <BorderRight500 item style={{width: "50%"}}>
                    <List>
                        <ListItem>
                            <ListItemIcon>
                            <Avatar alt={chatWith.first_name} />
                            </ListItemIcon>
                            <ListItemText primary={chatWith.first_name + ' ' + chatWith.last_name}></ListItemText>
                        </ListItem>
                    </List>
                    <Divider />
                    <Grid item xs={12} style={{padding: '10px'}}>
                        <TextField id="outlined-basic-email" label="Search" variant="outlined" fullWidth />
                    </Grid>
                    <Divider />
                    <List>
                        {contacts.map((contact, index) => (
                            <ListItemButton key={index} onClick={(e) => handleClick(e, contact)}>
                                <ListItemIcon>
                                    <Avatar alt={contact.first_name} />
                                </ListItemIcon>
                                <ListItemText primary={contact.first_name + ' ' + contact.last_name}></ListItemText>
                                <ListItemText secondary={contact.status} align="right"></ListItemText>
                            </ListItemButton>
                        ))}
                    </List>
                </BorderRight500>
                <Grid item style={{width: "100%"}}>
                    <MessageArea>
                        {messages.map((message, index) => (
                            <ListItem key={index}>
                                <Grid container>
                                    <Grid item xs={12}>
                                        <ListItemText align={ message.sender === uid ? "right" : "left" } primary={message.content}></ListItemText>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <ListItemText align={ message.sender === uid ? "right" : "left" } secondary={formatDateTime(message.time)}></ListItemText>
                                    </Grid>
                                </Grid>
                            </ListItem>
                        ))}
                        <div ref={messageEndRef} />
                    </MessageArea>
                    <Divider />
                    <Grid container style={{padding: '20px'}}>
                        <Grid item xs={10.5}>
                        <TextField
                            id="outlined-basic-email"
                            label="Type Something"
                            fullWidth
                            inputRef={inputRef}
                        />
                        </Grid>
                        <Grid item xs={1.5} align="right">
                            <Fab color="primary" aria-label="add" onClick={handleSendMessage}><SendIcon /></Fab>
                        </Grid>
                    </Grid>
                </Grid>
            </ChatSection>
        </div>
    );
}

export default Chat;
