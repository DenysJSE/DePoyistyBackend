import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class UserDto {
	@ApiProperty({
		example: 'test@test.com',
		description: 'The email of user',
		uniqueItems: true,
		required: true
	})
	@IsEmail()
	email: string

	@ApiProperty({
		example: '123456',
		description:
			'The password of user. The field is optional for oAuth, but if you try to skip it through JWT auth system will not allow to register',
		minimum: 6
	})
	@IsString()
	@IsOptional()
	@MinLength(6, { message: 'The password must contain at least 6 symbols.' })
	password: string

	@ApiProperty({
		example: 'Test',
		description: 'The name of user',
		required: true
	})
	@IsString()
	name: string

	// @IsString()
	// @IsOptional()
	// @IsEnum(CityEnum, { message: 'The city must be a valid enum value.' })
	// city: CityEnum

	@ApiProperty({
		example: false,
		description:
			'Use it for set true for users which login through Google oAuth',
		required: false
	})
	@IsOptional()
	isEmailVerified: boolean

	@ApiProperty({
		example: true,
		description: 'Set true only when user login through Google oAuth',
		required: false
	})
	@IsOptional()
	isGoogleAuth: boolean

	@ApiProperty({
		example: null,
		description: 'Use to set to null when user login through Google oAuth',
		required: false
	})
	@IsString()
	@IsOptional()
	verificationToken: string
}
