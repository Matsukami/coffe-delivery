import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCoffeeDto } from '../dto/create-coffe.dto';

@Injectable()
export class CoffeesService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.cafe.findMany({ include: { tags: true } });
  }

  async findOne(id: number) {
    const coffee = await this.prisma.cafe.findUnique({
      where: { id },
      include: { tags: true },
    });
    if (!coffee) throw new NotFoundException(`Café com ID ${id} não encontrado`);
    return coffee;
  }

  async findByType(tipo: string) {
    return this.prisma.cafe.findMany({
      where: { tipo },
      include: { tags: true },
    });
  }

  async create(createCoffeeDto: CreateCoffeeDto) {
    return this.prisma.cafe.create({
      data: createCoffeeDto,
    });
  }

  async update(id: number, updateCoffeeDto: Partial<CreateCoffeeDto>) {
    const coffee = await this.prisma.cafe.findUnique({ where: { id } });
    if (!coffee) throw new NotFoundException(`Café com ID ${id} não encontrado`);
    return this.prisma.cafe.update({
      where: { id },
      data: updateCoffeeDto,
    });
  }

  async remove(id: number) {
    const coffee = await this.prisma.cafe.findUnique({ where: { id } });
    if (!coffee) throw new NotFoundException(`Café com ID ${id} não encontrado`);
    await this.prisma.cafe.delete({ where: { id } });
  }
}