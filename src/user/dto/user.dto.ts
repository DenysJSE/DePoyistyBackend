import { IsEmail, IsEnum, IsString, MinLength } from 'class-validator'
import { CityEnum } from '../../enums/city.enum'

export class UserDto {
	@IsEmail()
	email: string

	@IsString()
	@MinLength(6, { message: 'The password must contain at least 6 symbols.' })
	password: string

	@IsString()
	name: string

	@IsString()
	@IsEnum(CityEnum, { message: 'The city must be a valid enum value.' })
	city: CityEnum
}
