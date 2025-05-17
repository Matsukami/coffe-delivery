import { Injectable, NotFoundException } from '@nestjs/common';
import { Coffee } from './coffe.entity';
import { CreateCoffeeDto } from './dto/create-coffe.dto';

@Injectable()
export class CoffeeService {
  private coffees: Coffee[] = [];

  findById(id: string): Coffee {
    const cafe = this.coffees.find(c => c.id === id);
    if (!cafe) {
      throw new NotFoundException(`Café com ID ${id} não encontrado.`);
    }
    return cafe;
  }

  createCoffee(dto: CreateCoffeeDto): { message: string; cafe: Coffee } {
    const novoCafe: Coffee = { ...dto };
    this.coffees.push(novoCafe);
    return {
      message: 'Café criado com sucesso',
      cafe: novoCafe,
    };
  }
}
