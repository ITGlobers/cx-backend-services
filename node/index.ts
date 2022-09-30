import { ClientsConfig, ServiceContext, method, Service, LRUCache } from '@vtex/api'

import { Clients } from './clients'
import { getPost } from './middlewares/getPost'
import { methodNotAllowed } from './middlewares/methods'

const TIMEOUT_MS = 10000

const memoryCache = new LRUCache<string, any>({ max: 5000 })
metrics.trackCache('status', memoryCache)

// This is the configuration for clients available in `ctx.clients`.
const clients: ClientsConfig<Clients> = {
  // We pass our custom implementation of the clients bag, containing the Status client.
  implementation: Clients,
  options: {
    // All IO Clients will be initialized with these options, unless otherwise specified.
    default: {
      retries: 2,
      timeout: TIMEOUT_MS,
    },
  },
}

declare global {
  interface State {
    id: number
    data: string[]
  }
  // We declare a global Context type just to avoid re-writing ServiceContext<Clients, State> in every handler and resolver
  type Context = ServiceContext<Clients>

  // The shape of our State object found in `ctx.state`. This is used as state bag to communicate between middlewares.

}

// Export a service that defines route handlers and client options.
export default new Service({
  clients,
  routes: {
    getpost: method({
      DEFAULT: methodNotAllowed,
      GET: [getPost],
    })
  },
})
