import { Request, Response } from "express";
import { BandBusiness } from "../business/bandBusiness"

export class BandController {

    private bandBusiness: BandBusiness
    constructor(){
    this.bandBusiness = new BandBusiness();
    };;

    public registerBand = async (req: Request, res: Response):Promise<void>=>{
    try {
        const token = req.headers.authorization as string;
        let { name, genre, responsible} = req.body;      
        const band : any = {name,genre,responsible};
        const result = await this.bandBusiness.registerBand(band,token);      

        res.status(201).send({ message: "Banda Registrada"});
    } catch (error:any) {
      res.status(400).send(error.message);
    }
  };;

  public getBandById = async (req: Request, res: Response):Promise<void>=>{
    try {
        let {id} = req.params;      
        const result = await this.bandBusiness.getbandById(id);      

        res.status(201).send(result);
    } catch (error:any) {
      res.status(400).send(error.message);
    }
  };;

  public getBandByName = async (req: Request, res: Response):Promise<void>=>{
    try {
        let {name} = req.params;      
        const result = await this.bandBusiness.getbandByName(name);      

        res.status(201).send(result);
    } catch (error:any) {
      res.status(400).send(error.message);
    }
  };;



  public getAllBands= async (req: Request, res: Response)=>{
    try {
      
      const token = req.headers.authorization as string;
      const bands = await this.bandBusiness.getAllBands(token);

      res.status(201).send(bands);
    } catch (error:any) {
      res.status(400).send(error.message);
    };
  };;


};;;