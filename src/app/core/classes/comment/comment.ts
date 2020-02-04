export class Comment {
    constructor(
        public name: String,
        public comment: String){
    }

    setName(string: String){
        this.name = string;
    }

    getName(){
        return this.name;
    }

    setComment(string: String){
        this.comment = string;
    }

    getComment(){
        return this.comment;
    }
}
