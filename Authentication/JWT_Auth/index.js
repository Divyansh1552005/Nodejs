import express from "express";
import userRouter from "./routes/user.routes.js";
import adminRouter from "./routes/admin.routes.js"
import {authenticationmiddleware} from "./middlewares/auth.middleware.js"


const app = express();
const PORT = process.env.PORT ?? 3000;
// agar koi port set nhi hai to 3000 pe chlega

// MIDDLEWARES
app.use(express.json());

app.use(authenticationmiddleware);


// ROUTES
app.get("/", (req, res) => {
  return res.status(200).json({ status: "Shit's working fine" });
});

app.use("/user", userRouter);
app.use("/admin", adminRouter);

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
