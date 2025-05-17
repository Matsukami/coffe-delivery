import { Body, Controller, Get, Param, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { CoffeeService } from './coffe.service';
import { CreateCoffeeDto } from './dto/create-coffe.dto';

@Controller()
export class CoffeeController {
  constructor(private readonly coffeeService: CoffeeService) {}

  @Get('/coffes/:id/detalhes')
  getCoffeeDetails(@Param('id') id: string) {
    return this.coffeeService.findById(id);
  }

  @Post('/coffee-create')
  @HttpCode(HttpStatus.CREATED)
  createCoffee(@Body() body: CreateCoffeeDto) {
    return this.coffeeService.createCoffee(body);
  }
}