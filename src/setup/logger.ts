import pino from 'pino';
import path from 'path';
import fs from 'fs';

// 1. Убедимся, что папка logs существует; если нет — создаём.
const logsDir = path.resolve(__dirname, '..', 'logs');
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir);
}

// 2. Определяем потоки: consoleStream (stdout) и fileStream (файл app.log)
const consoleStream = process.stdout;
const fileStream = pino.destination(path.join(logsDir, 'app.log'));

// 3. Экспортируем logger, который пишет и в консоль (через pino-pretty) и в файл
export const logger = pino(
  {
    level: 'info',
    transport: {
      target: 'pino-pretty',
      options: {
        colorize: true,
        levelFirst: true,
        translateTime: 'SYS:standard',
      },
    },
  },
  pino.multistream([
    { stream: consoleStream, level: 'info' },
    { stream: fileStream, level: 'info' },
  ])
);