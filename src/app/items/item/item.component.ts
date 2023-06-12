import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Guid } from "guid-typescript";


declare interface TableData{
  headerRow: string[]; 
  dataRows: string []; 
}

declare interface ItemKeys{
displayName: string,
lotNumber: string, 
isCurrent: boolean, 
expiration: string, 
currentQuantity: string,
lastUsed: string, 
lastReceived: string
}


declare interface DepartmentObject {
  departments: Department[]
}

declare interface Department {
  id:Guid, 
  technicalName:string, 
  displayName:string, 
 
}

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})

export class ItemComponent implements OnInit {
 


 Department = {departments: []}

 //these global variables are used on the frontend-(item.commponent.html)
 ClickedDepartmentResponse: any[] = [] 
 keys: string[];  
 rowsArray: string[] ; 
 rowsArray1:  any[] = []; 
 Departmentnames : string[]; 
 tableData: TableData; 


 
constructor(public Http: HttpClient) { }


getDepartmentNames() {
   let departmentroute = "https://localhost:7241/api/Departments"; 
   
   this.Http.get<DepartmentObject>(departmentroute).subscribe((response: DepartmentObject)=> {
    this.Departmentnames = response.departments.map(x=>x.displayName); 
    let departments = this.Departmentnames[0];

    //whatever the frist name is place that into the next method
    this.getDepartmentIds(departments); 

  }); 

}

clickingResponse: string; 
//function is also called on the frontend also
getDepartmentIds(departmentName: string)  {
  let departmentroute = "https://localhost:7241/api/Departments"; 
       
  this.Http.get<DepartmentObject>(departmentroute).subscribe((response: DepartmentObject)=> {      
        this.ClickedDepartmentResponse= response.departments.filter(x=>x.displayName==departmentName).map(x=>x.id); 
      
        console.log("the clicked response " + this.ClickedDepartmentResponse[0])
    
        this.GetDepartmentItems(this.ClickedDepartmentResponse[0]);
      }) 
    }; 


  url: string; 
  DisplayName: string[];

GetDepartmentItems(DepartmentId: string): void {
    this.url = `https://localhost:7241/api/Departments/${DepartmentId}/itemquantities`
   
    this.Http.get<any>(this.url).subscribe(response=> {
    //clear the array 
     let Departmentinfo = []; 
     Departmentinfo.push(response); 
     console.log(Departmentinfo); 
     this.DisplayDepartments(Departmentinfo);
      
     //show all the item names for that deparment
     this.DisplayName = response.items.map(x=>x.displayName); 


     
 })
}

//function is called on the front end
preparingEvents(ItemDisplayName: string) {   
      
   
      //making sure the frontend table is clear
      this.rowsArray1 = [];
         //use whichever item you picked from the drop down menu
         let Departmentreponse = this.ClickedDepartmentResponse[0];
      //displayItemNames on the frontend for that specific deparment
      let url1= `https://localhost:7241/api/Departments/${Departmentreponse}/itemquantities`
      
      this.Http.get<any>(url1).subscribe(response=> {
       //get the associated deparmentId and itemId for instance
        let departmentId = response.items.filter(x=>x.displayName==ItemDisplayName).map(x=>x.departmentId)
        let itemId = response.items.filter(x=>x.displayName==ItemDisplayName).map(x=>x.itemId)
       
        this.getAllItemsEvents(departmentId[0], itemId[0]);
     
   })

}

getAllItemsEvents( departmentId: string,  itemId:string): void {
  let url = `https://localhost:7241/api/Departments/${departmentId}/Items/${itemId}/events`; 
  console.log(url);
  this.Http.get<any>(url).subscribe((response)=> {
    //console.log("the events table:"); 
   // console.log(response.events);;
    this.DisplayEvents(response.events);
  }); 
}

keys1: string[] = []; 
metaData : any[] = [];

DisplayEvents(Events: any[]) {
  
  var newKeys =  {
    Type: "",
    TimeStamp: "", 
    Quantity: "",
    Reason: "",
  }

  this.keys1 = Object.keys(newKeys);
 

   //filter throug all the events
let rows = Events.map((x)=> {
    var newKeys =  {
    Type: x.type,
    TimeStamp: x.timestamp, 
    Quantity: x.metadata.quantity,
    Reason: x.metadata.reason,
  }
    return newKeys; 
  });
  
 // console.log(rows)
  rows.forEach(element => {
    if (element.TimeStamp) {
        element.TimeStamp = new Date(element.TimeStamp).toLocaleString();  
      }
   if (element.Reason===undefined) {
          element.Reason = "N/A"
    }
 });

console.log(rows)
 let newArray =  rows.map((x)=> {
    let rowItems = Object.values(x);
    return rowItems; 
  })
    
    this.rowsArray1 = newArray; 
  }




//display departments on the frontend
DisplayDepartments(departmentinfo: any[]): void {
    
    let itemKey = {
      displayName: "",
      lotNumber: "", 
      isCurrent: false, 
      expiration: "", 
      currentQuantity: "",
      lastUsed: "", 
      lastReceived: ""
       }
   
   let newKeys = Object.keys(itemKey)
   this.keys =  newKeys;


       let newArray =  departmentinfo[0].items.map((element)=>{
            let x  = {
              displayName: element.displayName,
              lotNumber: element.lotNumber, 
              isCurrent: element.isCurrent, 
              expiration: element.expiration, 
              currentQuantity: element.currentQuantity,
              lastUsed: element.lastUsed, 
              lastReceived: element.lastReceived
               }
               return x; 
              }
           )         
    
        // further formating for the frontend 
          newArray.forEach(element => {
            if (element.isCurrent ===true) {
                element.isCurrent = "Yes"
            } 
            if (element.isCurrent ===false) {
                element.isCurrent = "No"
            }
            if (element.expiration) {
                element.expiration =  new Date(element.expiration); 
            } 
            if (element.lastUsed) {
                element.lastUsed = new Date(element.lastUsed);
            }    
            if (element.lastReceived)  {
              element.lastReceived = new Date(element.lastReceived); 
            }   
          });


        let rows = newArray.map(x => 
          {
           
          let rowdata =  Object.values(x); 
          return rowdata; 
    
          }); 

  
        this.rowsArray = rows;      
             
         //set the tabledata interface 
      this.tableData = {
          headerRow: this.keys, 
          dataRows: this.rowsArray
        }
  }

  

ngOnInit(): void {
      this.getDepartmentNames()
      
  }

}
