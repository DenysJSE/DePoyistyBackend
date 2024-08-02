import { Prisma } from '@prisma/client'

export const returnUserObject: Prisma.UserSelect = {
	id: true,
	email: true,
	name: true,
	password: false,
	// city: true,
	isEmailVerified: true
}
