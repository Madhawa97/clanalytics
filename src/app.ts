import express from 'express';
import dotenv from 'dotenv';
import { getInactivePlayersController } from './controllers/clanController';

dotenv.config();

const app = express();

app.get('/getInactivePlayers', getInactivePlayersController);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));
