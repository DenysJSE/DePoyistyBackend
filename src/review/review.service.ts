import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { UserService } from '../user/user.service'
import { ReviewDto } from './dto/review.dto'
import { RestaurantService } from '../restaurant/restaurant.service'
import { DishService } from '../dish/dish.service'
import { returnReviewObject } from './return-review.object'

@Injectable()
export class ReviewService {
	constructor(
		private readonly prisma: PrismaService,
		private readonly userService: UserService,
		private readonly restaurantService: RestaurantService,
		private readonly dishService: DishService
	) {}

	async getAllDishReviews() {
		return this.prisma.review.findMany({
			where: {
				dishId: { not: null }
			},
			orderBy: { createdAt: 'desc' },
			select: returnReviewObject
		})
	}

	async getAllRestaurantReviews() {
		return this.prisma.review.findMany({
			where: {
				restaurantId: { not: null }
			},
			orderBy: { createdAt: 'desc' },
			select: returnReviewObject
		})
	}

	async leaveDishReview(userId: number, dishId: number, reviewDto: ReviewDto) {
		await this.userService.getUserById(userId)
		await this.dishService.getDishById(dishId)

		const newReview = await this.prisma.review.create({
			data: {
				text: reviewDto.text,
				rating: reviewDto.rating,
				user: {
					connect: { id: userId }
				},
				dish: {
					connect: { id: dishId }
				}
			}
		})

		const reviews = await this.prisma.review.findMany({
			where: { dishId },
			select: { rating: true }
		})

		const averageRating = reviews.length
			? parseFloat(
					(
						reviews.reduce((acc, review) => acc + review.rating, 0) /
						reviews.length
					).toFixed(1)
				)
			: 0

		await this.prisma.dish.update({
			where: { id: dishId },
			data: { rating: averageRating }
		})

		return newReview
	}

	async leaveRestaurantReview(
		userId: number,
		restaurantId: number,
		reviewDto: ReviewDto
	) {
		await this.userService.getUserById(userId)
		await this.restaurantService.getRestaurantById(restaurantId)

		return this.prisma.review.create({
			data: {
				text: reviewDto.text,
				rating: reviewDto.rating,
				user: {
					connect: { id: userId }
				},
				restaurant: {
					connect: { id: restaurantId }
				}
			}
		})
	}

	async getAverageRatingValueForDish(dishId: number): Promise<number> {
		await this.dishService.getDishById(dishId)

		const result = await this.prisma.review.aggregate({
			where: { dishId },
			_avg: { rating: true }
		})

		const average = result._avg.rating ?? 0
		return parseFloat(average.toFixed(1))
	}

	async getAverageRatingValueForRestaurant(
		restaurantId: number
	): Promise<number> {
		await this.restaurantService.getRestaurantById(restaurantId)

		const result = await this.prisma.review.aggregate({
			where: { restaurantId },
			_avg: { rating: true }
		})

		const average = result._avg.rating ?? 0
		return parseFloat(average.toFixed(1))
	}
}
