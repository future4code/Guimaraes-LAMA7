import { BaseDatabase } from "./BaseDatabase";
import { CustomError } from "../../error/customError";
import { band, Bands } from "../../model/Bands";

export class BandDatabase extends BaseDatabase {

    private static TABLE_NAME = "LAMA_bands";

    public registerBand = async (band: band): Promise<void>=> {
        try {
        await BandDatabase.connection
        .insert({
            id: band.id,
            name: band.name,
            genre: band.genre,
            responsible: band.responsible
        })
        .into(BandDatabase.TABLE_NAME);      
        } catch (error: any) {
        throw new CustomError(400,error.sqlMessage);
        };
    };;

    public getAllBands = async():Promise<any>=>{
        try {
            const result = await BandDatabase.connection(BandDatabase.TABLE_NAME).select("*").orderBy("name")
            return result

        } catch (error: any) {
            throw new CustomError(400,error.sqlMessage);
        };
    };;

    public findBandByName = async (name: string) => {
        try {
          const result = await BandDatabase.connection(BandDatabase.TABLE_NAME)
          .select()
          .where({name});
              
          return result[0];
        } catch (error: any) {
          throw new CustomError(400,error.sqlMessage);
        };
      };;
    
      public findBandById = async (id: string) => {
        try {
          const result = await BandDatabase.connection(BandDatabase.TABLE_NAME)
          .select()
          .where({id});    
          return result[0];
        } catch (error: any) {
          throw new CustomError(400,error.sqlMessage);
        };
      };;
};;;