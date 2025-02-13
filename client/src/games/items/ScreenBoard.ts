import ObjectItem from './ObjectItem'

export default class ScreenBoard extends ObjectItem {
  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    texture: string,
    frame?: string | number,
  ) {
    super(scene, x, y, texture, frame)

    this.itemType = 'screenBoard'
  }

  onInteractionBox() {
    this.setInteractionBox('스페이스키를 눌러 화면공유를 시작하세요!')
  }
}
