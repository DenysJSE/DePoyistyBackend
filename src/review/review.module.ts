import { Module } from '@nestjs/common'
import { ReviewService } from './review.service'
import { ReviewController } from './review.controller'
import { PrismaService } from '../prisma.service'
import { UserModule } from '../user/user.module'
import { DishModule } from '../dish/dish.module'
import { RestaurantModule } from '../restaurant/restaurant.module'

@Module({
	controllers: [ReviewController],
	providers: [ReviewService, PrismaService],
	imports: [UserModule, DishModule, RestaurantModule],
	exports: [ReviewService]
})
export class ReviewModule {}
