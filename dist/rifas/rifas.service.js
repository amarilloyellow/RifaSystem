// src/rifas/rifas.service.ts
import prisma from "../config/prisma.js";
// Servicio para obtener todas las rifas
export const getAllRifas = async () => {
    return await prisma.rifa.findMany();
};
// Servicio para crear una nueva rifa
export const createRifa = async (data) => {
    return await prisma.rifa.create({
        data,
    });
};
// Servicio para obtener una rifa por ID
export const getRifaById = async (id) => {
    return await prisma.rifa.findUnique({
        where: { id },
    });
};
// Servicio para actualizar una rifa
export const updateRifa = async (id, data) => {
    return await prisma.rifa.update({
        where: { id },
        data,
    });
};
// Servicio para eliminar una rifa
export const deleteRifa = async (id) => {
    return await prisma.rifa.delete({
        where: { id },
    });
};
// Crear ticket para la rifa y relacionar con la rifa
export const createTicketsForRifa = async (rifaId, data) => {
    // $transation de prisma para crear los tickets en lote
    const createTicket = prisma.$transaction(async (tx) => {
        // Verificar si ya se creo el ticket
        const existingTicket = await tx.ticket.findUnique({
            where: { number: data.number },
        });
        if (existingTicket) {
            throw new Error(`El ticket con el número ${data.number} ya existe.`);
        }
        // Crea un nuevo ticket
        return await tx.ticket.create({
            data: {
                number: data.number,
                rifaId,
                ticketHolderID: data.ticketHolderID,
                ticketHolderEmail: data.ticketHolderEmail,
                ticketHolderName: data.ticketHolderName,
                ticketHolderPhone: data.ticketHolderPhone,
            },
        });
    });
    return await createTicket;
};
// Obtener todos los tickets de una rifa por ID de rifa
export const getTicketsByRifaId = async (rifaId) => {
    return await prisma.ticket.findMany({
        where: { rifaId },
    });
};
// Servicio para definir tickets como vendidos
export const markTicketAsSold = async (ticketId) => {
    return await prisma.ticket.update({
        where: { id: ticketId },
        data: { isSold: true },
    });
};
//# sourceMappingURL=rifas.service.js.map