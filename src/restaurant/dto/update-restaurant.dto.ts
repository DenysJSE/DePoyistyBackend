import { OmitType, PartialType } from '@nestjs/mapped-types'
import { IsNotEmpty, IsString } from 'class-validator'
import { RestaurantDto } from './restaurant.dto'

export class UpdateRestaurantDto extends PartialType(
	OmitType(RestaurantDto, ['name'])
) {
	@IsString()
	@IsNotEmpty()
	name: string
}
