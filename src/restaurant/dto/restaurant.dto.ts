import { IsNotEmpty, IsString } from 'class-validator'

export class RestaurantDto {
	@IsString()
	@IsNotEmpty()
	name: string

	// @IsString()
	// @IsEnum(CityEnum)
	// city: CityEnum

	@IsString()
	@IsNotEmpty()
	address: string
}
