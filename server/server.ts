import { InversifyExpressServer } from 'inversify-express-utils';
import { Application } from 'express-serve-static-core';
import { Container } from 'inversify';
import * as bodyParser from 'body-parser';
import { HomeService } from './routes/home.service';
import { ShoppingListService } from "./routes/shopping-list/shopping-list.service";
import {MongoDBManager} from '../common/mongodb/mongodb.manager';
import { ReqLoggerMiddleware } from './req-logger-middleware';

import './routes/home.controller'; //chargement du controller home
import "./routes/shopping-list/shopping-list.controller";

export class Server {

    private _server: InversifyExpressServer;
    private _application: Application;

    constructor() {
        const container = this.initContainer();
        // create the server
        this._server = new InversifyExpressServer(container, null, { rootPath: "/api" });
        this.configure();
    }

    /** Bind all the necessary injectable items in the container */
    private initContainer(): Container {
        const container = new Container();
        container.bind('HomeService').to(HomeService).inSingletonScope();
        container.bind('ShoppingListService').to(ShoppingListService).inSingletonScope();
        container.bind('MongoDBManager').to(MongoDBManager).inSingletonScope();

        container.bind('LoggerRequest').toConstantValue(ReqLoggerMiddleware);
        return container;
    }

    /** Configure the server */
    private configure() {
        this._server.setConfig((app) => {
            app.use(bodyParser.urlencoded({
                extended: true
            }));
            app.use(bodyParser.json());
        });
    }

    bootstrap() {
        this._application = this._server.build();
        this._application.listen(3000);
        console.log('Server started on port 3000 :)');
    }
}
