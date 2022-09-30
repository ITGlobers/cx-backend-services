import { IOClients } from '@vtex/api'
import { PostClient } from './postClient'


// Extend the default IOClients implementation with our own custom clients.
export class Clients extends IOClients {
  public get getPost() {
    return this.getOrSet('getPost', PostClient)
  }
}
