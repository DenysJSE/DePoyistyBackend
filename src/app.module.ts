import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuthModule } from './auth/auth.module'
import { UserModule } from './user/user.module'
import { PrismaService } from './prisma.service'
import { ConfigModule } from '@nestjs/config'
import { MailerModule } from '@nestjs-modules/mailer'
import { PassportModule } from '@nestjs/passport'
import { RestaurantModule } from './restaurant/restaurant.module'
import { CategoryModule } from './category/category.module'
import { DishModule } from './dish/dish.module'
import { ReviewModule } from './review/review.module'

@Module({
	imports: [
		PassportModule.register({ session: true }),
		MailerModule.forRoot({
			transport: {
				host: process.env.EMAIL_HOST,
				auth: {
					user: process.env.EMAIL_USERNAME,
					pass: process.env.EMAIL_PASSWORD
				}
			}
		}),
		ConfigModule.forRoot(),
		AuthModule,
		UserModule,
		RestaurantModule,
		CategoryModule,
		DishModule,
		ReviewModule
	],
	controllers: [AppController],
	providers: [AppService, PrismaService]
})
export class AppModule {}
