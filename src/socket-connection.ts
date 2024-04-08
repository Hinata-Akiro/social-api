import { Server as SocketIOServer } from 'socket.io';
import http from 'http';

const WEBSOCKET_CORS = {
   origin: "*",
   methods: ["GET", "POST"]
}

class Websocket extends SocketIOServer {

   private static io: Websocket;

   constructor(httpServer: http.Server) {
       super(httpServer, {
           cors: WEBSOCKET_CORS
       });
   }

   public static getInstance(httpServer?: http.Server): Websocket {

       if (!httpServer) {
           throw new Error("HTTP server instance is required to create Websocket instance");
       }

       if (!Websocket.io) {
           Websocket.io = new Websocket(httpServer);
       }

       return Websocket.io;
   }
}

export default Websocket;
