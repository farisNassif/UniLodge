export class Listing { 
  constructor(
    public Title: string,
    public Seller: string,
    public Location: string,
    public Price: Number,
    public ContactNumber: string,
    public Image?: string,
    public _id?: number
  ) {  }
}
