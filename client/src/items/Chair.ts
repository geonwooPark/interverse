import Item from './Item'

export default class Chair extends Item {
  heading?: string
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
    this.setInteractionBox('Press Key E')
  }
}
