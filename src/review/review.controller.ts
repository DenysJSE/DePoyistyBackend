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
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import {
	RatingValueResponse,
	ReviewCreationResponse,
	ReviewResponse
} from '../docs/review-response'

@ApiTags('Reviews')
@Controller('reviews')
export class ReviewController {
	constructor(private readonly reviewService: ReviewService) {}

	@ApiOperation({ summary: 'Get all reviews about dish' })
	@ApiResponse({
		status: 200,
		type: [ReviewResponse],
		description: 'The list of review about dish'
	})
	@Auth('admin')
	@Get('dish')
	getAllDishReviews() {
		return this.reviewService.getAllDishReviews()
	}

	@ApiOperation({ summary: 'Get all reviews about restaurant' })
	@ApiResponse({
		status: 200,
		type: [ReviewResponse],
		description: 'The list of review about restaurant'
	})
	@Auth('admin')
	@Get('restaurant')
	getAllRestaurantReview() {
		return this.reviewService.getAllRestaurantReviews()
	}

	@ApiOperation({ summary: 'Leave review about dish' })
	@ApiResponse({
		status: 200,
		type: ReviewCreationResponse,
		description: 'Review response after user crete some review'
	})
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

	@ApiOperation({ summary: 'Leave review about restaurant' })
	@ApiResponse({
		status: 200,
		type: ReviewCreationResponse,
		description: 'Review response after user crete some review'
	})
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

	@ApiOperation({ summary: 'Get rate of dish' })
	@ApiResponse({
		status: 200,
		type: RatingValueResponse,
		description: 'Rate of dish'
	})
	@Get('average-for-dish/:dishId')
	getAverageRatingForDish(@Param('dishId') dishId: string) {
		return this.reviewService.getAverageRatingValueForDish(+dishId)
	}

	@ApiOperation({ summary: 'Get rate of restaurant' })
	@ApiResponse({
		status: 200,
		type: RatingValueResponse,
		description: 'Rate of restaurant'
	})
	@Get('average-for-restaurant/:restaurantId')
	getAverageRatingForRestaurant(@Param('restaurantId') restaurantId: string) {
		return this.reviewService.getAverageRatingValueForRestaurant(+restaurantId)
	}
}
