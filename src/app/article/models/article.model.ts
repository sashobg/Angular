import { Author } from "./author";

export class Article {
  constructor(
    public id,
    public name : string,
    public imagePath : string,
    public description : string,
    public body : string,
    public author: Author,
    public createdOn: Date,
    public category: string
  ) { }
}