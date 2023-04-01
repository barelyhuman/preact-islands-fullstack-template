import HomePage from '@/pages/HomePage.js'
import { User } from '@/models/User'
import { allRoutes } from '@/functions/all-routes'
import { db } from '@/database'

export default function (router) {
	router.route('/').get(async (_, res) => {
		const userData = await User.findByPK(1)
		return res.render(HomePage, { email: userData.email })
	})

	router.route('/all').get(allRoutes(router))

	return router
}
