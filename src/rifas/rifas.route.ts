// src/rifas/rifas.route.ts
//importaciones
import {
    Router
} from "express";
// Make sure rifas.service.ts exists in the same folder, or update the path below if needed
import {
    createRifa,
    createTicketsForRifa,
    deleteRifaAndTickets,
    deleteTicket,
    getAllRifas,
    getRifaById,
    getTicketsByRifaId,
    markTicketAsSold,
    updateRifa,
    updateTicket
} from "./rifas.service.js";
import type { CreateRifaDto } from "./interfaces/create-rifa.interface.js";
import type { UpdateRifaDto } from "./interfaces/update-rifa.interface.js";
import type { CreateTicketDto } from "./interfaces/create-tickets.interface.js";

// instancia del router
const rifasRouter = Router();

// Ruta para obtener todas las rifas
rifasRouter.get('/', async (req, res) => {
    const rifas = await getAllRifas();
    res.json(rifas);
});

// Crear una nueva rifa
rifasRouter.post('/', async (req, res) => {
    const rifaData: CreateRifaDto = req.body;
    try {
        const nuevaRifa = await createRifa(rifaData);
        res.status(201).json(nuevaRifa);
    } catch (error) {
        res.status(400).json({
            error: 'Error al crear la rifa'
        });
    }
});
// Actualizar una rifa
rifasRouter.patch('/:id', async (req, res) => {
    const rifaId: string = req.params.id;
    const rifaData: UpdateRifaDto = req.body;
    try {
        const updatedRifa = await updateRifa(rifaId, rifaData);
        res.json(updatedRifa);
    } catch (error) {
        res.status(400).json({
            error: 'Error al actualizar la rifa'
        });
    }
});
// Obtener una rifa por ID 
rifasRouter.get('/:id', async (req, res) => {
    const rifaId: string = req.params.id;
    try {
        const rifa = await getRifaById(rifaId);
        if (rifa) {
            res.json(rifa);
        } else {
            res.status(404).json({
                error: 'Rifa no encontrada'
            });
        }
    } catch (error) {
        res.status(400).json({
            error: 'Error al obtener la rifa'
        });
    }
});
// Crear tickets para una rifa
rifasRouter.post('/:id/tickets', async (req, res) => {
    const rifaId: string = req.params.id;
    const ticketData: CreateTicketDto = req.body;
    try {
        const newTicket = await createTicketsForRifa(rifaId, ticketData);
        res.status(201).json(newTicket);
    } catch (error) {
        res.status(400).json({
            error
        });
    }
});
// Obtener todos los tickets de una rifa
rifasRouter.get('/:id/tickets', async (req, res) => {
    const rifaId: string = req.params.id;
    try {
        const tickets = await getTicketsByRifaId(rifaId);
        res.json(tickets);
    } catch (error) {
        res.status(400).json({
            error: 'Error al obtener los tickets de la rifa'
        });
    }
});
// definir tickets como vendidos
rifasRouter.patch('/tickets/:ticketId/sell', async (req, res) => {
    const {
        ticketId
    }: { ticketId: string } = req.params;
    try {
        const soldTicket = await markTicketAsSold(ticketId);
        res.json(soldTicket);
    } catch (error) {
        res.status(400).json({
            error
        });
    }
});

// Ruta para editar un ticket (por ejemplo, cambiar el estado a vendido)
rifasRouter.patch('/tickets/:ticketId', async (req, res) => {
    const ticketId: string = req.params.ticketId;
    const ticketData: Partial<CreateTicketDto> = req.body;
    try {
        const updatedTicket = await updateTicket(ticketId, ticketData);
        res.json(updatedTicket);
    } catch (error) {
        res.status(400).json({
            error: 'Error al actualizar el ticket'
        });
    }
});

// Ruta para eliminar una rifa y sus tickets asociados
rifasRouter.delete('/:id/delete', async (req, res) => {
    const rifaId: string = req.params.id;
    try {
        await deleteRifaAndTickets(rifaId);
        res.status(204).send();
    } catch (error) {
        res.status(400).json({
            error: 'Error al eliminar la rifa y sus tickets'
        });
    }
});

// Ruta para eliminar un ticket
rifasRouter.delete('/tickets/:ticketId', async (req, res) => {
    const ticketId: string = req.params.ticketId;
    try {
        await deleteTicket(ticketId);
        res.status(204).send();
    } catch (error) {
        res.status(400).json({
            error: 'Error al eliminar el ticket'
        });
    }
});

// exportar el router
export default rifasRouter;
