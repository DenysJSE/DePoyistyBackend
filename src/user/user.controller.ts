import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	Param,
	Patch,
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
		return this.userService.getUserById(id, { favorites: true })
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

	@HttpCode(200)
	@Auth()
	@Patch('profile/favorites/:dishId')
	async saveDishToFavorite(
		@CurrentUser('id') id: number,
		@Param('dishId') dishId: string
	) {
		return this.userService.saveDishToFavorite(id, +dishId)
	}
}
