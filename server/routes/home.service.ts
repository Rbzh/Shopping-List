import { injectable } from 'inversify';

@injectable()
export class HomeService {
    constructor() {
        console.log("Home service loaded");
    }

    public getHelloWorld() {
        return "Welcome home :)"
    }
}
