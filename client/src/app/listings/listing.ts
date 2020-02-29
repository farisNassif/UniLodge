export class Listing { 
  constructor(
    public Unique_Id: any,
    public Title: string,
    public Seller: string,
    public Description: any,
    public Location: any,
    public Price: number,
    public ContactNumber: string,
    public Image?: string,
  ) {  }
}
