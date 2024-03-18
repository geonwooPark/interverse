import ObjectItem from './ObjectItem'

export default class Chair extends ObjectItem {
  heading?: string
  interaction?: string
  id!: number
  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    texture: string,
    frame?: string | number,
  ) {
    super(scene, x, y, texture, frame)

    this.itemType = 'chair'
  }

  onInteractionBox() {
    if (this.interaction === 'menual') {
      this.setInteractionBox('스페이스키를 눌러 제작자를 확인하세요!')
    } else if (this.interaction === 'interview') {
      this.setInteractionBox('스페이스키를 눌러 화상채팅을 시작하세요!')
    } else {
      this.setInteractionBox('스페이스키를 눌러 의자에 앉아보세요!')
    }
  }
}
