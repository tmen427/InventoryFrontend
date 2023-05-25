import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-barcodes',
  templateUrl: './barcodes.component.html',
  styleUrls: ['./barcodes.component.scss']
})

export class BarcodesComponent implements OnInit {

  showImages: boolean = false; 
  barcode: any;
  //url : string = 'https://localhost:7294/Barcode'; 
  url: string = 'https://localhost:7294/Api/NewBarCode'; 
  barcodeArray: any[] = []; 
  route:string; 

  constructor(public Http: HttpClient) { }

  ngOnInit(): void {
  
    //generate 5 barcodes oninit 
    for(let x = 0; x<5; x++) {
      this.GenerateBarcode()
    } 
  
  }

  GenerateBarcode() {
        this.Http.get(this.url).subscribe(
        response => {this.barcode = response
        this.barcodeArray.push(this.barcode)
        console.log(this.barcodeArray)

      }, 
        function (error) { console.log(error); }
      ); 
  
  }

 
  counter: number = 0; 
   
 ShowTheImages() {
    this.showImages =true;
    console.log(this.barcodeArray[this.counter].Barcode);
    // read off the barcode images that have been initialized onint 
    this.route =`/assets/img/bitmap/${this.barcodeArray[this.counter].Barcode}.png`;
    this.counter++; 
       
    //generate another barcode so that the progam always has 5 more then the current, so that when you click on the button it using a barcode that has already been created, not generating a new one on the whim
    this.GenerateBarcode(); 
  }

  Search() {
    console.log("do some serching here"); 
 }
  
  PrintThisPage() {
    window.print();
  }


}
