import { injectable } from 'inversify';
import { MongoDBConnector } from './mongodb.connector';
import { Db } from 'mongodb';

@injectable()
export class MongoDBManager {

    public db: Db;

    constructor() {
        MongoDBConnector.getConnection((connection) => {
            this.db = connection;
        });
    }
}
