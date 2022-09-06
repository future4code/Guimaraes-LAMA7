import express from 'express'
import { BandController } from '../controller/bandController'

export const bandRouter = express.Router()

const bandController = new BandController()

bandRouter.post("/registerBand", bandController.registerBand )
bandRouter.get("/allBands", bandController.getAllBands)
bandRouter.get("/name/:name", bandController.getBandByName )
bandRouter.get("/id/:id", bandController.getBandById )



