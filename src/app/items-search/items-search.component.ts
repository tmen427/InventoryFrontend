import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';


declare interface TableData{
  headerRow: string[]; 
  dataRows: string []; 
}

declare interface Item {
  technicalName: string, 
  displayName :string,
  lotNumber: string, 
  isCurrent: boolean, 
  isNew: boolean, 
  warning: number, 
  critical: number, 
  countPerShippingBox: number, 
  expirationDate: Date, 
  id: string
}


@Component({
  selector: 'app-items-search',
  templateUrl: './items-search.component.html',
  styleUrls: ['./items-search.component.scss']
})
export class ItemsSearchComponent implements OnInit {

  constructor(public Http: HttpClient) { }
  
  public tableData: TableData; 
  url: string = "https://localhost:7241/api/Items"; 
  //any for now
  Holder: any[] = []; 
  Items: any[] = []; 
 
  ItemResponse: Item; 
  RowsItem : any;  
  keys: string[] =[]; 
  rowsArray: string[] = [];  
  lotnumbers: string[]; 

  getItems() {
    this.Http.get<Item>(this.url).subscribe(response=> {
        this.ItemResponse = response; 
        this.Holder.push(this.ItemResponse); 

        this.Items = this.Holder[0].items; 
        // [{item},{item},{item}]     
        //search by lot number
        this.lotnumbers = this.Items.map(x=>x.lotNumber); 
        console.log("in the getitems method bro")
        console.log(this.lotnumbers)

        //set the data into the tables
        let rows = this.Items.map(x => 
          {
           // Object.values(x)
            this.RowsItem = Object.values(x); 
          //  console.log(this.RowsItem);
            //[ [], [], []     ]
            return this.RowsItem; 
       
          });    
    }, function(error) {console.log(error)}
  
    )

      
  }

    show: boolean = false; 
    searchedLot : Item[] = [];  
    searchedObject: Item; 
  
display(LotNumber:string): void {
    //get specific lotNumber object, will return one object [{}]
   this.searchedLot = this.Items.filter(x=> {
    if (LotNumber == x.lotNumber) {
        return x; 
    }  
   })

     this.searchedObject  = this.searchedLot[0];

     console.log(this.searchedObject);
    
    if (LotNumber) {
      this.show = true; 
    }
  
  }

  ngOnInit(): void {
    this.getItems(); 
  }






}
