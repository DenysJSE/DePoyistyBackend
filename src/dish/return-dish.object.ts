import { Prisma } from '@prisma/client'

export const returnDishObject: Prisma.DishSelect = {
	id: true,
	name: true,
	slug: true,
	description: true,
	price: true,
	rating: true,
	category: {
		select: {
			name: true
		}
	},
	restaurant: {
		select: {
			name: true,
			rating: true,
			address: true
		}
	},
	reviews: {
		select: {
			id: true,
			text: true,
			rating: true,
			createdAt: true,
			user: {
				select: {
					name: true
				}
			}
		},
		orderBy: { createdAt: 'desc' }
	}
}
