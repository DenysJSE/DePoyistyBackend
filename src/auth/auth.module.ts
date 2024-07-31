import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { PrismaService } from '../prisma.service'
import { UserService } from '../user/user.service'
import { UserModule } from '../user/user.module'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { getJwtConfig } from '../config/jwt.config'
import { JwtStrategy } from './strategies/jwt.strategy'
import { MailService } from '../mail/mail.service'
import { MailModule } from '../mail/mail.module'

@Module({
	controllers: [AuthController],
	providers: [
		AuthService,
		JwtStrategy,
		PrismaService,
		UserService,
		MailService
	],
	imports: [
		UserModule,
		ConfigModule,
		MailModule,
		JwtModule.registerAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: getJwtConfig
		})
	]
})
export class AuthModule {}
