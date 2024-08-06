import { ApiProperty } from '@nestjs/swagger'
import { DishResponse } from './dish-response'

export class CategoryResponse {
	@ApiProperty({
		example: 1,
		description: 'The id of category'
	})
	id: number

	@ApiProperty({
		example: 'Pizza',
		description: 'The name of category'
	})
	name: string

	@ApiProperty({
		example: 'pizza',
		description: 'The slug of category'
	})
	slug: string
}

export class DeleteCategoryResponse {
	@ApiProperty({
		example: 'The category with id: 1 was deleted successfully',
		description: 'The message returned when category was deleted'
	})
	message: string
}

export class FullCategoryResponse {
	@ApiProperty({
		type: CategoryResponse,
		description: 'Category details'
	})
	category: CategoryResponse

	@ApiProperty({
		type: DishResponse,
		description: 'List of dishes category have'
	})
	dishes: DishResponse
}
