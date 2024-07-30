import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	Param,
	Put,
	UsePipes,
	ValidationPipe
} from '@nestjs/common'
import { UserService } from './user.service'
import { UserDto } from './dto/user.dto'
import { UpdateUserDto } from './dto/update-user.dto'

@Controller('users')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Get('profile/:id')
	// @Auth()  //@CurrentUser('id') id: number
	getProfile(@Param('id') id: number) {
		return this.userService.getUserById(id)
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Put('profile/:id')
	// @Auth()  //@CurrentUser('id') id: number
	updateProfile(@Param('id') id: number, @Body() dto: UpdateUserDto) {
		return this.userService.updateProfile(id, dto)
	}

	@Delete('profile/:id')
	// @Auth()  //@CurrentUser('id') id: number)
	deleteProfile(@Param('id') id: number) {
		return this.userService.deleteProfile(id)
	}

	// todo: create saveDishToFavorite endpoint when dist service will be done!!!
}
