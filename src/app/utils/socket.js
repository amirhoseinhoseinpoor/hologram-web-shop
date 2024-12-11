import { io } from 'socket.io-client';

// Initialize chat socket without authentication
const socket = io(`${process.env.NEXT_PUBLIC_BACK_END_SERVER}/chat`, {
  transports: ["websocket"],
});

export default socket;