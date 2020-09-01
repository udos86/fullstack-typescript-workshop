import { IsEmail } from 'class-validator';
import { IsForbidden } from '@fullstack-typescript-workshop/validation';

export class CreateUserDto {
  firstName: string;
  
  @IsForbidden('test')
  lastName: string;

  @IsEmail()
  email: string;
}
