import chalk from 'chalk';
import { LogLevel, LogContext, LoggerOptions } from './types';

export class LoggerService {
  private module: string;
  private level: LogLevel;
  private enableColors: boolean;
  private enableTimestamp: boolean;
  private enableContext: boolean;

  constructor(options: LoggerOptions = {}) {
    this.module = options.module || 'App';
    this.level = options.level || LogLevel.INFO;
    this.enableColors = options.enableColors !== false;
    this.enableTimestamp = options.enableTimestamp !== false;
    this.enableContext = options.enableContext !== false;
  }

  private shouldLog(messageLevel: LogLevel): boolean {
    const levels = [LogLevel.ERROR, LogLevel.WARN, LogLevel.INFO, LogLevel.DEBUG];
    const currentLevelIndex = levels.indexOf(this.level);
    const messageLevelIndex = levels.indexOf(messageLevel);
    return messageLevelIndex <= currentLevelIndex;
  }

  private formatTimestamp(): string {
    if (!this.enableTimestamp) return '';
    const now = new Date();
    return chalk.gray(`[${now.toISOString()}] `);
  }

  private formatLevel(level: LogLevel): string {
    if (!this.enableColors) {
      return `[${level.toUpperCase()}]`;
    }

    switch (level) {
      case LogLevel.ERROR:
        return chalk.red.bold(`[${level.toUpperCase()}]`);
      case LogLevel.WARN:
        return chalk.yellow.bold(`[${level.toUpperCase()}]`);
      case LogLevel.INFO:
        return chalk.blue.bold(`[${level.toUpperCase()}]`);
      case LogLevel.DEBUG:
        return chalk.gray.bold(`[${level.toUpperCase()}]`);
      default:
        return `[${level.toUpperCase()}]`;
    }
  }

  private formatModule(): string {
    if (!this.enableColors) {
      return `[${this.module}]`;
    }
    return chalk.cyan.bold(`[${this.module}]`);
  }

  private formatContext(context?: LogContext): string {
    if (!this.enableContext || !context) return '';

    const contextParts: string[] = [];
    
    if (context.method) {
      contextParts.push(`method:${context.method}`);
    }
    if (context.userId) {
      contextParts.push(`user:${context.userId}`);
    }
    if (context.requestId) {
      contextParts.push(`req:${context.requestId}`);
    }

    // Add custom context properties
    Object.entries(context).forEach(([key, value]) => {
      if (!['module', 'method', 'userId', 'requestId'].includes(key)) {
        contextParts.push(`${key}:${value}`);
      }
    });

    if (contextParts.length === 0) return '';

    const contextStr = contextParts.join(' ');
    return this.enableColors 
      ? chalk.magenta(` {${contextStr}}`)
      : ` {${contextStr}}`;
  }

  private log(level: LogLevel, message: string, context?: LogContext): void {
    if (!this.shouldLog(level)) return;

    const timestamp = this.formatTimestamp();
    const levelStr = this.formatLevel(level);
    const moduleStr = this.formatModule();
    const contextStr = this.formatContext(context);
    
    const formattedMessage = this.enableColors 
      ? chalk.white(message)
      : message;

    const logLine = `${timestamp}${levelStr} ${moduleStr}${contextStr} ${formattedMessage}`;
    
    switch (level) {
      case LogLevel.ERROR:
        console.error(logLine);
        break;
      case LogLevel.WARN:
        console.warn(logLine);
        break;
      default:
        console.log(logLine);
    }
  }

  info(message: string, context?: LogContext): void {
    this.log(LogLevel.INFO, message, context);
  }

  debug(message: string, context?: LogContext): void {
    this.log(LogLevel.DEBUG, message, context);
  }

  warn(message: string, context?: LogContext): void {
    this.log(LogLevel.WARN, message, context);
  }

  error(message: string, context?: LogContext): void {
    this.log(LogLevel.ERROR, message, context);
  }

  // Convenience methods for common logging patterns
  logRequest(method: string, url: string, statusCode?: number, duration?: number, context?: LogContext): void {
    const parts = [`${method} ${url}`];
    if (statusCode) parts.push(`→ ${statusCode}`);
    if (duration) parts.push(`(${duration}ms)`);
    
    const level = statusCode && statusCode >= 400 ? LogLevel.ERROR : LogLevel.INFO;
    this.log(level, parts.join(' '), { ...context, method });
  }

  logDatabase(query: string, duration?: number, context?: LogContext): void {
    const parts = [`DB: ${query}`];
    if (duration) parts.push(`(${duration}ms)`);
    this.debug(parts.join(' '), { ...context, method: 'database' });
  }

  // Create a child logger with additional context
  child(additionalContext: Partial<LogContext>): LoggerService {
    const childLogger = new LoggerService({
      level: this.level,
      module: this.module,
      enableColors: this.enableColors,
      enableTimestamp: this.enableTimestamp,
      enableContext: this.enableContext,
    });

    // Override the log method to include additional context
    const originalLog = childLogger.log.bind(childLogger);
    childLogger.log = (level: LogLevel, message: string, context?: LogContext) => {
      const mergedContext = { ...additionalContext, ...context };
      originalLog(level, message, mergedContext);
    };

    return childLogger;
  }
} 