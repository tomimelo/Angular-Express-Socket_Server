import { Socket } from "socket.io";
import socketIO from "socket.io";
import { UsersList } from "../classes/users-list";
import { User } from "../classes/user";

export const connectedUsers = new UsersList();

export const connectUser = (client: Socket, io: socketIO.Server) => {
    const user = new User(client.id);
    connectedUsers.addUser(user);
}

export const getActiveUsers = (client: Socket, io: socketIO.Server) => {
    client.on("active-users", () => {
        io.to(client.id).emit("active-users",  connectedUsers.getList());
    });
}

export const disconnect = (client: Socket, io: socketIO.Server) => {
    client.on("disconnect", () => {
        connectedUsers.deleteUser(client.id);
        io.emit("active-users", connectedUsers.getList());
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
        io.emit("active-users", connectedUsers.getList());
        if(callback) {
            callback({
                ok: true,
                user: updatedUser
            });
        }
    });
}