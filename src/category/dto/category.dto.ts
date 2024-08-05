import { IsNotEmpty, IsString } from 'class-validator'

export class CategoryDto {
	// TODO: when will add docs (swagger) add for all isString field in dto isNotEmpty value
	@IsString()
	@IsNotEmpty()
	name: string
}
