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
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import {
	DeleteUserResponse,
	SaveToFavoriteResponse,
	UserUpdatedResponse,
	UserWithFavoritesResponse
} from '../docs/user-response'

@ApiTags('Users')
@Controller('users')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@ApiOperation({ summary: 'Get user profile' })
	@ApiResponse({
		status: 200,
		type: UserWithFavoritesResponse,
		description: 'Successful register and user details returned'
	})
	@Get('profile')
	@Auth()
	getProfile(@CurrentUser('id') id: number) {
		return this.userService.getUserById(id, { favorites: true })
	}

	@ApiOperation({ summary: 'Update user profile' })
	@ApiResponse({
		status: 200,
		type: UserUpdatedResponse,
		description: 'Successful update user and details returned'
	})
	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Put('profile')
	@Auth()
	updateProfile(@CurrentUser('id') id: number, @Body() dto: UpdateUserDto) {
		return this.userService.updateProfile(id, dto)
	}

	@ApiOperation({ summary: 'Delete user' })
	@ApiResponse({
		status: 200,
		type: DeleteUserResponse,
		description: 'Successful delete user and message returned'
	})
	@Delete('profile/:id')
	@Auth()
	deleteProfile(@Param('id') id: number) {
		return this.userService.deleteProfile(id)
	}

	@ApiOperation({ summary: 'Save dish to user favorite' })
	@ApiResponse({
		status: 200,
		type: SaveToFavoriteResponse,
		description: 'Successful save dish to user favorite and message returned'
	})
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
