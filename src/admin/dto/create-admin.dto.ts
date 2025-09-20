import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString } from 'class-validator';

export class CreateAdminDto {
  @ApiProperty({
    example: 1,
    description: 'Unique user ID',
  })
  @IsInt()
  id: number;

  @ApiProperty({
    example: 'mihay',
    description: 'Full name of the admin',
  })
  @IsString()
  name: string;

  @ApiProperty({
    example: 'john@example.com',
    description: 'Unique email of the admin',
  })
  @IsString()
  email: string;

  @ApiProperty({
    example: '+91-9876543210',
    description: 'Phone number of the admin',
  })
  @IsString()
  phone: string;

  @ApiProperty({
    example: 'P@ssw0rd!',
    description: 'Password for the account',
  })
  @IsString()
  password: string;

  @ApiProperty({
    example: 'google',
    description: 'company of the admin',
  })
  @IsString()
  companyName: string;
}


export class AdminSignIn {
  email: string;
  password: string;
}
