import { Controller, Get, Post, Put, Delete, Body, Param, Query, HttpCode, HttpStatus, ParseIntPipe } from "@nestjs/common";
import { CoffeesService } from "./coffees.service";
import { CreateCoffeeDto } from "../dto/create-coffe.dto";

@Controller()
export class CoffeesController {
  constructor(private readonly coffeesService: CoffeesService) {}

  @Get('coffees/:id/detalhes')
  async getCoffeeDetails(@Param('id', ParseIntPipe) id: number) {
    return this.coffeesService.findOne(id);
  }

  @Post('coffee-create')
  @HttpCode(HttpStatus.CREATED)
  async createCoffee(@Body() createCoffeeDto: CreateCoffeeDto) {
    return this.coffeesService.create(createCoffeeDto);
  }

  @Get('coffees')
  async getAllCoffees(
    @Query('tipo') tipo?: string
  ) {
    if (tipo) {
      return this.coffeesService.findByType(tipo);
    }
    return this.coffeesService.findAll();
  }

  @Put("coffees/:id")
  async updateCoffee(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCoffeeDto: Partial<CreateCoffeeDto>
  ) {
    return this.coffeesService.update(id, updateCoffeeDto);
  }

  @Delete('coffees/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeCoffee(@Param('id', ParseIntPipe) id: number) {
    await this.coffeesService.remove(id);
  }
}