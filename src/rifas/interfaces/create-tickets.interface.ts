export interface CreateTicketDto {
  number: number;
  ticketHolderID: string;
  ticketHolderName: string;
  ticketHolderPhone: string;
  ticketHolderEmail: string;
  referenceCode: string;
  refImageUrl?: string;
}
