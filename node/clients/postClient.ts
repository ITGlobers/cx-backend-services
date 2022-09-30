import { ExternalClient,RequestConfig,InstanceOptions, IOContext } from '@vtex/api'
import { statusToError } from '../utils';

const FIVE_SECONDS_MS  = 5 * 1000

export class PostClient extends ExternalClient {
  public constructor(context: IOContext, options?: InstanceOptions) {
    super( 'https://jsonplaceholder.typicode.com', context, {
      ...options,
      timeout: FIVE_SECONDS_MS,
    })
  }


  //   super( 'https://jsonplaceholder.typicode.com', {
  //     ...options,
  //     headers: {
  //       ...(options && options.headers),
  //     },
  //     timeout: FIVE_SECONDS_MS,
  //   });
  // }

  public getPost = () => {
    return this.get(
      '/posts',{
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'X-Vtex-Use-Https': true,
          'Access-Control-Allow-Credentials':true,
      }
    }
    )
  };

  protected get = <T>(url: string, config: RequestConfig = {}) => {
    return this.http.get<T>(url, config).catch(statusToError) as Promise<T>
  }
}
