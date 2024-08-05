import { Prisma } from '@prisma/client'
import { returnCategoryObject } from '../category/return-category.object'
import { returnRestaurantObject } from '../restaurant/return-restaurant.object'

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
	reviews: true
}
