import { IsEmail } from 'class-validator';

export class CreateUserDto {
  
  firstName: string;
  
  lastName: string;

  @IsEmail()
  email: string;
}
