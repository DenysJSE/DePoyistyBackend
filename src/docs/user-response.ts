import { ApiProperty } from '@nestjs/swagger'

class Favorite {
	@ApiProperty({
		example: 1,
		description: 'The unique identifier of the favorite item'
	})
	id: number

	@ApiProperty({
		example: '2024-08-05T08:10:00.230Z',
		description: 'Creation date of the favorite item'
	})
	createdAt: string

	@ApiProperty({
		example: '2024-08-05T08:46:54.834Z',
		description: 'Last update date of the favorite item'
	})
	updatedAt: string

	@ApiProperty({
		example: 'Bugres spicy hot',
		description: 'Name of the favorite item'
	})
	name: string

	@ApiProperty({
		example: 'bugres-spicy-hot',
		description: 'Slug for the favorite item'
	})
	slug: string

	@ApiProperty({
		example: 'It is very tasty burger which you will like',
		description: 'Description of the favorite item'
	})
	description: string

	@ApiProperty({ example: 150, description: 'Price of the favorite item' })
	price: number

	@ApiProperty({ example: 0, description: 'Rating of the favorite item' })
	rating: number

	@ApiProperty({
		example: 28,
		description: 'User ID associated with the favorite item'
	})
	userId: number

	@ApiProperty({ example: 2, description: 'Category ID of the favorite item' })
	categoryId: number

	@ApiProperty({
		example: 1,
		description: 'Restaurant ID associated with the favorite item'
	})
	restaurantId: number
}

export class UserWithFavoritesResponse {
	@ApiProperty({
		example: 28,
		description: 'The unique identifier of the user'
	})
	id: number

	@ApiProperty({
		example: 'test@test.com',
		description: 'The email of the user'
	})
	email: string

	@ApiProperty({ example: 'Test', description: 'The name of the user' })
	name: string

	@ApiProperty({
		example: false,
		description: "Whether the user's email is verified"
	})
	isEmailVerified: boolean

	@ApiProperty({
		type: [Favorite],
		description: 'List of favorite items of the user'
	})
	favorites: Favorite[]
}

export class UserUpdatedResponse {
	@ApiProperty({
		example: 28,
		description: 'The unique identifier of the user'
	})
	id: number

	@ApiProperty({
		example: 'test@test.com',
		description: 'The email of the user'
	})
	email: 'test@test.com'

	@ApiProperty({ example: 'Test', description: 'The name of the user' })
	name: 'Denys Markevych'

	@ApiProperty({
		example: false,
		description: "Whether the user's email is verified"
	})
	isEmailVerified: false
}

export class DeleteUserResponse {
	@ApiProperty({
		example: 'The user with id: 3 was successfully deleted!',
		description: 'Success message for delete user'
	})
	message: string
}

export class SaveToFavoriteResponse {
	@ApiProperty({
		example: 'Success',
		description: 'Success message for delete user'
	})
	message: string
}
