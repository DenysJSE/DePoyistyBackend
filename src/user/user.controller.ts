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
import { UpdateUserDto } from './dto/update-user.dto'
import { CurrentUser } from '../auth/decorators/user.decorator'
import { Auth } from '../auth/decorators/auth.decorator'

@Controller('users')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Get('profile')
	@Auth()
	getProfile(@CurrentUser('id') id: number) {
		return this.userService.getUserById(id)
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Put('profile')
	@Auth()
	updateProfile(@CurrentUser('id') id: number, @Body() dto: UpdateUserDto) {
		return this.userService.updateProfile(id, dto)
	}

	@Delete('profile/:id')
	@Auth()
	deleteProfile(@Param('id') id: number) {
		return this.userService.deleteProfile(id)
	}

	// todo: create saveDishToFavorite endpoint when dist service will be done!!!
}
