import { BaseDatabase } from "./BaseDatabase";
import { CustomError } from "../../error/customError";

export class ShowsDatabase extends BaseDatabase {

    private static TABLE_NAME = "LAMA_shows";

    public createShow = async (show: any): Promise<void>=> {
        try {
        await ShowsDatabase.connection
        .insert({
            id: show.id,
            week_day: show.week_day,
            start_time: show.start_time,
            end_time: show.end_time,
            band_id: show.band_id
        })
        .into(ShowsDatabase.TABLE_NAME);      
        } catch (error: any) {
        throw new CustomError(400,error.sqlMessage);
        };
    };;
        public addShow(show: any): Promise<void> {
            return ShowsDatabase.connection
            .insert({
                id: show.id,
                week_day: show.week_day,
                start_time: show.start_time,
                end_time: show.end_time,
                band_id: show.band_id
            })
            .into(ShowsDatabase.TABLE_NAME);
        }
        public getShowsByDay(week_day: string): Promise<any> {
            return ShowsDatabase.connection
            .select("*")
            .from(ShowsDatabase.TABLE_NAME)
            .where({ week_day });
    } 
}
