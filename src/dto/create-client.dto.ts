import { IsString, IsNotEmpty, IsEmail } from 'class-validator';

export class CreateClienteDto {
  @IsString()
  @IsNotEmpty({ message: 'O nome é obrigatório' })
  nome: string;

  @IsEmail({}, { message: 'E-mail inválido' })
  @IsNotEmpty({ message: 'O e-mail é obrigatório' })
  email: string;

  @IsString()
  @IsNotEmpty({ message: 'O CPF é obrigatório' })
  cpf: string;

  @IsString()
  @IsNotEmpty({ message: 'O telefone é obrigatório' })
  telefone: string;
}
