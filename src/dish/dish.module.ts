import { Module } from '@nestjs/common'
import { DishService } from './dish.service'
import { DishController } from './dish.controller'
import { PrismaService } from '../prisma.service'
import { RestaurantService } from '../restaurant/restaurant.service'
import { CategoryService } from '../category/category.service'

@Module({
	controllers: [DishController],
	providers: [DishService, PrismaService, RestaurantService, CategoryService]
})
export class DishModule {}
