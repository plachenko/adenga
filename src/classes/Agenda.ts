import Item from './Item';

export default class Agenda{
  public tStart!: Date;
  public tEnd!: Date;
  public items!: Item[];

  constructor(itmArr: Item[] = []){
    this.items = itmArr;
  }

  public start(){
    this.tStart = new Date();
  }

  public end(){
    this.tEnd = new Date();
  }

  public addItem(title = '', minutes: number){
    const item = new Item(title, minutes);
    this.items.push(item);
  }
}
