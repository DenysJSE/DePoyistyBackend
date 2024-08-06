import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	Param,
	Post,
	Put,
	UsePipes,
	ValidationPipe
} from '@nestjs/common'
import { RestaurantService } from './restaurant.service'
import { Auth } from '../auth/decorators/auth.decorator'
import { RestaurantDto } from './dto/restaurant.dto'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import {
	DeleteRestaurantResponse,
	FullRestaurantResponse,
	RestaurantResponse
} from '../docs/restaurant-response'

@ApiTags('Restaurants')
@Controller('restaurants')
export class RestaurantController {
	constructor(private readonly restaurantService: RestaurantService) {}

	@ApiOperation({ summary: 'Get all restaurants' })
	@ApiResponse({
		status: 200,
		type: [RestaurantResponse],
		description: 'Get array of all restaurants'
	})
	@Get()
	getAllRestaurants() {
		return this.restaurantService.getAllRestaurants()
	}

	@ApiOperation({ summary: 'Get all restaurants' })
	@ApiResponse({
		status: 200,
		type: [FullRestaurantResponse],
		description: 'Get array of all restaurants'
	})
	@Get('by-id/:id')
	@Auth('admin')
	getRestaurantById(@Param('id') id: string) {
		return this.restaurantService.getRestaurantById(+id)
	}

	@ApiOperation({ summary: 'Get all restaurants' })
	@ApiResponse({
		status: 200,
		type: [FullRestaurantResponse],
		description: 'Get array of all restaurants'
	})
	@Get('by-slug/:slug')
	getRestaurantBySlug(@Param('slug') slug: string) {
		return this.restaurantService.getRestaurantBySlug(slug)
	}

	@ApiOperation({ summary: 'Create restaurant' })
	@ApiResponse({
		status: 200,
		type: [RestaurantResponse],
		description: 'Success creation of restaurant and return it'
	})
	@HttpCode(200)
	@UsePipes(new ValidationPipe())
	@Post()
	@Auth('admin')
	createRestaurant(@Body() dto: RestaurantDto) {
		return this.restaurantService.createRestaurant(dto)
	}

	@ApiOperation({ summary: 'Update restaurant' })
	@ApiResponse({
		status: 200,
		type: [RestaurantResponse],
		description: 'Success update of restaurant and return it'
	})
	@HttpCode(200)
	@UsePipes(new ValidationPipe())
	@Put(':id')
	@Auth('admin')
	updateRestaurant(@Param('id') id: string, @Body() dto: RestaurantDto) {
		return this.restaurantService.updateRestaurant(+id, dto)
	}

	@ApiOperation({ summary: 'Delete restaurant' })
	@ApiResponse({
		status: 200,
		type: DeleteRestaurantResponse,
		description:
			'Success delete of restaurant and return message about success operation'
	})
	@Delete(':id')
	@Auth('admin')
	deleteRestaurant(@Param('id') id: string) {
		return this.restaurantService.deleteRestaurant(+id)
	}
}
