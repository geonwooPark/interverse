export default class Item extends Phaser.Physics.Arcade.Sprite {
  private interacrionBox: Phaser.GameObjects.Container
  itemType!: 'secretary' | 'chair'

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    texture: string,
    frame?: string | number,
  ) {
    super(scene, x, y, texture, frame)
    // 텍스트를 담을 박스입니다.
    this.interacrionBox = this.scene.add.container().setDepth(2000)
  }
  // 텍스트 박스 출력
  setInteractionBox(content: string) {
    // 텍스트 생성
    const innerContent = this.scene.add
      .text(0, 0, content)
      .setFontSize(12)
      .setColor('#000000')
    // 텍스트 박스 크기 및 위치 계산
    const innerContentWidth = innerContent.width
    const innerContentHeight = innerContent.height

    const interacrionBoxWidth = innerContentWidth + 8
    const interacrionBoxHeight = innerContentHeight + 4
    const interacrionBoxX = this.x - interacrionBoxWidth * 0.5
    const interacrionBoxY = this.y + interacrionBoxHeight * 0.5
    // 텍스트 박스 생성
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
    // 텍스트 박스에 텍스트를 담습니다.
    this.interacrionBox.add(
      innerContent.setPosition(interacrionBoxX + 4, interacrionBoxY + 2),
    )
  }
  // 텍스트 박스 삭제
  clearInteractionBox() {
    this.interacrionBox.removeAll(true)
  }
}
