import type { InstanceOptions, IOContext } from '@vtex/api'
import { ExternalClient } from '@vtex/api'

const FIVE_SECONS_MS  = 5 * 1000

export default class PostClient extends ExternalClient {
  public constructor(context: IOContext, options?: InstanceOptions) {

    super('https://jsonplaceholder.typicode.com', context, {
      ...options,
      headers: {
        ...(options && options.headers)
      },
      timeout: FIVE_SECONS_MS
    })
  }

  public async postRequest(): Promise<string> {
    return this.http.get('/', {
      metric: 'get-post',
    })
  }
}
