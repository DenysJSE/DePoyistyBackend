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

@Controller('restaurants')
export class RestaurantController {
	constructor(private readonly restaurantService: RestaurantService) {}

	@Get()
	getAllRestaurants() {
		return this.restaurantService.getAllRestaurants()
	}

	@Get('by-id/:id')
	@Auth('admin')
	getRestaurantById(@Param('id') id: string) {
		return this.restaurantService.getRestaurantById(+id)
	}

	@Get('by-slug/:slug')
	getRestaurantBySlug(@Param('slug') slug: string) {
		return this.restaurantService.getRestaurantBySlug(slug)
	}

	@HttpCode(200)
	@UsePipes(new ValidationPipe())
	@Post()
	@Auth('admin')
	createRestaurant(@Body() dto: RestaurantDto) {
		return this.restaurantService.createRestaurant(dto)
	}

	@HttpCode(200)
	@UsePipes(new ValidationPipe())
	@Put(':id')
	@Auth('admin')
	updateRestaurant(@Param('id') id: string, @Body() dto: RestaurantDto) {
		return this.restaurantService.updateRestaurant(+id, dto)
	}

	@Delete(':id')
	@Auth('admin')
	deleteRestaurant(@Param('id') id: string) {
		return this.restaurantService.deleteRestaurant(+id)
	}
}
