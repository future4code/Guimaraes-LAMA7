



import { BaseDatabase } from "./BaseDatabase";
import { CustomError } from "../../error/customError";

export class UserDatabase extends BaseDatabase {

    private static TABLE_NAME = "LAMA_users";

    public signup = async (user: any): Promise<void>=> {
        try {
        await UserDatabase.connection
        .insert({
            id: user.id,
            name: user.name,
            email: user.email,
            password: user.password,
            role:user.role
        })
        .into(UserDatabase.TABLE_NAME);      
        } catch (error: any) {
        throw new CustomError(400,error.sqlMessage);
        }
    }

    public getAllUsers = async():Promise<any>=>{
        try {
            const result = await UserDatabase.connection(UserDatabase.TABLE_NAME).select("*").orderBy("name")
            return result

        } catch (error: any) {
            throw new CustomError(400,error.sqlMessage);
        };
    };;

    public findUserByEmail = async (email: string) => {
        try {
          const result = await UserDatabase.connection(UserDatabase.TABLE_NAME)
          .select()
          .where({email});
    
          return result[0];
        } catch (error: any) {
          throw new CustomError(400,error.sqlMessage);
        };
      };;
    
      public findUserById = async (id: string) => {
        try {
          const result = await UserDatabase.connection(UserDatabase.TABLE_NAME)
          .select()
          .where({id});    
          return result[0];
        } catch (error: any) {
          throw new CustomError(400,error.sqlMessage);
        };
      };;
  

  


};;;
