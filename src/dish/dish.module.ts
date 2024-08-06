import { Module } from '@nestjs/common'
import { DishService } from './dish.service'
import { DishController } from './dish.controller'
import { PrismaService } from '../prisma.service'
import { RestaurantModule } from '../restaurant/restaurant.module'
import { CategoryModule } from '../category/category.module'

@Module({
	controllers: [DishController],
	providers: [DishService, PrismaService],
	imports: [RestaurantModule, CategoryModule],
	exports: [DishService]
})
export class DishModule {}
