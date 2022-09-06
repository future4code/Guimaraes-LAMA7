import app from "./app";
import { userRouter } from "./routes/userRouter";
import { bandRouter } from "./routes/bandRouter";


/* ____________________________________ENDPOINTS____________________________________ */


// CONSULTAR USUÁRIOS
app.use("/users", userRouter)
app.use("/bands", bandRouter)





