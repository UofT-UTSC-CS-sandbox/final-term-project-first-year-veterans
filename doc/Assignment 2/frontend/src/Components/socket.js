import { io } from 'socket.io-client';
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3000';

const socket = io(API_BASE_URL);

socket.on('connect', () => {
  console.log('Connected to server');
});

socket.on('disconnect', () => {
  console.log('Disconnected from server');
});

export default socket;