import {
  IsEmail,
  IsEmpty,
  IsEnum,
  IsOptional,
  IsString,
} from 'class-validator';
import { Role } from 'src/common/role';

export class UpdateUserDto {
  @IsEmpty()
  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsOptional()
  @IsEnum(Role)
  role: Role;
}
