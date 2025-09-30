"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.get('/', (req, res) => {
    res.json({
        message: 'Hello World! Server is running with TypeScript!',
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || 'development'
    });
});
app.get('/health', (req, res) => {
    res.status(200).json({
        status: 'OK',
        uptime: process.uptime(),
        timestamp: new Date().toISOString()
    });
});
app.get('/api/users', (req, res) => {
    res.json({
        users: [
            { id: 1, name: 'John Doe', email: 'john@example.com' },
            { id: 2, name: 'Jane Smith', email: 'jane@example.com' }
        ]
    });
});
app.post('/api/users', (req, res) => {
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
app.use((err, req, res, next) => {
    console.error('Error:', err.stack);
    res.status(500).json({
        error: 'Something went wrong!',
        message: err.message
    });
});
app.use((req, res) => {
    res.status(404).json({
        error: 'Route not found',
        path: req.originalUrl
    });
});
exports.default = app;
//# sourceMappingURL=server.js.map