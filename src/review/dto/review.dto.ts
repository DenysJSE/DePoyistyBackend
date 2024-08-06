import { IsNotEmpty, IsNumber, IsString } from 'class-validator'

export class ReviewDto {
	@IsString()
	@IsNotEmpty()
	text: string

	@IsNumber()
	rating: number
}
