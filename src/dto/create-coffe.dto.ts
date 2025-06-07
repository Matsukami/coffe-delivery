import { IsString, IsNotEmpty, IsNumber, Min, IsOptional } from "class-validator";

export class CreateCoffeeDto {
  @IsString()
  @IsNotEmpty({ message: "O nome é obrigatório" })
  nome: string;

  @IsString()
  @IsNotEmpty({ message: "O tipo é obrigatório" })
  tipo: string;

  @IsNumber()
  @Min(0)
  preco: number;

  @IsString()
  @IsNotEmpty({ message: "A descrição é obrigatória" })
  description: string;

  @IsOptional()
  @IsString()
  itensPedido?: string;
}