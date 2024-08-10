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

@Injectable()
export class AuthService {
	constructor(
		private readonly prisma: PrismaService,
		private readonly userService: UserService,
		private readonly jwt: JwtService
	) {}

	async register(userDto: UserDto) {
		const emailExist = await this.userService.getUserByEmail(userDto.email)
		if (emailExist)
			throw new BadRequestException(
				`The email: ${userDto.email} you provided already exist!`
			)
		if (!userDto.password)
			throw new BadRequestException(
				'You need to provide password, it should be at least 6 character long!'
			)

		const verificationToken = await this.generateEmailVerificationToken()

		const user = await this.userService.createUser(userDto, verificationToken)
		const tokens = await this.createTokens(user)

		return {
			user: this.returnUserFields(user),
			...tokens,
			verificationToken
		}
	}

	async login(authDto: AuthDto) {
		const user = await this.validateUser(authDto)
		const tokens = await this.createTokens(user)

		return {
			user: this.returnUserFields(user),
			...tokens
		}
	}

	async createTokens(user: User) {
		const data = { id: user.id }

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

		if (user.isGoogleAuth && user.password === null) {
			throw new BadRequestException(
				'It seems like you signed in through Google recently. Please use it to enter to the system!'
			)
		}

		const isValid = await bcrypt.compare(dto.password, user.password)
		if (!isValid) throw new BadRequestException('Invalid password!')

		return user
	}

	async validateGoogleAuthUser(profile: any) {
		const { email, name } = profile
		let user = await this.prisma.user.findUnique({ where: { email } })

		if (!user) {
			user = await this.prisma.user.create({
				data: {
					email,
					name,
					isGoogleAuth: true,
					verificationToken: null,
					isEmailVerified: true,
					password: null
				}
			})
		}

		return user
	}

	async getNewTokens(refreshToken: string) {
		const result = await this.jwt.verifyAsync(refreshToken)
		if (!result) throw new BadRequestException('Invalid token!')

		const user = await this.userService.getUserById(result.id, {
			isAdmin: true
		})

		const tokens = await this.createTokens(user)

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

	private async generateEmailVerificationToken() {
		return uuidv4()
	}

	private returnUserFields(user: Partial<User>) {
		return {
			id: user.id,
			email: user.email,
			name: user.name,
			// city: user.city,
			isAdmin: user.isAdmin
		}
	}
}
