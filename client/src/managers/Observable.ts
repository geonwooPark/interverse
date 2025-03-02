export class Observable<T> {
  private callbacks: Array<(state: T) => void> = []

  subscribe(callback: (state: T) => void) {
    this.callbacks.push(callback)

    return () => {
      this.callbacks = this.callbacks.filter((cb) => cb !== callback)
    }
  }

  notify(state: T) {
    this.callbacks.forEach((cb) => cb(state))
  }
}
