import * as express from "express";
import {
    interfaces, controller, httpGet, httpPost, httpDelete,
     response, requestParam, requestBody
} from "inversify-express-utils";
import { inject } from "inversify";
import { DeleteWriteOpResultObject } from "mongodb";
import { ShoppingListService } from "./shopping-list.service";
import { ShoppingList } from "../../model/shopping-list";


@controller("/shopping-list", 'LoggerRequest')
export class ShoppingListController implements interfaces.Controller {

    constructor(@inject('ShoppingListService') private shoppingListService: ShoppingListService) { }

    @httpGet("/")
    public list(): Promise<Array<ShoppingList>> {
        return this.shoppingListService.getShoppingLists();
    }

    @httpPost("/")
    public async create(@requestBody() shoppingList: ShoppingList, @response() res: express.Response) {
        try {
            await this.shoppingListService.createShoppingList(shoppingList);
            res.sendStatus(201);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    }

    @httpDelete("/:id")
    public delete(@requestParam("id") id: string, @response() res: express.Response) {
        this.shoppingListService.deleteShoppingList(id).then((deleteResult: DeleteWriteOpResultObject) => {
            if (deleteResult.deletedCount > 0) {
                res.sendStatus(201);
            } else {
                res.sendStatus(204);
            }
        });
    }
}

