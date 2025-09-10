import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional, IsPostalCode, IsString } from 'class-validator';

export class AddressDto {
  @ApiProperty({
    example: '123 Main Street',
    description: 'Street address of the user',
  })
  @IsString()
  street: string;

  @ApiProperty({
    example: 'Chennai',
    description: 'City of the user',
  })
  @IsString()
  city: string;

  @ApiProperty({
    example: 'Tamil Nadu',
    description: 'State of the user',
  })
  @IsString()
  state: string;

  @ApiProperty({
    example: '600001',
    description: 'Postal code of the user',
  })
  @IsPostalCode('IN')
  postalCode: string;

  @ApiProperty({
    example: 'India',
    description: 'Country of the user',
    required: false,
  })
  @IsOptional()
  @IsString()
  country?: string;
}
export class CreateUserDto {
  @ApiProperty({
    example: 1,
    description: 'Unique user ID',
  })
  @IsInt()
  id: number;

  @ApiProperty({
    example: 'John Doe',
    description: 'Full name of the user',
  })
  @IsString()
  name: string;

  @ApiProperty({
    example: 'john@example.com',
    description: 'Unique email of the user',
  })
  @IsString()
  email: string;

  @ApiProperty({
    example: '+91-9876543210',
    description: 'Phone number of the user',
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
    type: () => AddressDto,
    description: 'Address details of the user',
    required: false,
  })
  @IsOptional()
  address?: AddressDto;
}

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

export class SignInDto {
  email: string;
  password: string;
}
