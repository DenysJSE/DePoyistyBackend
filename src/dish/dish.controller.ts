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

@Controller('dishes')
export class DishController {
	constructor(private readonly dishService: DishService) {}

	@Get()
	getALl() {
		return this.dishService.getAllDishes()
	}

	@Auth('admin')
	@Get('by-id/:id')
	getDishById(@Param('id') dishId: string) {
		return this.dishService.getDishById(+dishId)
	}

	@Get('by-slug/:slug')
	getDishesBySlug(@Param('slug') dishSlug: string) {
		return this.dishService.getDishesBySlug(dishSlug)
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Auth('admin')
	@Post()
	createDish(@Body() dishDto: DishDto) {
		return this.dishService.createDish(dishDto)
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Auth('admin')
	@Put(':id')
	updateDish(@Param('id') dishId: string, @Body() dishDto: UpdateDishDto) {
		return this.dishService.updateDish(+dishId, dishDto)
	}

	@Auth('admin')
	@Delete(':id')
	deleteDish(@Param('id') dishId: string) {
		return this.dishService.deleteDish(+dishId)
	}
}
