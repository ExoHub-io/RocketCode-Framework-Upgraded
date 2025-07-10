export enum LogLevel {
  INFO = 'info',
  DEBUG = 'debug',
  WARN = 'warn',
  ERROR = 'error',
}

export interface LogContext {
  module?: string;
  method?: string;
  userId?: string;
  requestId?: string;
  [key: string]: any;
}

export interface LoggerOptions {
  level?: LogLevel;
  module?: string;
  enableColors?: boolean;
  enableTimestamp?: boolean;
  enableContext?: boolean;
} 