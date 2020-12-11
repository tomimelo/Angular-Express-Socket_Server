export class User {

    public id: string;
    public name: string;
    public lobby: string;

    constructor(id: string) {
        this.id = id;
        this.name = "anonymous";
        this.lobby = "open"
    }

}