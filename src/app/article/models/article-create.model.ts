import { Author } from "./author";

export class ArticleCreate {
  constructor(   
    public name : string,
    public imagePath : string,
    public description : string,
    public body : string,
    public author: Author,
    public createdOn: Date,
    public category: string
  ) { }
}