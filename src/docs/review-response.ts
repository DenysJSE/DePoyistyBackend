import { UserUpdatedResponse } from './user-response'
import { ApiProperty } from '@nestjs/swagger'

class Review {
	@ApiProperty({
		example: 1,
		description: 'Id of review'
	})
	id: number

	@ApiProperty({
		example: 'It is so nice. I like it',
		description: 'The text of review about dish or restaurant'
	})
	text: string

	@ApiProperty({
		example: 3,
		minimum: 1,
		maximum: 5,
		description: 'The number of rate'
	})
	rating: number
}

export class ReviewResponse {
	@ApiProperty({
		type: Review,
		description: 'Review details'
	})
	review: Review

	@ApiProperty({
		type: UserUpdatedResponse,
		description: 'User details'
	})
	user: UserUpdatedResponse

	@ApiProperty({
		example: '2024-08-06T06:43:38.945Z',
		description: 'Date of review creation'
	})
	createdAt: Date
}

export class ReviewCreationResponse {
	@ApiProperty({
		type: Review,
		description: 'Review details'
	})
	review: Review

	@ApiProperty({
		example: 1,
		description: 'Id of user who create review'
	})
	userId: number

	@ApiProperty({
		example: 1,
		description:
			'Id of restaurant about which review was leaved. Can be null if review leaved about dish'
	})
	restaurantId: number

	@ApiProperty({
		example: 1,
		description:
			'Id of dish about which review was leaved. Can be null if review leaved about restaurant'
	})
	dishId: number
}

export class RatingValueResponse {
	@ApiProperty({
		example: 1,
		description: 'The rate of dish or restaurant'
	})
	rate: number
}
