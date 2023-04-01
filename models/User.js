import { createModel } from '@/lib/model'
import { db } from '@/database'

export const User = createModel('users', db)
