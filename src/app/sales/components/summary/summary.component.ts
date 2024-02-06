import {Component, TemplateRef} from '@angular/core';
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {SummaryService} from "../../services/summary.service";


@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})

export class SummaryComponent{
  modalRef?: BsModalRef;
  products;
  city;
  email;
  houseNumber;
  lastName;
  name;
  phone;
  postcode;
  street


  constructor(private modalService: BsModalService, private summaryService: SummaryService) {
    this.products = summaryService.getCartProducts()
    this.city = summaryService.getCity();
    this.email = summaryService.getEmail();
    this.houseNumber = summaryService.getHouseNumber();
    this.lastName = summaryService.getLastName();
    this.name = summaryService.getName();
    this.phone = summaryService.getPhone();
    this.postcode = summaryService.getPostcode();
    this.street = summaryService.getStreet();


  }

  getProductName(id: string){
    let productName;
    this.summaryService.getProductName(id).subscribe((name: string) => {productName = name});
    return productName;
  }
  openModal(template: TemplateRef<void>) {
    this.modalRef = this.modalService.show(template);
  }
}
