import { IsNotEmpty, IsNumber, IsString } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class DishDto {
	@ApiProperty({
		example: 'Pizza',
		description: 'The name of dish',
		required: true
	})
	@IsString()
	@IsNotEmpty()
	name: string

	@ApiProperty({
		example: 'The italian pizza',
		description: 'The description of dish',
		required: true
	})
	@IsString()
	@IsNotEmpty()
	description: string

	@ApiProperty({
		example: 150,
		description: 'The price of dish',
		required: true
	})
	@IsNumber()
	price: number

	@ApiProperty({
		example: 1,
		description: 'The id of restaurant to which menu will connected this dish',
		required: true
	})
	@IsNumber()
	restaurantId: number

	@ApiProperty({
		example: 2,
		description: 'The category to which will connected this dish',
		required: true
	})
	@IsNumber()
	categoryId: number
}
