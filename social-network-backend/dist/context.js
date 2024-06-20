"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.context = void 0;
const client_1 = require("@prisma/client");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const prisma = new client_1.PrismaClient();
const context = async ({ req }) => {
    const authHeader = req.headers.authorization || '';
    const token = authHeader.replace('Bearer ', '');
    let userId;
    if (token) {
        try {
            const decoded = jsonwebtoken_1.default.verify(token, 'APP_SECRET');
            userId = decoded.userId;
        }
        catch (e) {
            console.error('Invalid token');
        }
    }
    return { prisma, userId };
};
exports.context = context;
