import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import * as cookieParser from 'cookie-parser'
import * as passport from 'passport'
import * as session from 'express-session'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

async function bootstrap() {
	const PORT = process.env.PORT || 7777

	const app = await NestFactory.create(AppModule)

	app.setGlobalPrefix('api')
	app.enableCors()
	app.use(cookieParser())

	const config = new DocumentBuilder()
		.setTitle('DePoyisty')
		.setDescription('The API of DePoyisty app backend')
		.setVersion('0.0.1')
		.build()
	const document = SwaggerModule.createDocument(app, config)
	SwaggerModule.setup('api/docs', app, document)

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
