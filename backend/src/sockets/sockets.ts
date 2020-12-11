import { Socket } from "socket.io";
import socketIO from "socket.io";
import { UsersList } from "../classes/users-list";
import { User } from "../classes/user";

export const connectedUsers = new UsersList();

export const connectUser = (client: Socket) => {
    const user = new User(client.id);
    connectedUsers.addUser(user);
}

export const disconnect = (client: Socket) => {
    client.on("disconnect", () => {
        connectedUsers.deleteUser(client.id);
    });
}

export const message = (client: Socket, io: socketIO.Server) => {
    client.on("message", (payload, callback) => {
        io.emit("new-message", payload);
    });
}

export const userConfig = (client: Socket, io: socketIO.Server) => {
    client.on("user-configuration", (payload, callback: Function) => {
        const updatedUser = connectedUsers.updateName(client.id, payload.name);
        callback({
            ok: true,
            user: updatedUser
        });
    });
}