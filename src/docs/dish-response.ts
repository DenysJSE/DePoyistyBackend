import { ApiProperty } from '@nestjs/swagger'

class Dish {
	@ApiProperty({
		example: '1',
		description: 'The id of the dish'
	})
	id: number

	@ApiProperty({
		example: 'Pizza Four Cheese',
		description: 'The name of the dish'
	})
	name: string

	@ApiProperty({
		example: 'pizza-four-cheese',
		description: 'The slug of the dish'
	})
	slug: string

	@ApiProperty({
		example: 'It is very tasty pizza, you will like it',
		description: 'The description of the dish'
	})
	description: string

	@ApiProperty({
		example: 150,
		description: 'The price of the dish'
	})
	price: number

	@ApiProperty({
		example: 2.3,
		description: 'The rating of the dish'
	})
	rating: number
}

export class DeleteDishResponse {
	@ApiProperty({
		example: 'The dish with id: 1 was deleted successfully!',
		description: 'Message inform about dish deleting'
	})
	message: string
}

export class DishResponse {
	@ApiProperty({
		type: Dish,
		description: 'User details'
	})
	dish: Dish

	@ApiProperty({
		example: 1,
		description: 'Id of dish category'
	})
	categoryId: number

	@ApiProperty({
		example: 1,
		description: 'Id of dish restaurant'
	})
	restaurantId: number
}

export class FullDishResponse {
	@ApiProperty({
		type: Dish,
		description: 'User details'
	})
	dish: Dish

	@ApiProperty({
		example: 'Pizza',
		description: 'The category of dish'
	})
	category: string

	@ApiProperty({
		type: Object,
		properties: {
			name: { example: 'Restaurant', description: 'Name of restaurant' },
			rating: { example: 0, description: 'Rating of restaurant' },
			address: { example: 'Street 2', description: 'Address of restaurant' }
		},
		description: 'Some restaurant properties'
	})
	restaurant: Object

	@ApiProperty({
		type: Object,
		properties: {
			text: { example: 'It is tasty', description: 'Rating text' },
			rating: { example: 0, description: 'Rating of restaurant' },
			userId: { example: 1, description: 'Id of user which leave review' },
			dishId: { example: 1, description: 'Id of dish to which review was left' }
		},
		description: 'Some restaurant properties'
	})
	reviews: Object
}
