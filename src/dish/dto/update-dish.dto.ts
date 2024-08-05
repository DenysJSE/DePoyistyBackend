import { OmitType, PartialType } from '@nestjs/mapped-types'
import { DishDto } from './dish.dto'
import { IsString } from 'class-validator'

export class UpdateDishDto extends PartialType(
	OmitType(DishDto, ['name', 'restaurantId', 'categoryId'])
) {
	@IsString()
	name: string
}
