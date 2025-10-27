export enum bankNames {
  BANCO_DE_VENEZUELA = "Banco de Venezuela",
  BANCO_BICENTENARIO = "Banco Bicentenario",
  BANCO_PROVINCIAL = "Banco Provincial",
  BANCO_MERCANTIL = "Banco Mercantil",
  BANCO_VENEZOLANO_DE_CREDITO = "Banco Venezolano de Crédito",
  BANCO_BANESCO = "Banco Banesco",
  BANCO_PDVSA = "Banco PDVSA",
  BANCO_CARONI = "Banco Caroní",
  BANCO_EXTERIOR = "Banco Exterior",
  BANCO_OCCIDENTAL_DE_DESCUENTO = "Banco Occidental de Descuento",
  BANCO_DEL_TESORO = "Banco del Tesoro",
  BANCO_NACIONAL_DE_CREDITO = "Banco Nacional de Crédito",
  BANCO_SOFITASA = "Banco Sofitasa",
  BANCO_AGRICOLO_DE_VENEZUELA = "Banco Agrícola de Venezuela",
  BANCO_INTERNACIONAL_DE_DESARROLLO = "Banco Internacional de Desarrollo",
  BANCO_DEL_SUR = "Banco del Sur",
}

export interface CreateTicketDto {
  number: number;
  ticketHolderID: string;
  ticketHolderName: string;
  ticketHolderPhone: string;
  ticketHolderEmail: string;
  bankName?: bankNames;
  referenceCode: string;
  refImageUrl?: string;
}
