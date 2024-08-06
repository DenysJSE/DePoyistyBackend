import { IsNotEmpty, IsNumber, IsString, Max, Min } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class ReviewDto {
	@ApiProperty({
		example: 'It is very tasty food',
		description: 'The text of review user left for dish or restaurant'
	})
	@IsString()
	@IsNotEmpty()
	text: string

	@ApiProperty({
		example: 5,
		description: 'The rating number which user want to rate dish or restaurant',
		minimum: 1,
		maximum: 5
	})
	@IsNumber()
	@Min(1)
	@Max(5)
	rating: number
}
