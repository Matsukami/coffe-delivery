import { Injectable, NotFoundException } from '@nestjs/common';
import { Coffee } from './interfaces/coffee.interface';
import { CreateCoffeeDto } from '../dto/create-coffe.dto';

@Injectable()
export class CoffeesService {
  private coffees: Coffee[] = [
    {
      id: '1',
      nome: 'Café Expresso',
      tipo: 'Forte',
      quantidade: 10,
      preco: 8.5,
      descricao: 'Café forte e encorpado.',
      tags: ['forte', 'tradicional'],
      dataCriacao: new Date('2024-06-01T10:00:00Z'),
      startDate: new Date('2024-06-06T10:00:00Z'),
      endDate: new Date('2024-06-28T10:00:00Z')
    },
    {
      id: '2',
      nome: 'Café Latte',
      tipo: 'Suave',
      quantidade: 5,
      preco: 10.0,
      descricao: 'Café suave com leite vaporizado.',
      tags: ['suave', 'leite'],
      dataCriacao: new Date('2024-06-02T11:00:00Z'),
      startDate: new Date('2024-06-02T11:00:00Z'),
      endDate: new Date('2024-06-30T11:00:00Z')
    },
    {
      id: '3',
      nome: 'Café Mocha',
      tipo: 'Doce',
      quantidade: 7,
      preco: 12.0,
      descricao: 'Café com chocolate e leite.',
      tags: ['doce', 'chocolate'],
      dataCriacao: new Date('2024-06-03T12:00:00Z'),
      startDate: new Date('2024-06-03T12:00:00Z'),
      endDate: new Date('2024-06-30T12:00:00Z')
    }
  ];

  findAll(): Coffee[] {
    return this.coffees;
  }

  findOne(id: string): Coffee {
    const coffee = this.coffees.find(coffee => coffee.id === id);
    if (!coffee) {
      throw new NotFoundException(`Coffee with ID ${id} not found`);
    }
    return coffee;
  }

  findByType(tipo: string): Coffee[] {
    return this.coffees.filter(coffee => coffee.tipo === tipo);
  }

  findByCreationDate(dataCriacao: Date): Coffee[] {
    return this.coffees.filter(coffee => {
      if (!coffee.dataCriacao) return false;
      const dataA = new Date(coffee.dataCriacao);
      return (
        dataA.getUTCFullYear() === dataCriacao.getUTCFullYear() &&
        dataA.getUTCMonth() === dataCriacao.getUTCMonth() &&
        dataA.getUTCDate() === dataCriacao.getUTCDate()
      );
    });
  }
  
  findByDateRange(startDate: Date, endDate: Date): Coffee[] {
    if (startDate > endDate) {
      return [];
    }
    return this.coffees.filter(coffee => {
      if (!coffee.dataCriacao) return false;
      const dataA = new Date(coffee.dataCriacao);
      return dataA.getTime() >= startDate.getTime() && dataA.getTime() <= endDate.getTime();
    });
  }

  create(createCoffeeDto: CreateCoffeeDto): Coffee {
    const coffee: Coffee = {
      ...createCoffeeDto,
      dataCriacao: new Date()
    };
    this.coffees.push(coffee);
    return coffee;
  }

  update(id: string, updateCoffeeDto: Partial<CreateCoffeeDto>): Coffee {
    const index = this.coffees.findIndex(coffee => coffee.id === id);
    if (index === -1) {
      throw new NotFoundException(`Coffee with ID ${id} not found`);
    }
    this.coffees[index] = { ...this.coffees[index], ...updateCoffeeDto };
    return this.coffees[index];
  }

  remove(id: string): void {
    const index = this.coffees.findIndex(coffee => coffee.id === id);
    if (index === -1) {
      throw new NotFoundException(`Coffee with ID ${id} not found`);
    }
    this.coffees.splice(index, 1);
  }
}