import { Component, OnInit, Input , SimpleChanges} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

declare interface Item {
  technicalName: string,
  displayName: string,
  lotNumber: string,
  isCurrent: boolean,
  isNew: boolean, 
  warning: number,
  critical: number,
  countPerShippingBox: number,
  expirationDate: string,
  description: string, 
  id: string, 
}

@Component({
  selector: 'app-items-posting',
  templateUrl: './items-posting.component.html',
  styleUrls: ['./items-posting.component.scss']
})
export class ItemsPostingComponent implements OnInit {
//coming from the parent component 
  @Input() item : Item;  
  profileForm;  
  Items: Item; 
  displaySomethingBack; 
  
 
  //the post method-in the future....
onSubmit() {
  console.log(this.profileForm.get('displayName').value);
  //match the values with the interface 
  console.log(JSON.stringify(this.profileForm.value));
  
//get the value from the form for posting 
this.Items = {
  technicalName: this.profileForm.get("technicalName").value,
  displayName: this.profileForm.get("displayName").value,
  lotNumber: this.profileForm.get("lotNumber").value,
  isCurrent: this.profileForm.get("isCurrent").value,
  isNew: this.profileForm.get("isNew").value, 
  warning: this.profileForm.get("warning").value,
  critical: this.profileForm.get("critical").value,
  countPerShippingBox: this.profileForm.get("countPerShippingBox").value,
  expirationDate: this.profileForm.get("expirationDate").value,
  description: this.profileForm.get("description").value, 
  id: this.profileForm.get("id").value, 
  }
  

  console.log(this.Items); 
  this.http.post<Item>('https://localhost:7241/api/Items', { title: 'Angular POST Request Example' }).subscribe(data => {
    this.displaySomethingBack = data.displayName;
   }) ; 
 }



  constructor(private http: HttpClient) { }

 
  ngOnInit(): void {


 /**  
   this.profileForm = new FormGroup({
    technicalName: new FormControl(this.item.technicalName),
    displayName: new FormControl(this.item.displayName),
    lotNumber: new FormControl(this.item.lotNumber),
    isCurrent: new FormControl(this.item.isCurrent),
    isNew: new FormControl(this.item.isCurrent), 
    warning: new FormControl(this.item.warning),
    critical: new FormControl(this.item.critical),
    countPerShippingBox: new FormControl(this.item.countPerShippingBox),
    expirationDate: new FormControl(this.item.expirationDate),
    description: new FormControl(this.item.description), 
    id: new FormControl(this.item.id), 
  });
*/
 
  }

  //watches for changes from the parent class to this (child) class
  ngOnChanges(changes: SimpleChanges) {
    console.log('this is in the child class!')
    console.log(changes.item.currentValue)

    this.profileForm = new FormGroup({
      technicalName: new FormControl(changes.item.currentValue.technicalName),
      displayName: new FormControl(changes.item.currentValue.displayName),
      lotNumber: new FormControl(changes.item.currentValue.lotNumber),
      isCurrent: new FormControl(changes.item.currentValue.isCurrent),
      isNew: new FormControl(changes.item.currentValue.isCurrent), 
      warning: new FormControl(changes.item.currentValue.warning),
      critical: new FormControl(changes.item.currentValue.critical),
      countPerShippingBox: new FormControl(changes.item.currentValue.countPerShippingBox),
      expirationDate: new FormControl(changes.item.currentValue.expirationDate),
      description: new FormControl(changes.item.currentValue.description), 
      id: new FormControl(changes.item.currentValue.id), 
    });
  
  
  }

}

