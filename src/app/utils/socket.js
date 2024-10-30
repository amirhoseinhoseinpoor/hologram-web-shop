// socket.js
import { io } from 'socket.io-client';

const socket = io(`${process.env.NEXT_PUBLIC_BACK_END_SERVER}`); // Replace with your backend URL

export default socket;