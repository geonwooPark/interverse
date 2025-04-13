export interface IRoom {
  roomNum: string
  role: 'host' | 'guest'
  title: string
  createAt: number
  headCount?: number
}
