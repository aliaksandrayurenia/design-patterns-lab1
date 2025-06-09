"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
const pino_1 = __importDefault(require("pino"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
// 1. Убедимся, что папка logs существует; если нет — создаём.
const logsDir = path_1.default.resolve(__dirname, '..', 'logs');
if (!fs_1.default.existsSync(logsDir)) {
    fs_1.default.mkdirSync(logsDir);
}
// 2. Определяем потоки: consoleStream (stdout) и fileStream (файл app.log)
const consoleStream = process.stdout;
const fileStream = pino_1.default.destination(path_1.default.join(logsDir, 'app.log'));
// 3. Экспортируем logger, который пишет и в консоль (через pino-pretty) и в файл
exports.logger = (0, pino_1.default)({
    level: 'info',
    transport: {
        target: 'pino-pretty',
        options: {
            colorize: true,
            levelFirst: true,
            translateTime: 'SYS:standard',
        },
    },
}, pino_1.default.multistream([
    { stream: consoleStream, level: 'info' },
    { stream: fileStream, level: 'info' },
]));
