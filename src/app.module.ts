import { Module } from '@nestjs/common';
import { CoffeeController } from './coffe.controller';
import { CoffeeService } from './coffe.service';

@Module({
  imports: [],
  controllers: [CoffeeController],
  providers: [CoffeeService],
})
export class AppModule {}
