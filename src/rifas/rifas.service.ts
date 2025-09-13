// src/rifas/rifas.service.ts
import prisma from "../config/prisma.js";
import type { CreateRifaDto } from "./interfaces/create-rifa.interface.js";
import type { CreateTicketDto } from "./interfaces/create-tickets.interface.js";
import type { UpdateRifaDto } from "./interfaces/update-rifa.interface.js";
// Servicio para obtener todas las rifas
export const getAllRifas = async () => {
    return await prisma.rifa.findMany();
};
// Servicio para crear una nueva rifa
export const createRifa = async (data: CreateRifaDto) => {
    return await prisma.rifa.create({
        data,
    });
};
// Servicio para obtener una rifa por ID
export const getRifaById = async (id: string) => {
    return await prisma.rifa.findUnique({
        where: {
            id
        },
    });
};

// Servicio para actualizar una rifa
export const updateRifa = async (id: string, data: UpdateRifaDto) => {
    return await prisma.rifa.update({
        where: {
            id
        },
        data,
    });
};
// Servicio para eliminar una rifa
export const deleteRifa = async (id: string) => {
    return await prisma.rifa.delete({
        where: {
            id
        },
    });
};

// Crear ticket para la rifa y relacionar con la rifa
export const createTicketsForRifa = async (rifaId: string, data: CreateTicketDto) => {
    // $transation de prisma para crear los tickets en lote
    const createTicket = prisma.$transaction(async (tx) => {
        // Verificar si ya se creo el ticket
        const existingTicket = await tx.ticket.findUnique({
            where: {
                number: data.number
            },
        });
        if (existingTicket) {
            throw new Error(`El ticket con el número ${data.number} ya existe.`);
        }
        // Crea un nuevo ticket
        return await tx.ticket.create({
            data: {
                ...data,
                rifaId
            },
        });
    });
    return await createTicket;
};

// Obtener todos los tickets de una rifa por ID de rifa
export const getTicketsByRifaId = async (rifaId: string) => {
    return await prisma.ticket.findMany({
        where: {
            rifaId
        },
    });
};

// Servicio para definir tickets como vendidos
export const markTicketAsSold = async (ticketId: string) => {
    return await prisma.ticket.update({
        where: {
            id: ticketId
        },
        data: {
            isSold: true
        },
    });
};

// Ruta para editar un ticket (por si se quiere cambiar el titular del ticket)
export const updateTicket = async (ticketId: string, data: Partial<CreateTicketDto>) => {
    return await prisma.ticket.update({
        where: {
            id: ticketId
        },
        data,
    });
};  
// ruta para eliminar una rifa y sus tickets asociados
export const deleteRifaAndTickets = async (rifaId: string) => {
    return await prisma.$transaction(async (tx) => {
        // Eliminar los tickets asociados a la rifa
        await tx.ticket.deleteMany({
            where: {
                rifaId
            },
        });
        // Eliminar la rifa
        return await tx.rifa.delete({
            where: {
                id: rifaId
            },
        });
    });
};

// Servicio para eliminar un ticket
export const deleteTicket = async (ticketId: string) => {
    return await prisma.ticket.delete({
        where: {
            id: ticketId
        },
    });
};
