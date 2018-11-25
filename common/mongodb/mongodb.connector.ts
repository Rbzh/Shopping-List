import { Db, MongoClient } from 'mongodb';
import { MongoError } from 'mongodb';

const url: string = 'mongodb://localhost:27017/nodets';

export class MongoDBConnector {

    private static db: Db;

    public static getConnection(callback: (connection) => void) {
        if (this.db) {
            return callback(this.db);
        } else {
            this.connect((error: MongoError, db: Db) => {
                if (error) {
                    console.error('Un erreur est survenue lors de la connection à la base mongo ', error);
                }
                this.db = db;
                return callback(this.db);
            });
        }
    }

    private static connect(callback: (error, db: Db) => void) {
        MongoClient.connect(url, (error: MongoError, db: Db) => {
            return callback(error, db);
        });
    }
}