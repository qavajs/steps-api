import fs from 'fs/promises';

export default class Memory {
    json = async (path: string): Promise<any> => {
        const file = await fs.readFile(path, 'utf-8');
        return JSON.parse(file);
    }
}
