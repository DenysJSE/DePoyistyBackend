import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	Param,
	Post,
	Put,
	UsePipes,
	ValidationPipe
} from '@nestjs/common'
import { CategoryService } from './category.service'
import { Auth } from '../auth/decorators/auth.decorator'
import { CategoryDto } from './dto/category.dto'

@Controller('categories')
export class CategoryController {
	constructor(private readonly categoryService: CategoryService) {}

	@Get()
	getAll() {
		return this.categoryService.getAllCategories()
	}

	@Auth('admin')
	@Get('by-id/:id')
	getCategoryById(@Param('id') categoryId: string) {
		return this.categoryService.getCategoryById(+categoryId)
	}

	@Get('by-slug/:slug')
	getCategoryBySlug(@Param('slug') categorySlug: string) {
		return this.categoryService.getCategoryBySlug(categorySlug)
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Auth('admin')
	@Post()
	createCategory(@Body() categoryDto: CategoryDto) {
		return this.categoryService.createCategory(categoryDto)
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Auth('admin')
	@Put(':id')
	updateCategory(
		@Param('id') categoryId: string,
		@Body() categoryDto: CategoryDto
	) {
		return this.categoryService.updateCategory(+categoryId, categoryDto)
	}

	@Auth('admin')
	@Delete(':id')
	deleteCategory(@Param('id') categoryId: string) {
		return this.categoryService.deleteCategory(+categoryId)
	}
}
