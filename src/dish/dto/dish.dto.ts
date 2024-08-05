import { IsNotEmpty, IsNumber, IsString } from 'class-validator'

export class DishDto {
	@IsString()
	@IsNotEmpty()
	name: string

	@IsString()
	@IsNotEmpty()
	description: string

	@IsNumber()
	price: number

	@IsNumber()
	restaurantId: number

	@IsNumber()
	categoryId: number
}
