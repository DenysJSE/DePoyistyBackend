import { Prisma } from '@prisma/client'
import { returnCategoryObject } from '../category/return-category.object'

export const returnRestaurantObject: Prisma.RestaurantSelect = {
	id: true,
	name: true,
	slug: true,
	rating: true,
	address: true,
	reviews: true,
	menu: {
		select: {
			id: true,
			name: true,
			slug: true,
			description: true,
			price: true,
			rating: true,
			category: {
				select: returnCategoryObject
			},
			restaurant: true
		}
	}
}
