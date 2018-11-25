import { injectable, inject } from 'inversify';
import { Collection, DeleteWriteOpResultObject } from 'mongodb';
import { MongoDBManager } from '../../../common/mongodb/mongodb.manager';
import { ShoppingList } from '../../model/shopping-list';

@injectable()
export class ShoppingListService {

    @inject('MongoDBManager') private mongoManager: MongoDBManager

    private getCollection(): Collection<ShoppingList> {
        return this.mongoManager.db.collection('shopping-list');
    }

    public getShoppingLists(): Promise<Array<ShoppingList>> {
        return this.getCollection().find().toArray();
    }

    public getShoppingList(id: string): Promise<ShoppingList> {
        return this.getCollection().find({ id }).next();
    }

public createShoppingList(shoppingList: ShoppingList){
    return this.getCollection().insertOne(shoppingList).then(() => {
        return shoppingList;
    });
}

     public deleteShoppingList(id: string): Promise<DeleteWriteOpResultObject> {
        return this.getCollection().deleteOne({ id });
    }
}

