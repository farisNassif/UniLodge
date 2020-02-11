export class Listing { 
  constructor(
    public Title: string,
    public Seller: string,
    public Location: string,
    public Price: string,
    public ContactNumber: string,
    public Image?: string,
    public _id?: number
  ) {  }
}

let listing =  new Listing(
  "MyTitle",
  "MySeller",
  "MyLocation",
  "MyPrice",
  "MyNumber",
  "OptionalImage",
  123
);
console.log('MY LISTING IS ' + listing.Title); 
