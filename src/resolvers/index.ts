import { Query } from './Query'
// import { Subscription } from './Subscription'
import { auth } from './Mutation/auth'
import { post } from './Mutation/post'
import { item } from './Mutation/item'
// import { User } from './User'
// import { Post } from './Post'

export default {
  Query,
  Mutation: {
    ...auth,
    ...post,
    ...item,
  },
  // Subscription,
  // User,
  // Post,
}
