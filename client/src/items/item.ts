export default class Item extends Phaser.Physics.Arcade.Sprite {
  interacrionBox: Phaser.GameObjects.Container
  itemType!: 'secretary'

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    texture: string,
    frame?: string | number,
  ) {
    super(scene, x, y, texture, frame)

    this.interacrionBox = this.scene.add.container().setDepth(2000)
  }

  setInteractionBox(content: string) {
    const innerContent = this.scene.add
      .text(0, 0, content)
      .setFontSize(12)
      .setColor('#000000')

    const innerContentWidth = innerContent.width
    const innerContentHeight = innerContent.height

    const interacrionBoxWidth = innerContentWidth + 8
    const interacrionBoxHeight = innerContentHeight + 4
    const interacrionBoxX = this.x
    const interacrionBoxY = this.y

    this.interacrionBox.add(
      this.scene.add
        .graphics()
        .fillStyle(0xffffff, 1)
        .fillRoundedRect(
          interacrionBoxX,
          interacrionBoxY,
          interacrionBoxWidth,
          interacrionBoxHeight,
          5,
        ),
    )
    this.interacrionBox.add(
      innerContent.setPosition(interacrionBoxX, interacrionBoxY),
    )
  }

  clearInteractionBox() {
    this.interacrionBox.removeAll(true)
  }
}
