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
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import {
	CategoryResponse,
	DeleteCategoryResponse,
	FullCategoryResponse
} from '../docs/category-response'

@ApiTags('Categories')
@Controller('categories')
export class CategoryController {
	constructor(private readonly categoryService: CategoryService) {}

	@ApiOperation({ summary: 'Get all categories' })
	@ApiResponse({
		status: 200,
		type: [CategoryResponse],
		description: 'Get all categories'
	})
	@Get()
	getAll() {
		return this.categoryService.getAllCategories()
	}

	@ApiOperation({ summary: 'Get category by id' })
	@ApiResponse({
		status: 200,
		type: FullCategoryResponse,
		description: 'Get category by id'
	})
	@Auth('admin')
	@Get('by-id/:id')
	getCategoryById(@Param('id') categoryId: string) {
		return this.categoryService.getCategoryById(+categoryId)
	}

	@ApiOperation({ summary: 'Get category by slug' })
	@ApiResponse({
		status: 200,
		type: FullCategoryResponse,
		description: 'Get category by slug'
	})
	@Get('by-slug/:slug')
	getCategoryBySlug(@Param('slug') categorySlug: string) {
		return this.categoryService.getCategoryBySlug(categorySlug)
	}

	@ApiOperation({ summary: 'Create category' })
	@ApiResponse({
		status: 200,
		type: CategoryResponse,
		description: 'Create category and return category details'
	})
	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Auth('admin')
	@Post()
	createCategory(@Body() categoryDto: CategoryDto) {
		return this.categoryService.createCategory(categoryDto)
	}

	@ApiOperation({ summary: 'Update category' })
	@ApiResponse({
		status: 200,
		type: CategoryResponse,
		description: 'Update category and return category details'
	})
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

	@ApiOperation({ summary: 'Delete category' })
	@ApiResponse({
		status: 200,
		type: DeleteCategoryResponse,
		description: 'Delete category and return message about successful operation'
	})
	@Auth('admin')
	@Delete(':id')
	deleteCategory(@Param('id') categoryId: string) {
		return this.categoryService.deleteCategory(+categoryId)
	}
}
