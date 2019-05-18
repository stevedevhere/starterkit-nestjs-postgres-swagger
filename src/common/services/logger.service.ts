import { LoggerService } from '@nestjs/common';
import * as chalk from 'chalk';
import * as config from 'config';
import * as winston from 'winston';
import { Logger } from 'winston';

export class WinstonLogger implements LoggerService {
  private readonly logger: Logger;

  constructor(private context: string) {
    const transports = [];
    const winstonTransports = config.logger.winston.transports;

    winstonTransports.map(transport => {
      if (transport.enabled && transport.name === 'console') {
        transports.push(new winston.transports.Console());
      }

      if (transport.enabled && transport.name === 'file') {
        transports.push(new winston.transports.File({
          filename: ('dev.log'),
        }));
      }
    });

    this.logger = (winston as any).createLogger({ transports });
  }

  log(message: string): void {
    const currentDate = new Date();

    this.logger.info(message, {
      timestamp: currentDate.toISOString(),
      context: this.context,
    });

    this.coloredConsoleLog('info', message);
  }

  error(message: string, trace?: any): void {
    const currentDate = new Date();

    this.logger.error(`${message} -> (${trace || 'trace not provided !'})`, {
      timestamp: currentDate.toISOString(),
      context: this.context,
    });

    this.coloredConsoleLog('error', message, trace);
  }

  warn(message: string): void {
    const currentDate = new Date();

    this.logger.warn(message, {
      timestamp: currentDate.toISOString(),
      context: this.context,
    });

    this.coloredConsoleLog('warn', message);
  }

  private coloredConsoleLog(level: string, message: string, error?): void {
    if (config.logger.winston.colorConsoleLogEnable) {
      let result = '';
      const color = chalk.default;
      const currentDate = new Date();
      const format = (value) => (value < 10) ? `0${value}` : value;
      const time = `${format(currentDate.getHours())}:${format(currentDate.getMinutes())}:${format(currentDate.getSeconds())}`;

      switch (level) {
        case 'info':
          result = `${color.dim.green.bold.underline(time)} [${color.cyan('INFO')}] [${color.green(this.context)}] ${message}`;
          break;
        case 'error':
          result = `${color.dim.green.bold.underline(time)} [${color.red('ERR')}] [${color.green(this.context)}] ${message}`;
          break;
        case 'warn':
          result = `${color.dim.green.bold.underline(time)} [${color.yellow('WARN')}] [${color.green(this.context)}] ${message}`;
          break;
        default:
          break;
      }

      // tslint:disable-next-line no-console
      console.log(result);
    }
  }
}
