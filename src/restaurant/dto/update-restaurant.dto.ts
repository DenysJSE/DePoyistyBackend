import { OmitType, PartialType } from '@nestjs/mapped-types'
import { IsNotEmpty, IsString } from 'class-validator'
import { RestaurantDto } from './restaurant.dto'
import { ApiProperty } from '@nestjs/swagger'

export class UpdateRestaurantDto extends PartialType(
	OmitType(RestaurantDto, ['name'])
) {
	@ApiProperty({
		example: 'New Restaurant',
		description:
			'This dto have all field from RestaurantDto set to optional but name is required to update restaurant',
		uniqueItems: true,
		required: true
	})
	@IsString()
	@IsNotEmpty()
	name: string
}
