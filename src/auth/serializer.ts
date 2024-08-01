import { PassportSerializer } from '@nestjs/passport'
import { User } from '@prisma/client'
import { UserService } from '../user/user.service'
import { Injectable } from '@nestjs/common'

@Injectable()
export class SessionSerializer extends PassportSerializer {
	constructor(private readonly userService: UserService) {
		super()
	}

	serializeUser(user: User, done: Function): any {
		done(null, user)
	}

	async deserializeUser(payload: any, done: Function) {
		const user = await this.userService.getUserById(payload.id)
		return user ? done(null, user) : done(null, null)
	}
}
