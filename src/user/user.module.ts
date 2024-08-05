import { Module } from '@nestjs/common'
import { UserService } from './user.service'
import { UserController } from './user.controller'
import { PrismaService } from '../prisma.service'
import { DishService } from '../dish/dish.service'
import { CategoryService } from '../category/category.service'
import { RestaurantService } from '../restaurant/restaurant.service'

@Module({
	controllers: [UserController],
	providers: [
		UserService,
		PrismaService,
		DishService,
		CategoryService,
		RestaurantService
	],
	exports: [UserService]
})
export class UserModule {}
