import { Module } from "@nestjs/common"
import { CoffeesModule } from "./coffees/coffees.module"
import { PrismaModule } from './prisma/prisma.module';
import { ClientesModule } from './clientes/clientes.module';

@Module({
  imports: [CoffeesModule, PrismaModule, ClientesModule],
})
export class AppModule {}