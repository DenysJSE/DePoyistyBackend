import {
	Body,
	Controller,
	Get,
	HttpCode,
	Param,
	Post,
	UsePipes,
	ValidationPipe
} from '@nestjs/common'
import { ReviewService } from './review.service'
import { Auth } from '../auth/decorators/auth.decorator'
import { CurrentUser } from '../auth/decorators/user.decorator'
import { ReviewDto } from './dto/review.dto'

@Controller('reviews')
export class ReviewController {
	constructor(private readonly reviewService: ReviewService) {}

	@Auth('admin')
	@Get('dish')
	getAllDishReviews() {
		return this.reviewService.getAllDishReviews()
	}

	@Auth('admin')
	@Get('restaurant')
	getAllRestaurantReview() {
		return this.reviewService.getAllRestaurantReviews()
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Auth()
	@Post('/leave-for-dish/:dishId')
	leaveDishReview(
		@CurrentUser('id') userId: number,
		@Param('dishId') dishId: string,
		@Body() reviewDto: ReviewDto
	) {
		return this.reviewService.leaveDishReview(userId, +dishId, reviewDto)
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Auth()
	@Post('/leave-for-restaurant/:restaurantId')
	leaveRestaurantReview(
		@CurrentUser('id') userId: number,
		@Param('restaurantId') restaurantId: string,
		@Body() reviewDto: ReviewDto
	) {
		return this.reviewService.leaveRestaurantReview(
			userId,
			+restaurantId,
			reviewDto
		)
	}

	@Get('average-for-dish/:dishId')
	getAverageRatingForDish(@Param('dishId') dishId: string) {
		return this.reviewService.getAverageRatingValueForDish(+dishId)
	}

	@Get('average-for-restaurant/:restaurantId')
	getAverageRatingForRestaurant(@Param('restaurantId') restaurantId: string) {
		return this.reviewService.getAverageRatingValueForRestaurant(+restaurantId)
	}
}
