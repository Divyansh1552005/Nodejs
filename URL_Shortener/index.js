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
  res.json({
    message: 'URL Shortener API is running!',
    version: '1.0.0',
    status: 'healthy'
  });
});

app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Something went wrong!',
    message: process.env.NODE_ENV === 'production' ? 'Internal Server Error' : err.message
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Route not found',
    path: req.originalUrl
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


