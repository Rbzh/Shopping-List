import { controller, httpGet } from 'inversify-express-utils';
import { inject } from 'inversify';
import { HomeService } from './home.service';

@controller('/')
export class HomeController {

    @inject('HomeService') homeService: HomeService;

    constructor() {
        console.log("'/' path loaded");
    }

    @httpGet('/')
    public get(): string {
        return this.homeService.getHelloWorld();
    }
}
