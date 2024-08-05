import {
	BadRequestException,
	Injectable,
	NotFoundException
} from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { CategoryDto } from './dto/category.dto'
import { checkIdIsNumber } from '../utils/id-is-number'
import { generateSlug } from '../utils/generate-slug'
import { convertName } from '../utils/convert-name'
import { returnCategoryObject } from './return-category.object'

@Injectable()
export class CategoryService {
	constructor(private readonly prisma: PrismaService) {}

	async getAllCategories() {
		return this.prisma.category.findMany()
	}

	async getCategoryById(categoryId: number) {
		const id = checkIdIsNumber(categoryId)
		const category = await this.prisma.category.findUnique({
			where: { id },
			select: returnCategoryObject
		})
		if (!category)
			throw new NotFoundException(`The category with id: ${id} was not found!`)

		return category
	}

	async getCategoryBySlug(categorySlug: string) {
		const category = await this.prisma.category.findUnique({
			where: { slug: categorySlug },
			select: returnCategoryObject
		})
		if (!category)
			throw new NotFoundException(
				`The category with slug: ${categorySlug} was not found!`
			)

		return category
	}

	async createCategory(categoryDto: CategoryDto) {
		const category = await this.prisma.category.findUnique({
			where: { name: categoryDto.name }
		})
		if (category)
			throw new BadRequestException(
				`The category with name: ${categoryDto.name} already exist!`
			)

		const name = convertName(categoryDto.name)
		if (name.length === 0)
			throw new BadRequestException('You do not provide any name!')

		return this.prisma.category.create({
			data: {
				name,
				slug: generateSlug(categoryDto.name)
			}
		})
	}

	async updateCategory(categoryId: number, categoryDto: CategoryDto) {
		await this.getCategoryById(categoryId)

		return this.prisma.category.update({
			where: { id: categoryId },
			data: {
				name: categoryDto.name,
				slug: generateSlug(categoryDto.name)
			}
		})
	}

	async deleteCategory(categoryId: number) {
		await this.getCategoryById(categoryId)
		await this.prisma.category.delete({
			where: { id: categoryId }
		})

		return {
			message: `The category with id: ${categoryId} was deleted successfully!`
		}
	}
}
