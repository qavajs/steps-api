import * as fs from 'fs/promises';

export default class Memory {
  array = (...values: any[]): any[] => values;
  json = async (path: string): Promise<any> => {
    const file = await fs.readFile(path, 'utf-8');
    return JSON.parse(file);
  };
  textFile = async (path: string): Promise<any> => fs.readFile(path, 'utf-8');
  contentType = (type: string): { 'Content-Type': string } => ({ 'Content-Type': type });
  grpcCall = (client: any, fn: string, ...args: any[]) => {
    return new Promise((resolve, reject) => {
      client[fn](...args, (err: any, response: any) => {
        if (err) {
          reject(err);
        }
        resolve(response);
      });
    })
  }
}
