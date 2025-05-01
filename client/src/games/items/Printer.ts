import ObjectItem from './ObjectItem'

export default class Printer extends ObjectItem {
  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    texture: string,
    frame?: string | number,
  ) {
    super(scene, x, y, texture, frame)

    this.itemType = 'printer'
  }

  do() {
    this.scene.events.emit('openSurveyModal')
    this.scene.events.emit(
      'changeContent',
      'ESC 키를 눌러 게임으로 돌아갈 수 있습니다.',
    )
  }

  undo() {
    this.scene.events.emit('closeModal')
    this.scene.events.emit('changeContent', '')
  }

  onInteractionBox() {
    this.setInteractionBox('스페이스키를 눌러 INTERVERSE를 평가해주세요!')
  }
}
