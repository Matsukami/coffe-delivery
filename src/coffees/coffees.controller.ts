import { Controller, Get, Post, Put, Delete, Body, Param, Query, HttpCode, HttpStatus } from "@nestjs/common";
import { CoffeesService } from "./coffees.service";
import { CreateCoffeeDto } from "../dto/create-coffe.dto";
import { Coffee } from './interfaces/coffee.interface';

@Controller()
export class CoffeesController {
  constructor(private readonly coffeesService: CoffeesService) {}

  /**
   * Endpoint: Detalhes do Café
   * GET /coffees/:id/detalhes
   */
  @Get('coffees/:id/detalhes')
  getCoffeeDetails(@Param('id') id: string): Coffee {
    return this.coffeesService.findOne(id);
  }

  /**
   * Endpoint: Criar Novo Café
   * POST /coffee-create
   */
  @Post('coffee-create')
  @HttpCode(HttpStatus.CREATED)
  createCoffee(@Body() createCoffeeDto: CreateCoffeeDto): Coffee {
    return this.coffeesService.create(createCoffeeDto);
  }

  /**
   * GET coffes?tipo=Forte&dataCriacao=2024-06-01T10:00:00Z
   * GET coffees?dataCriacao=2024-06-01T10:00:00Z
   * GET /coffees?tipo=Forte
   */
  @Get('coffees')
  getAllCoffees(
    @Query('tipo') tipo?: string,
    @Query('dataCriacao') dataCriacao?: Date,
    @Query('startDate') startDate?: Date,
    @Query('endDate') endDate?: Date
  ): Coffee[] {
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      if (!isNaN(start.getTime()) && !isNaN(end.getTime())) {
        return this.coffeesService.findByDateRange(start, end);
      }
    }
    if (dataCriacao) {
      const data = new Date(dataCriacao);
      if (!isNaN(data.getTime())) {
        return this.coffeesService.findByCreationDate(data);
      }
    }
    if (tipo) {
      return this.coffeesService.findByType(tipo);
    }
    return this.coffeesService.findAll();
  }

  /**
   * Atualizar um café existente
   * PUT /coffees/:id
   */
  @Put("coffees/:id")
  updateCoffee(@Param('id') id: string, @Body() updateCoffeeDto: Partial<CreateCoffeeDto>): Coffee {
    return this.coffeesService.update(id, updateCoffeeDto)
  }

  /**
   * Remover um café
   * DELETE /coffees/:id
   */
  @Delete('coffees/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  removeCoffee(@Param('id') id: string): void {
    return this.coffeesService.remove(id);
  }
}
