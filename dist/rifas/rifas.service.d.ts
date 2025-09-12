import type { Rifa } from "../../generated/prisma/index.js";
export declare const getAllRifas: () => Promise<{
    id: string;
    title: string;
    description: string | null;
    price: number;
    budget: number;
    isActive: boolean;
    totalTickets: number;
    createdAt: Date;
    updatedAt: Date;
}[]>;
export declare const createRifa: (data: Rifa) => Promise<{
    id: string;
    title: string;
    description: string | null;
    price: number;
    budget: number;
    isActive: boolean;
    totalTickets: number;
    createdAt: Date;
    updatedAt: Date;
}>;
export declare const getRifaById: (id: string) => Promise<{
    id: string;
    title: string;
    description: string | null;
    price: number;
    budget: number;
    isActive: boolean;
    totalTickets: number;
    createdAt: Date;
    updatedAt: Date;
} | null>;
export declare const updateRifa: (id: string, data: Partial<Rifa>) => Promise<{
    id: string;
    title: string;
    description: string | null;
    price: number;
    budget: number;
    isActive: boolean;
    totalTickets: number;
    createdAt: Date;
    updatedAt: Date;
}>;
export declare const deleteRifa: (id: string) => Promise<{
    id: string;
    title: string;
    description: string | null;
    price: number;
    budget: number;
    isActive: boolean;
    totalTickets: number;
    createdAt: Date;
    updatedAt: Date;
}>;
export declare const createTicketsForRifa: (rifaId: string, data: {
    number: number;
    ticketHolderID: string;
    ticketHolderEmail: string;
    ticketHolderName: string;
    ticketHolderPhone: string;
}) => Promise<{
    number: number;
    id: string;
    createdAt: Date;
    updatedAt: Date;
    ticketHolderID: string;
    ticketHolderName: string;
    ticketHolderPhone: string;
    ticketHolderEmail: string;
    referenceCode: string | null;
    isSold: boolean;
    rifaId: string;
}>;
export declare const getTicketsByRifaId: (rifaId: string) => Promise<{
    number: number;
    id: string;
    createdAt: Date;
    updatedAt: Date;
    ticketHolderID: string;
    ticketHolderName: string;
    ticketHolderPhone: string;
    ticketHolderEmail: string;
    referenceCode: string | null;
    isSold: boolean;
    rifaId: string;
}[]>;
export declare const markTicketAsSold: (ticketId: string) => Promise<{
    number: number;
    id: string;
    createdAt: Date;
    updatedAt: Date;
    ticketHolderID: string;
    ticketHolderName: string;
    ticketHolderPhone: string;
    ticketHolderEmail: string;
    referenceCode: string | null;
    isSold: boolean;
    rifaId: string;
}>;
//# sourceMappingURL=rifas.service.d.ts.map