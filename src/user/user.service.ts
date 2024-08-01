import {
	BadRequestException,
	Injectable,
	NotFoundException
} from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { UserDto } from './dto/user.dto'
import { City, Prisma } from '@prisma/client'
import { hash } from 'bcrypt'
import { checkIdIsNumber } from '../utils/id-is-number'
import { UpdateUserDto } from './dto/update-user.dto'
import { returnUserObject } from './return-user.object'

@Injectable()
export class UserService {
	constructor(private readonly prisma: PrismaService) {}

	async createUser(userDto: UserDto, verificationToken?: string) {
		const existUser = await this.getUserByEmail(userDto.email)
		if (existUser)
			throw new BadRequestException(
				`The user with email: ${userDto.email} already exist!`
			)

		return this.prisma.user.create({
			data: {
				email: userDto.email,
				password: userDto.password ? await hash(userDto.password, 10) : null,
				name: userDto.name,
				city: userDto.city ? City[userDto.city] : null,
				verificationToken,
				isGoogleAuth: userDto.isGoogleAuth,
				isEmailVerified: userDto.isEmailVerified
			}
		})
	}

	async getUserById(userId: number, selectObject: Prisma.UserSelect = {}) {
		const id = checkIdIsNumber(userId)

		const user = await this.prisma.user.findUnique({
			where: { id },
			select: {
				...returnUserObject,
				...selectObject
			}
		})
		if (!user)
			throw new NotFoundException(`The user with id: ${id} was not found!`)

		return user
	}

	async getUserByEmail(email: string) {
		return this.prisma.user.findUnique({
			where: { email }
		})
	}

	async updateProfile(userId: number, userDto: UpdateUserDto) {
		const id = checkIdIsNumber(userId)
		const user = await this.getUserById(id)

		const isSameUser = await this.getUserByEmail(userDto.email)
		if (isSameUser && id !== isSameUser.id)
			throw new BadRequestException(
				`The user with email: ${userDto.email} already exist!`
			)

		return this.prisma.user.update({
			where: { id },
			data: {
				email: userDto.email,
				password: userDto.password
					? await hash(userDto.password, 10)
					: user.password,
				name: userDto.name,
				city: City[userDto.city]
			},
			select: returnUserObject
		})
	}

	async deleteProfile(userId: number) {
		const id = checkIdIsNumber(userId)
		await this.getUserById(id)

		await this.prisma.user.delete({ where: { id } })

		return { message: `The user with id: ${id} was successfully deleted!` }
	}

	async findUserByToken(token: string) {
		return this.prisma.user.findFirst({
			where: { verificationToken: token }
		})
	}
}
