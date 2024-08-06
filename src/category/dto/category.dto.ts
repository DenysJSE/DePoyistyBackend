import { IsNotEmpty, IsString } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class CategoryDto {
	@ApiProperty({
		example: 'Pizza',
		description: 'The name of category',
		uniqueItems: true,
		required: true
	})
	@IsString()
	@IsNotEmpty()
	name: string
}
