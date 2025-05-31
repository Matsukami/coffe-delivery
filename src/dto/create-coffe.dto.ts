import { IsString, IsNotEmpty, IsOptional, IsNumber, IsArray, Min } from "class-validator"
import { Type } from "class-transformer"

export class CreateCoffeeDto {
  @IsString()
  @IsNotEmpty({ message: "O ID é obrigatório" })
  id: string

  @IsString()
  @IsNotEmpty({ message: "O nome é obrigatório" })
  nome: string

  @IsString()
  @IsNotEmpty({ message: "O tipo é obrigatório" })
  tipo: string

  @IsOptional()
  @IsNumber({}, { message: "A quantidade deve ser um número" })
  @Min(0, { message: "A quantidade deve ser maior ou igual a 0" })
  @Type(() => Number)
  quantidade?: number

  @IsOptional()
  @IsNumber({}, { message: "O preço deve ser um número" })
  @Min(0, { message: "O preço deve ser maior ou igual a 0" })
  @Type(() => Number)
  preco?: number

  @IsOptional()
  @IsString()
  descricao?: string

  @IsOptional()
  @IsArray({ message: "Tags deve ser um array" })
  @IsString({ each: true, message: "Cada tag deve ser uma string" })
  tags?: string[]

  @IsOptional()
  @Type(() => Date)
  dataCriacao?: Date

  @IsOptional()
  @Type(() => Date)
  startDate?: Date

  @IsOptional()
  @Type(() => Date)
  endDate?: Date
}