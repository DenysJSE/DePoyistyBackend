import { OmitType, PartialType } from '@nestjs/mapped-types'
import { UserDto } from './user.dto'
import { IsEmail } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class UpdateUserDto extends PartialType(OmitType(UserDto, ['email'])) {
	@ApiProperty({
		example: 'test@test.com',
		description:
			'This dto have all field from UserDto set to optional, only email is required to update user',
		uniqueItems: true,
		required: true
	})
	@IsEmail()
	email: string
}
