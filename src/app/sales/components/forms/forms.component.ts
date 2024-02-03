import { Component } from '@angular/core';


@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.scss']
})
export class FormsComponent {
  private currentPage = 1;

  getCurrentPage(): number {
    return this.currentPage;
  }

  isNextPageButtonDisabled(): boolean {
    // TODO make it different -> I need some condition
    return false;
    // return !(this.cartProducts.length > 0 && this.sum > 0 && this.sumQuantity > 0 && this.isVoucherCodeValid());
  }

  goToNextPage(pageNumber: number): void {
    if (!this.isNextPageButtonDisabled()) {
      console.log(`Navigating to page ${pageNumber}`);
      this.currentPage = pageNumber
    } else {
      console.log('Cannot proceed to the next page. Cart is empty or data is incorrect.');
    }
  }
}
