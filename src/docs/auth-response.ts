import { ApiProperty } from '@nestjs/swagger'
import { UserDto } from '../user/dto/user.dto'

export class AuthResponse {
	@ApiProperty({ type: UserDto, description: 'User details' })
	user: UserDto

	@ApiProperty({
		example:
			'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjgsImlhdCI6MTcyMjkzMDg5MiwiZXhwIjoxNzIyOTM0NDkyfQ.yKM7Fh9UNviB4IXxaG258Ti2cxbh1tJKe-VsAkx1Yks',
		description: 'The access token'
	})
	accessToken: string
}

export class LogoutResponse {
	@ApiProperty({
		example: 'You are logged out from the system successfully!',
		description: 'Success message for logout'
	})
	message: string
}
