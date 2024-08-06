import { Module } from '@nestjs/common'
import { UserService } from './user.service'
import { UserController } from './user.controller'
import { PrismaService } from '../prisma.service'
import { DishModule } from '../dish/dish.module'

@Module({
	controllers: [UserController],
	providers: [UserService, PrismaService],
	imports: [DishModule],
	exports: [UserService]
})
export class UserModule {}
