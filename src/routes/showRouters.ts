import express from 'express';
import { ShowController } from '../controller/showController';

export const showRouter = express.Router();

const showController = new ShowController();

showRouter.post("/create", showController.createShow);
showRouter.get("/allShowsday", showController.getShowsByDay);




