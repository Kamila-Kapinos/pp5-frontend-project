import { Component } from '@angular/core';
import { Customer} from "../../models/customer";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-client-data',
  templateUrl: './client-data.component.html',
  styleUrls: ['./client-data.component.scss']
})
export class ClientDataComponent {

  customer = new Customer();

  onSubmit(form: NgForm){
    if(form.valid && form.submitted){
      console.log(form.value)
    //   TODO dodać gdzieś tego klienta
    }
    else{
      console.log("Nie dodano klienta, formularz niepoprawny")
    }
  }

}
