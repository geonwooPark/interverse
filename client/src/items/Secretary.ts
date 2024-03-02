import Item from './Item'

export default class Secretary extends Item {
  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    texture: string,
    frame?: string | number,
  ) {
    super(scene, x, y, texture, frame)

    this.itemType = 'secretary'
  }

  onInteractionBox() {
    this.setInteractionBox('스페이스키를 눌러 제작자를 확인하세요!')
  }
}
