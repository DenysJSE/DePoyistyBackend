import {
	BadRequestException,
	Injectable,
	NotFoundException
} from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { UserDto } from './dto/user.dto'
import { City } from '@prisma/client'
import { hash } from 'bcrypt'
import { checkIdIsNumber } from '../utils/id-is-number'
import { UpdateUserDto } from './dto/update-user.dto'

@Injectable()
export class UserService {
	constructor(private readonly prisma: PrismaService) {}

	async createUser(userDto: UserDto) {
		const existUser = await this.getUserByEmail(userDto.email)
		if (existUser)
			throw new BadRequestException(
				`The user with email: ${userDto.email} already exist!`
			)

		return this.prisma.user.create({
			data: {
				email: userDto.email,
				password: await hash(userDto.password, 10),
				name: userDto.name,
				city: City[userDto.city]
			}
		})
	}

	async getUserById(userId: number) {
		const id = checkIdIsNumber(userId)

		const user = await this.prisma.user.findUnique({
			where: { id }
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
			}
		})
	}

	async deleteProfile(userId: number) {
		const id = checkIdIsNumber(userId)
		await this.getUserById(id)

		await this.prisma.user.delete({ where: { id } })

		return { message: `The user with id: ${id} was successfully deleted!` }
	}
}
