import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { RestaurantDto } from './dto/restaurant.dto'
import { UpdateRestaurantDto } from './dto/update-restaurant.dto'
import { checkIdIsNumber } from '../utils/id-is-number'
import { generateSlug } from '../utils/generate-slug'

@Injectable()
export class RestaurantService {
	constructor(private readonly prisma: PrismaService) {}

	async getRestaurantById(restaurantId: number) {
		const id = checkIdIsNumber(restaurantId)
		const restaurant = await this.prisma.restaurant.findUnique({
			where: { id }
		})
		if (!restaurant)
			throw new NotFoundException(
				`The restaurant with id: ${id} was not found!`
			)

		return restaurant
	}

	// async getRestaurantsByCity(cityName: string) {
	// 	const city = Object.values(CityEnum).includes(City[cityName])
	// 	if (!city)
	// 		throw new NotFoundException(
	// 			`The city: ${cityName} you provide is not found!`
	// 		)
	//
	// 	return this.prisma.restaurant.findMany({
	// 		where: { city: City[cityName] }
	// 	})
	// }

	async getRestaurantBySlug(restaurantSlug: string) {
		const restaurant = await this.prisma.restaurant.findUnique({
			where: { slug: restaurantSlug }
		})
		if (!restaurant)
			throw new NotFoundException(
				`The restaurant with name: ${restaurantSlug} was not found!`
			)

		return restaurant
	}

	async getAllRestaurants() {
		return this.prisma.restaurant.findMany()
	}

	async createRestaurant(restaurantDto: RestaurantDto) {
		return this.prisma.restaurant.create({
			data: {
				name: restaurantDto.name,
				slug: generateSlug(restaurantDto.name),
				// city: City[restaurantDto.city],
				address: restaurantDto.address
			}
		})
	}

	async updateRestaurant(
		restaurantId: number,
		restaurantDto: UpdateRestaurantDto
	) {
		await this.getRestaurantById(restaurantId)

		return this.prisma.restaurant.update({
			where: { id: restaurantId },
			data: {
				name: restaurantDto.name,
				slug: generateSlug(restaurantDto.name),
				address: restaurantDto.address
			}
		})
	}

	async deleteRestaurant(restaurantId: number) {
		await this.getRestaurantById(restaurantId)

		await this.prisma.restaurant.delete({
			where: { id: restaurantId }
		})

		return {
			message: `The restaurant with id: ${restaurantId} was deleted successfully!`
		}
	}
}
