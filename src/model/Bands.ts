export class Bands {
    constructor(
      private id: string,
      private name: string,
      private genre: string,
      private responsible: string,
 
    ) {}

    public getId() {
        return this.id
      }
    
    public getName() {
        return this.name
      }

    public getGenre() {
        return this.genre
      }
    
    public getResponsible() {
        return this.responsible
      }  

}

export interface bandInputDTO {
    name: string,
    genre: string,
    responsible: string
  }
  
  export type band  = {
    id: string,
    name: string,
    genre: string,
    responsible: string
  }
  
  export interface IbandSearchInputDTO {
    id: string,
    name: string
  }