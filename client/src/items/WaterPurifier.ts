import ObjectItem from './ObjectItem'

const WaterPurifierContent = [
  {
    content: '긴장될 때는 물을 한 잔 마셔보세요!',
  },
  {
    content: '면접 후에는 개선할 점을 파악해보세요!',
  },
  {
    content: '지각은 금물! 중요한 건 첫인상입니다.',
  },
  {
    content: '회사의 업무에 대해 충분히 조사하셨나요?',
  },
  {
    content: '자기소개는 간결하고 명확하게 해야해요!',
  },
  {
    content: '자신감과 함께 적극적인 태도를 보여주세요!',
  },
]

export default class WaterPurifier extends ObjectItem {
  order = 0
  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    texture: string,
    frame?: string | number,
  ) {
    super(scene, x, y, texture, frame)

    this.itemType = 'waterPurifier'
  }

  onInteractionBox() {
    this.setInteractionBox(WaterPurifierContent[this.order].content)
    WaterPurifier.length > this.order ? (this.order += 1) : (this.order = 0)
  }
}
