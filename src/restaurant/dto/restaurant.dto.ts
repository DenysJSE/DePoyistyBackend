import { IsNotEmpty, IsString } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class RestaurantDto {
	@ApiProperty({
		example: 'Restaurant',
		description: 'The name of restaurant',
		uniqueItems: true,
		required: true
	})
	@IsString()
	@IsNotEmpty()
	name: string

	// @IsString()
	// @IsEnum(CityEnum)
	// city: CityEnum

	@ApiProperty({
		example: 'Street 1',
		description: 'The address of restaurant',
		required: true
	})
	@IsString()
	@IsNotEmpty()
	address: string
}
