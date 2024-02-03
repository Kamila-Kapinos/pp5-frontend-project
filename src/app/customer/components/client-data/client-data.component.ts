import { Component } from '@angular/core';
import { Customer} from "../../models/customer";
import { NgForm } from "@angular/forms";
// import { Router } from "@angular/router";

@Component({
  selector: 'app-client-data',
  templateUrl: './client-data.component.html',
  styleUrls: ['./client-data.component.scss']
})
export class ClientDataComponent {

  customer = new Customer();

  // constructor(private router: Router) {
  // }

  onSubmit(form: NgForm){
    if(form.valid && form.submitted){
      console.log(form.value)
    //   TODO dodać gdzieś tego klienta
    }
    else{
      console.log("Nie dodano klienta, formularz niepoprawny")
    }
  }

  // goToNextPage(page: number, form: NgForm) {
  //   if (!this.isNextPageButtonDisabled(form)) {
  //     console.log(`Navigating to page ${page}`);
  //     // TODO change path to 3rd form when created
  //     this.router.navigate(['/clientData']);
  //   } else {
  //     console.log('Cannot proceed to the next page. Cart is empty or data is incorrect.');
  //   }
  // }
  //
  // isNextPageButtonDisabled(form: NgForm) {
  //   return !(form.valid && form.submitted);
  // }
}
