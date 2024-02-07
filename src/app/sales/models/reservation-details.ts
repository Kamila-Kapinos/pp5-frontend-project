export class ReservationDetails {
  reservationId = '';
  paymentUrl = '';

  constructor(reservationId: string, paymentUrl: string) {
    this.reservationId = reservationId;
    this.paymentUrl = paymentUrl;
  }
}
