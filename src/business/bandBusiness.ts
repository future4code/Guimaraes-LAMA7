import { UserDatabase } from "../data/dataBases/userDatabase";
import  IdGenerator  from "../services/idGenerator";
import authenticator from "../services/authenticator";
import { AuthenticationData } from "../model/AuthenticationData";
import { CustomError } from "../error/customError";
import { BandDatabase } from "../data/dataBases/bandDatase";
import { band, bandInputDTO } from "../model/Bands";

export class BandBusiness {
    private bandDB:BandDatabase
    constructor(){
      this.bandDB = new BandDatabase()
    }
    
    public registerBand = async (input: bandInputDTO,token:string) => {
      try {
        const tokenData = authenticator.getTokenData(token);    
        let {name, genre, responsible} = input;
        const id = IdGenerator.generatedID();
      
        let band :band={id,name,genre,responsible};

        if (tokenData.role !== "admin"){throw new CustomError(403,"Forbbiden")};        
        if(name === ""){throw new CustomError(422,"string empty")};
        if(genre === ""){throw new CustomError(422,"string empty")};
        if(responsible === ""){throw new CustomError(422,"string empty")};                
        if(!name){throw new CustomError(422,"empty name")};
        if(!genre){throw new CustomError(422,"empty pw")};
        if(!responsible){throw new CustomError(422,"empty email")};

        const result = await this.bandDB.registerBand(band);
        return result; 
      }catch (error:any) {
        throw new CustomError(400,error.message);
      }; 
    };;


    public getAllBands = async (token:string):Promise<any>=>{
        try {
            const tokenData = authenticator.getTokenData(token);
    
            const result = await this.bandDB.getAllBands();
            return result            
        }catch (error:any) {
            throw new CustomError(400,error.message);
        };
    };;
    
    public getbandById = async (id:string):Promise<any>=>{
      try {
        if(!id){
          throw new CustomError(422,"Missing Params: ID")
        }
          const result = await this.bandDB.findBandById(id);
          return result            
      }catch (error:any) {
          throw new CustomError(400,error.message);
      };
  };;

    public getbandByName = async (name:string):Promise<any>=>{
      try {
        if(!name){
          throw new CustomError(422,"Missing Params: Name")
        }
          const result = await this.bandDB.findBandByName(name);
          return result            
      }catch (error:any) {
          throw new CustomError(400,error.message);
      };
  };;
    
};;;
  