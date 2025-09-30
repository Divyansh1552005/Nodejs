import express, { Request, Response, NextFunction } from 'express';

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Basic route
app.get('/', (req: Request, res: Response) => {
    res.json({
        message: 'Hello World! Server is running with TypeScript!',
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || 'development'
    });
});

// Health check endpoint
app.get('/health', (req: Request, res: Response) => {
    res.status(200).json({
        status: 'OK',
        uptime: process.uptime(),
        timestamp: new Date().toISOString()
    });
});

// API routes
app.get('/api/users', (req: Request, res: Response) => {
    res.json({
        users: [
            { id: 1, name: 'John Doe', email: 'john@example.com' },
            { id: 2, name: 'Jane Smith', email: 'jane@example.com' }
        ]
    });
});

app.post('/api/users', (req: Request, res: Response): void => {
    const { name, email } = req.body;
    
    if (!name || !email) {
        res.status(400).json({
            error: 'Name and email are required'
        });
        return;
    }
    
    const newUser = {
        id: Date.now(),
        name,
        email
    };
    
    res.status(201).json({
        message: 'User created successfully',
        user: newUser
    });
});

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error('Error:', err.stack);
    res.status(500).json({
        error: 'Something went wrong!',
        message: err.message
    });
});

// 404 handler
app.use((req: Request, res: Response) => {
    res.status(404).json({
        error: 'Route not found',
        path: req.originalUrl
    });
});

export default app;