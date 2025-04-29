import { SessionStoragePersist, Store } from 'ventileco-store'

export const isLoggedInStore = new Store(false, [
  new SessionStoragePersist('isLoggedIn'),
])
