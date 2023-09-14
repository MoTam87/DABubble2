export class Contact {
    fullName: string;
    email: string;
    password: string;
    avatar: any;

    constructor(obj?: any){
        this.fullName = obj ? obj.fullName : '';
        this.email = obj ? obj.email : '';
        this.password = obj ? obj.password : '';
        this.avatar = obj ? obj.avatar : '';
    }

    public toJSON(){
        return {
            fullName: this.fullName,
            email: this.email,
            password: this.password,
            avatar: this.avatar,
        }
    }

}

