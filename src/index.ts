import app from "./app";
import { userRouter } from "./routes/userRouter";
import { showRouter } from "./routes/showRouters";
import { bandRouter } from "./routes/bandRouter";


/* ____________________________________ENDPOINTS____________________________________ */


// CONSULTAR USUÁRIOS
app.use("/users", userRouter)
app.use("/shows", showRouter)
app.use("/bands", bandRouter)




