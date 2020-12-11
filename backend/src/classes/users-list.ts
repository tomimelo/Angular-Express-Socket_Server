import { User } from "./user";

export class UsersList {
    private list: User[] = [];

    constructor() {}

    public addUser(user: User) {
        this.list.push(user);
        return user;
    }

    public updateName(id: string, name: string) {
        for(let user of this.list) {
            if(user.id === id) {
                user.name = name;
                return user;
            }
        };
    }

    public getList() {
        return this.list.filter(user => user.name !== "anonymous");
    }

    public getUser(id: string) {
        return this.list.find(user => user.id === id);
    }

    public getLobbyUsers(lobby: string) {
        return this.list.filter(user => user.lobby === lobby);
    }

    public deleteUser(id: string) {
        const deletedUser = this.getUser(id);
        this.list = this.list.filter(user => user.id !== id);
        return deletedUser;
    }
}