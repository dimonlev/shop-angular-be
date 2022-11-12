import { createLogger, format, transports } from 'winston';
const { combine, timestamp, prettyPrint, colorize, printf } = format;

const myFormat = printf(
  ({ level, message, timestamp, body, path, params, method }) => {
    return `${timestamp} ${level}:\nmessage: ${message}\n${body}\npath: ${path}\n${params}\nmethod: ${method}`;
  }
);

export const logger = createLogger({
  level: 'info',
  format: combine(colorize(), timestamp(), prettyPrint(), myFormat),
  transports: [new transports.Console()],
});
