import express from 'express';
import userRouter from "./routes/user.routes.js"
import { authenticationMiddleware } from './middlewares/auth.middleware.js';
import urlRouter from "./routes/url.routes.js";


const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(authenticationMiddleware);

app.use("/user", userRouter);
app.use(urlRouter);

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


