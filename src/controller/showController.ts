import { Request, Response } from "express";
import { ShowBusiness } from "../business/showBusiness";
import { Show } from "../model/show";
import idGenerator from "../services/idGenerator";
import { BandBusiness } from "../business/bandBusiness";


export class ShowController {

    private showBusiness: ShowBusiness;
    constructor() {
        this.showBusiness = new ShowBusiness();
    }

    public createShow = async (req: Request, res: Response): Promise<void> => {
        try {
            let { week_day, start_time, end_time, band_id } = req.body;
            const show: Show = {
                id: idGenerator.generatedID(), 
                week_day, start_time, end_time,
                band_id };
            const result = await this.showBusiness.createShow(show);
            res.status(201).send(result);
        } catch (error: any) {
            res.status(400).send(error.message);
        }
    };;

    public getShowsByDay = async (req: Request, res: Response): Promise<void> => {
        try {
            let week_day = req.params.week_day;
            const result = await this.showBusiness.getShowsByDay(week_day);
            res.status(201).send(result);
        } catch (error: any) {
            res.status(400).send(error.message);
        }
    }
};;
