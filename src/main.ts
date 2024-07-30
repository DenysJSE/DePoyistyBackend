import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import * as cookieParser from 'cookie-parser'

async function bootstrap() {
	const PORT = process.env.PORT || 7777

	const app = await NestFactory.create(AppModule)

	app.setGlobalPrefix('api')
	app.enableCors()
	app.use(cookieParser())

	await app.listen(PORT, () =>
		console.log(`Server started in the port: ${PORT}`)
	)
}
bootstrap()
