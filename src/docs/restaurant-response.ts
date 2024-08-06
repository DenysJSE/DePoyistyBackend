import { ApiProperty } from '@nestjs/swagger'
import { DishResponse } from './dish-response'

export class RestaurantResponse {
	@ApiProperty({
		example: 1,
		description: 'The id of restaurant'
	})
	id: number

	@ApiProperty({
		example: 'Restaurant',
		description: 'The name of restaurant'
	})
	name: string

	@ApiProperty({
		example: 'restaurant',
		description: 'The slug of restaurant'
	})
	slug: string

	@ApiProperty({
		example: 'Street 1',
		description: 'The address of restaurant'
	})
	address: string

	@ApiProperty({
		example: 4,
		description: 'The rating of restaurant'
	})
	rating: number
}

export class DeleteRestaurantResponse {
	@ApiProperty({
		example: 'The restaurant with id: 1 was deleted successfully!',
		description:
			'The message returned after restaurant was deleted successfully'
	})
	message: string
}

export class FullRestaurantResponse {
	@ApiProperty({
		type: RestaurantResponse,
		description: 'Restaurant details'
	})
	restaurant: RestaurantResponse

	@ApiProperty({
		type: DishResponse,
		description: 'Dish details'
	})
	menu: DishResponse
}
