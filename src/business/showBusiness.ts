import { invalid } from "moment";
import { ShowsDatabase } from "../data/dataBases/showsDatabase";
import { CustomError } from "../error/customError";
import  IdGenerator  from "../services/idGenerator";
import { Show } from "../model/show";

export class ShowBusiness {
    private showDB:ShowsDatabase
    constructor(){
      this.showDB = new ShowsDatabase()
    }
    
    public createShow = async (input: Show) => {
      try {
        let {week_day, start_time, end_time, band_id} = input;
        const id = IdGenerator.generatedID();
        let show :Show={id,week_day,start_time,end_time,band_id};
        
        //if(week_day === "Monday" || "Tuesday" || "Wednesday" || "Thursday"){throw new CustomError(422,"days are not valid")};                
        if(!week_day){throw new CustomError(422,"empty week_day")};
        if(!start_time){throw new CustomError(422,"empty start_time")};
        if(!end_time){throw new CustomError(422,"empty end_time")};

        await this.showDB.addShow(show);
        return show; 
      }catch (error:any) {
        throw new CustomError(400,error.message);
      };;    
    };;

    public getShowsByDay = async (week_day:string):Promise<any>=>{
        const result = await this.showDB.getShowsByDay(week_day);
        return result
    };;
}