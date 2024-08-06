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
import { DishService } from './dish.service'
import { Auth } from '../auth/decorators/auth.decorator'
import { DishDto } from './dto/dish.dto'
import { UpdateDishDto } from './dto/update-dish.dto'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import {
	DeleteDishResponse,
	DishResponse,
	FullDishResponse
} from '../docs/dish-response'

@ApiTags('Dishes')
@Controller('dishes')
export class DishController {
	constructor(private readonly dishService: DishService) {}

	@ApiOperation({ summary: 'Get all dishes' })
	@ApiResponse({
		status: 200,
		type: [FullDishResponse],
		description: 'Return array of all dishes'
	})
	@Get()
	getALl() {
		return this.dishService.getAllDishes()
	}

	@ApiOperation({ summary: 'Get dish by id' })
	@ApiResponse({
		status: 200,
		type: FullDishResponse,
		description: 'Return dish searched by id'
	})
	@Auth('admin')
	@Get('by-id/:id')
	getDishById(@Param('id') dishId: string) {
		return this.dishService.getDishById(+dishId)
	}

	@ApiOperation({ summary: 'Get dish by slug' })
	@ApiResponse({
		status: 200,
		type: FullDishResponse,
		description: 'Return dish searched by slug'
	})
	@Get('by-slug/:slug')
	getDishesBySlug(@Param('slug') dishSlug: string) {
		return this.dishService.getDishesBySlug(dishSlug)
	}

	@ApiOperation({ summary: 'Create dish' })
	@ApiResponse({
		status: 200,
		type: DishResponse,
		description: 'Return dish after successful creation'
	})
	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Auth('admin')
	@Post()
	createDish(@Body() dishDto: DishDto) {
		return this.dishService.createDish(dishDto)
	}

	@ApiOperation({ summary: 'Update dish' })
	@ApiResponse({
		status: 200,
		type: DishResponse,
		description: 'Return dish after successful update'
	})
	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Auth('admin')
	@Put(':id')
	updateDish(@Param('id') dishId: string, @Body() dishDto: UpdateDishDto) {
		return this.dishService.updateDish(+dishId, dishDto)
	}

	@ApiOperation({ summary: 'Delete dish' })
	@ApiResponse({
		status: 200,
		type: DeleteDishResponse,
		description: 'Return message about successful dish deleting'
	})
	@Auth('admin')
	@Delete(':id')
	deleteDish(@Param('id') dishId: string) {
		return this.dishService.deleteDish(+dishId)
	}
}
