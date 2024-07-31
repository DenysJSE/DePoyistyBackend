import {
	BadRequestException,
	Injectable,
	NotFoundException
} from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { UserService } from '../user/user.service'
import { UserDto } from '../user/dto/user.dto'
import { AuthDto } from './dto/auth.dto'
import { JwtService } from '@nestjs/jwt'
import { User } from '@prisma/client'
import * as bcrypt from 'bcrypt'
import { Response } from 'express'
import { v4 as uuidv4 } from 'uuid'
import { MailService } from '../mail/mail.service'

@Injectable()
export class AuthService {
	constructor(
		private readonly prisma: PrismaService,
		private readonly userService: UserService,
		private readonly jwt: JwtService,
		private readonly mailService: MailService
	) {}

	async register(userDto: UserDto) {
		const emailExist = await this.userService.getUserByEmail(userDto.email)
		if (emailExist)
			throw new BadRequestException(
				`The email: ${userDto.email} you provided already exist!`
			)

		const verificationToken = await this.generateEmailVerificationToken()

		const user = await this.userService.createUser(userDto, verificationToken)
		const tokens = await this.createTokens(user.id)

		await this.mailService.sendVerificationEmail(
			userDto.email,
			verificationToken
		)

		return {
			user: this.returnUserFields(user),
			...tokens,
			verificationToken
		}
	}

	async login(authDto: AuthDto) {
		const user = await this.validateUser(authDto)
		const tokens = await this.createTokens(user.id)

		return {
			user: this.returnUserFields(user),
			...tokens
		}
	}

	private async createTokens(userId: number) {
		const data = { id: userId }

		const accessToken = this.jwt.sign(data, {
			expiresIn: '1h'
		})

		const refreshToken = this.jwt.sign(data, {
			expiresIn: '7d'
		})

		return { accessToken, refreshToken }
	}

	private async validateUser(dto: AuthDto) {
		const user = await this.userService.getUserByEmail(dto.email)
		if (!user)
			throw new NotFoundException(
				`The user with email: "${dto.email}" was not found!`
			)

		const isValid = await bcrypt.compare(dto.password, user.password)
		if (!isValid) throw new BadRequestException('Invalid password!')

		return user
	}

	async getNewTokens(refreshToken: string) {
		const result = await this.jwt.verifyAsync(refreshToken)
		if (!result) throw new BadRequestException('Invalid token!')

		const user = await this.userService.getUserById(result.id, {
			isAdmin: true
		})

		const tokens = await this.createTokens(user.id)

		return {
			user: this.returnUserFields(user),
			...tokens
		}
	}

	addRefreshTokenToResponse(res: Response, refreshToken: string) {
		const expiresIn = new Date()
		expiresIn.setDate(
			expiresIn.getDate() + Number(process.env.EXPIRE_DAY_REFRESH_TOKEN)
		)

		res.cookie(process.env.REFRESH_TOKEN_NAME, refreshToken, {
			httpOnly: true,
			domain: 'localhost',
			expires: expiresIn,
			secure: true,
			sameSite: 'none'
		})
	}

	removeRefreshTokenFromResponse(res: Response) {
		res.cookie(process.env.REFRESH_TOKEN_NAME, {
			httpOnly: true,
			domain: 'localhost',
			expires: new Date(0),
			secure: true,
			sameSite: 'none'
		})
	}

	//oAuth

	private async generateEmailVerificationToken() {
		return uuidv4()
	}

	async verifyEmail(token: string) {
		const user = await this.userService.findUserByToken(token)
		if (!user) throw new BadRequestException('Invalid verification token!')

		await this.prisma.user.update({
			where: { id: user.id },
			data: {
				isEmailVerified: true,
				verificationToken: null
			}
		})

		await this.mailService.sendConfirmationEmail(user.email)

		return { message: 'Email verified successfully!' }
	}

	private returnUserFields(user: Partial<User>) {
		return {
			id: user.id,
			email: user.email,
			name: user.name,
			city: user.city,
			isAdmin: user.isAdmin
		}
	}
}
