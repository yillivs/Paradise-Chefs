export class Comment {
    constructor(
        public name: string,
        public comment: string){
    }

    setName(n: string){
        this.name = n;
    }

    getName(){
        return this.name;
    }

    setComment(c: string){
        this.comment = c;
    }

    getComment(){
        return this.comment;
    }
}
