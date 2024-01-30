import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';

const db = new Low(new JSONFile('db.json'), {})
await db.read();


console.log('r = ', db.data)

db.data.blods.push({
    id: 2, title: 'blogs 2'
})
await db.write()

console.log('2 r = ', db.data)

/**
import { readFileSync, writeFileSync } from 'fs';
import path from 'path';

class File {
    private file: any;
    private pathname: string;

    constructor(pathname: string) {
        this.pathname = path.format({ dir: __dirname, base: pathname });
    }

    async write() {
        try {
            writeFileSync(this.pathname, JSON.stringify(this.file), 'utf-8');
        } catch (error) {
            throw new Error(`Cannot save db file by path=${this.pathname}`);
        }
    }

    async read() {
        try {
            const data = readFileSync(this.pathname, 'utf-8');
            this.file = JSON.parse(data);
            return this.file;
        } catch (error) {
            throw new Error(`Cannot open db file by path=${this.pathname}`);
        }
    }
}

 */