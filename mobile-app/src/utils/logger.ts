const isDevelopment = __DEV__;

type LogLevel = 'info' | 'warn' | 'error' | 'debug';

const sanitizeSensitiveData = (data: any): any => {
  if (typeof data === 'string') {
    return data.replace(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/gi, '***@***.***');
  }
  
  if (typeof data === 'object' && data !== null) {
    const sanitized: any = Array.isArray(data) ? [] : {};
    
    for (const key in data) {
      if (['password', 'token', 'access_token', 'refresh_token', 'apiKey', 'api_key'].includes(key)) {
        sanitized[key] = '***REDACTED***';
      } else {
        sanitized[key] = sanitizeSensitiveData(data[key]);
      }
    }
    
    return sanitized;
  }
  
  return data;
};

const log = (level: LogLevel, message: string, data?: any) => {
  if (!isDevelopment && level === 'debug') {
    return;
  }
  
  const timestamp = new Date().toISOString();
  const sanitizedData = data ? sanitizeSensitiveData(data) : undefined;
  
  const logMessage = `[${timestamp}] [${level.toUpperCase()}] ${message}`;
  
  switch (level) {
    case 'error':
      console.error(logMessage, sanitizedData);
      break;
    case 'warn':
      console.warn(logMessage, sanitizedData);
      break;
    case 'info':
      console.info(logMessage, sanitizedData);
      break;
    case 'debug':
      console.log(logMessage, sanitizedData);
      break;
  }
};

export const logger = {
  info: (message: string, data?: any) => log('info', message, data),
  warn: (message: string, data?: any) => log('warn', message, data),
  error: (message: string, data?: any) => log('error', message, data),
  debug: (message: string, data?: any) => log('debug', message, data),
};
