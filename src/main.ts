import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import * as cookieParser from 'cookie-parser'
import * as passport from 'passport'
import * as session from 'express-session'

async function bootstrap() {
	const PORT = process.env.PORT || 7777

	const app = await NestFactory.create(AppModule)

	app.setGlobalPrefix('api')
	app.enableCors()
	app.use(cookieParser())

	app.use(
		session({
			secret: 'sdfsdfasdfasdf',
			resave: false,
			saveUninitialized: false
		})
	)
	app.use(passport.initialize())
	app.use(passport.session())

	await app.listen(PORT, () =>
		console.log(`Server started in the port: ${PORT}`)
	)
}
bootstrap()
