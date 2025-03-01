export default class ObjectItem extends Phaser.Physics.Arcade.Sprite {
  itemType!: 'secretary' | 'chair' | 'waterPurifier' | 'printer' | 'screenBoard'

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    texture: string,
    frame?: string | number,
  ) {
    super(scene, x, y, texture, frame)
  }

  setInteractionBox(content: string) {
    this.scene.events.emit('changeContent', content)
    this.scene.events.emit('openAlert')
  }

  clearInteractionBox() {
    this.scene.events.emit('changeContent', '')
  }
}
