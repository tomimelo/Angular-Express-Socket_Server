import { Socket } from "socket.io";
import socketIO from "socket.io";

export const disconnect = (client: Socket) => {

    client.on("disconnect", () => {
        console.log("Client Disconnected");
    });

}

export const message = (client: Socket, io: socketIO.Server) => {
    client.on("message", (payload, callback) => {
        console.log(`Message from ${payload.from} received: ${payload.message}`);

        io.emit("new-message", payload);
    });
}