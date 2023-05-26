import { Component, OnInit } from '@angular/core';
//import { TabsetComponent } from 'ngx-tabset';

@Component({
  selector: 'app-item-tabs',
  templateUrl: './item-tabs.component.html',

  styleUrls: ['./item-tabs.component.scss']
})
export class ItemTabsComponent implements OnInit {
 
  constructor() { }
   active: number = 1; 

  ngOnInit(): void {
    
  }

  showBarcode: boolean = false; 
  showTable: boolean = false; 
  showSearch: boolean = false; 
  hidemain: boolean = true; 
  
  showDiv(numberId) {
    if (numberId == 1) {
    this.showBarcode = true;
    this.showTable = false;  
    this.showSearch = false; 
    this.hidemain = false; 
    }
    if (numberId == 2) {
      this.showTable = true; 
      this.showBarcode = false;
      this.showSearch = false;  
      this.hidemain = false; 
    }
    if (numberId ==3) {
      this.showSearch = true; 
      this.showBarcode = false; 
      this.showTable = false; 
      this.hidemain = false; 
    }
  }

}
