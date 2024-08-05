import {
	BadRequestException,
	Injectable,
	NotFoundException
} from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { CategoryService } from '../category/category.service'
import { RestaurantService } from '../restaurant/restaurant.service'
import { DishDto } from './dto/dish.dto'
import { checkIdIsNumber } from '../utils/id-is-number'
import { returnDishObject } from './return-dish.object'
import { generateSlug } from '../utils/generate-slug'
import { convertName } from '../utils/convert-name'
import { UpdateDishDto } from './dto/update-dish.dto'

@Injectable()
export class DishService {
	constructor(
		private readonly prisma: PrismaService,
		private readonly categoryService: CategoryService,
		private readonly restaurantService: RestaurantService
	) {}

	async getAllDishes() {
		return this.prisma.dish.findMany({
			select: returnDishObject
		})
	}

	async getDishById(dishId: number) {
		const id = checkIdIsNumber(dishId)

		const dish = await this.prisma.dish.findUnique({
			where: { id },
			select: returnDishObject
		})
		if (!dish)
			throw new NotFoundException(`The dish with id: ${id} was not found!`)

		return dish
	}

	async getDishesBySlug(dishSlug: string) {
		const dish = await this.prisma.dish.findMany({
			where: { slug: dishSlug },
			select: returnDishObject
		})
		if (dish.length === 0)
			throw new NotFoundException(
				`The dish with slug: ${dishSlug} was not found!`
			)

		return dish
	}

	async createDish(dishDto: DishDto) {
		await this.categoryService.getCategoryById(dishDto.categoryId)
		await this.restaurantService.getRestaurantById(dishDto.restaurantId)

		const name = convertName(dishDto.name)
		if (name.length === 0)
			throw new BadRequestException('You do not provide any name!')

		return this.prisma.dish.create({
			data: {
				name,
				slug: generateSlug(name),
				description: dishDto.description,
				price: dishDto.price,
				restaurant: {
					connect: { id: dishDto.restaurantId }
				},
				category: {
					connect: { id: dishDto.categoryId }
				}
			}
		})
	}

	async updateDish(dishId: number, dishDto: UpdateDishDto) {
		await this.getDishById(dishId)

		const name = convertName(dishDto.name)
		if (name.length === 0)
			throw new BadRequestException('You do not provide any name!')

		return this.prisma.dish.update({
			where: { id: dishId },
			data: {
				name,
				slug: generateSlug(name),
				description: dishDto.description,
				price: dishDto.price
			}
		})
	}

	async deleteDish(dishId: number) {
		await this.getDishById(dishId)

		await this.prisma.dish.delete({
			where: { id: dishId }
		})

		return { message: `The dish with id: ${dishId} was deleted successfully!` }
	}
}
