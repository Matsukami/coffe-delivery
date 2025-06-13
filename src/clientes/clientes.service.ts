import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateClienteDto } from '../dto/create-client.dto';

@Injectable()
export class ClientesService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.cliente.findMany({
      include: {
        pedidos: {
          include: {
            itens: true,
            entregas: true,
          },
        },
      },
    });
  }

  async findOne(id: number) {
    const cliente = await this.prisma.cliente.findUnique({
      where: { id },
      include: {
        pedidos: {
          include: {
            itens: true,
            entregas: true,
          },
        },
      },
    });
    if (!cliente) throw new NotFoundException(`Cliente com ID ${id} não encontrado`);
    return cliente;
  }

  async create(data: CreateClienteDto) {
    return this.prisma.cliente.create({ data });
  }

  async update(id: number, data: Partial<CreateClienteDto>) {
    const cliente = await this.prisma.cliente.findUnique({ where: { id } });
    if (!cliente) throw new NotFoundException(`Cliente com ID ${id} não encontrado`);
    return this.prisma.cliente.update({ where: { id }, data });
  }

  async remove(id: number) {
    const cliente = await this.prisma.cliente.findUnique({ where: { id } });
    if (!cliente) throw new NotFoundException(`Cliente com ID ${id} não encontrado`);
    await this.prisma.cliente.delete({ where: { id } });
  }
}
