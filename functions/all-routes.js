import { pick } from '@/lib/fp'
import AllRoutes from '@/pages/AllRoutes'

const keyOfEntryToUpperCase = ([x, y]) => x.toUpperCase()

const filterEntryByValue = ([x, y]) => y

const entriesToRouteRecords = obj =>
	Object.entries(obj.methods)
		.filter(filterEntryByValue)
		.map(keyOfEntryToUpperCase)

export const allRoutes = router => (_, res) => {
	const pathsAndMethods = router.stack
		.slice()
		.map(x => x.route)
		.map(pick('path', 'methods'))
		.map(x => ({
			...x,
			methods: Array.from(entriesToRouteRecords(x)),
		}))

	return res.render(AllRoutes, { routes: pathsAndMethods })
}
