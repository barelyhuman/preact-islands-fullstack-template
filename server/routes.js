import HomePage from '@/pages/HomePage.js'
import { User } from '@/models/User'
import { allRoutes } from '@/functions/all-routes'
import { db } from '@/database'

export default function (router) {
  router.route('/').get(async (_, res) => {
    // TODO Enable after you create a user
    // const userData = await User.findByPK(1)
    return res.render(HomePage, {
      email: 'hello@demo.com',
      // userData.email
    })
  })

  router.route('/all').get(allRoutes(router))

  return router
}
