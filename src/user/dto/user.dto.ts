import {
	IsEmail,
	IsEnum,
	IsOptional,
	IsString,
	MinLength
} from 'class-validator'
import { CityEnum } from '../../enums/city.enum'

export class UserDto {
	@IsEmail()
	email: string

	@IsString()
	@IsOptional()
	@MinLength(6, { message: 'The password must contain at least 6 symbols.' })
	password: string

	@IsString()
	name: string

	@IsString()
	@IsOptional()
	@IsEnum(CityEnum, { message: 'The city must be a valid enum value.' })
	city: CityEnum

	@IsOptional()
	isEmailVerified: boolean

	@IsOptional()
	isGoogleAuth: boolean

	@IsString()
	@IsOptional()
	verificationToken: string
}
