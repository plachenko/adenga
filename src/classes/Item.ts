export default class Item{
  public title!: string;
  public time!: number;

  constructor(title = '', time: number){
    this.title = title;
    this.time = time;
  }
}
