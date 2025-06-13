import { Module } from "@nestjs/common";
import { CoffeesController } from "./coffees.controller";
import { CoffeesService } from "./coffees.service";
import { PrismaModule } from "../prisma/prisma.module";

@Module({
  imports: [PrismaModule],
  controllers: [CoffeesController],
  providers: [CoffeesService],
})
export class CoffeesModule {}
