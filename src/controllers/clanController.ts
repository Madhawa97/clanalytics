import { Request, Response } from 'express';
import { filterInactivePlayers } from '../services/clanService';

export const getInactivePlayersController = async (req: Request, res: Response) => {
    const clanId = req.query.clanId as string;
    try {
        if (clanId) {
            const inactivePlayers = await filterInactivePlayers(clanId);
            res.status(200).send(inactivePlayers);
        } else {
            res.status(404).send({ message: 'ClanId not found' });
        }
    } catch (error) {
        console.error('Error in getInactivePlayersController:', error);
        res.status(500).send({ message: 'Internal Server Error' });
    }
}
