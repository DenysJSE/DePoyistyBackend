import { OmitType, PartialType } from '@nestjs/mapped-types'
import { DishDto } from './dish.dto'
import { IsString } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class UpdateDishDto extends PartialType(
	OmitType(DishDto, ['name', 'restaurantId', 'categoryId'])
) {
	@ApiProperty({
		example: 'Pizza Four Cheese',
		description:
			'This dto have all field from DishDto set to optional but name is required to update dish',
		required: true
	})
	@IsString()
	name: string
}
