import { Prisma } from '@prisma/client'

export const returnRestaurantObject: Prisma.RestaurantSelect = {
	id: true,
	name: true,
	slug: true,
	rating: true,
	address: true,
	reviews: true,
	menu: true
}
