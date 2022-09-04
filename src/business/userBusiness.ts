import { UserDatabase } from "../data/dataBases/userDatabase";
import  IdGenerator  from "../services/idGenerator";
import hashManager from "../services/hashManager";
import authenticator from "../services/authenticator";
import { AuthenticationData } from "../model/AuthenticationData";
import { CustomError } from "../error/customError";
export class UserBusiness {
    private userDB:UserDatabase
    constructor(){
      this.userDB = new UserDatabase()
    }
    
    public createUser = async (input: any) => {
      try {
        let {name, email, password, role} = input;
        const id = IdGenerator.generatedID();
        const hash = await hashManager.generateHash(password);
        let user :any={id,email,password:hash,name,role};
        
        if(role !== "normal" && role !== "admin"){role = "normal"};
        if(name === ""){throw new CustomError(422,"string empty")};
        if(email === ""){throw new CustomError(422,"string empty")};
        if(password === ""){throw new CustomError(422,"string empty")};                
        if(!name){throw new CustomError(422,"empty name")};
        if(!password){throw new CustomError(422,"empty pw")};
        if(!email.includes("@")){throw new CustomError(422,"email needs @")};
        if(!email){throw new CustomError(422,"empty email")};

        await this.userDB.signup(user);
        const token = authenticator.generateToken({id,role});

        return token; 
      }catch (error:any) {
        throw new CustomError(400,error.message);
      };;    
    };;


    public login = async (input:any) =>{
        try {
          let {email, password} = input;
          const user = await this.userDB.findUserByEmail(email);
          const hashCompare = await hashManager.compareHash(password,user.password);        
          const payload :AuthenticationData={id: user.id,role: user.role};    
          const token = authenticator.generateToken(payload);
  
          if(!email) {throw new CustomError(422,"empty email")};
          if(!password) {throw new CustomError(422,"empty pw")};    
          if(!user) {throw new CustomError(422,"empty user")};
          if(!hashCompare){throw new CustomError(403,"pw does not match")};    
  
          return token;
        }catch (error:any) {
          throw new CustomError(400,error.message)
        };;      
      };;

    public getAllUsers = async ():Promise<any>=>{
        const result = await this.userDB.getAllUsers();
        return result
    }
    
    
};;;
  