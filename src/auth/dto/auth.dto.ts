import { IsEmail, IsString, MinLength } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class AuthDto {
	@ApiProperty({
		example: 'test@test.com',
		description: 'The email of user',
		required: true
	})
	@IsEmail()
	email: string

	@ApiProperty({
		example: '123456',
		description: 'The password of user',
		minimum: 6,
		required: true
	})
	@IsString()
	@MinLength(6, { message: 'Password must contain at least 6 character!' })
	password: string
}
