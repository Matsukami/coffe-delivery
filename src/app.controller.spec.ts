import { Test, TestingModule } from '@nestjs/testing';
import { CoffeeController } from './coffe.controller';
import { CoffeeService } from './coffe.service';

describe('AppController', () => {
  let appController: CoffeeController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [CoffeeController],
      providers: [CoffeeService],
    }).compile();

    appController = app.get<CoffeeController>(CoffeeController);
  }); 
});

