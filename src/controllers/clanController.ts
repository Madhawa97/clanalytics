import { Request, Response } from 'express';
import { filterInactivePlayers } from '../services/clanService';

export const getInactivePlayersController = async (req: Request, res: Response) => {
    const clanId = req.query.clanId as string;
    if (clanId) {
        const inactivePlayers = await filterInactivePlayers(clanId);
        res.status(200).send(inactivePlayers);
    } else {
        res.status(404).send({ message: 'ClanId not found' });
    }
}
