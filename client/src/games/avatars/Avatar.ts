import ObjectItem from '../items/ObjectItem'

export default class Avatar extends Phaser.Physics.Arcade.Sprite {
  avatarTexture: string
  avatarContainer: Phaser.GameObjects.Container
  nickname: Phaser.GameObjects.Text
  chatBox: Phaser.GameObjects.Container
  timeOut?: number
  selectedInteractionItem?: ObjectItem

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    texture: string,
    frame?: string | number,
  ) {
    super(scene, x, y, texture, frame)

    this.avatarTexture = texture

    this.anims.play(`${texture}_stand_down`, true)

    this.setDepth(1000)

    this.avatarContainer = this.scene.add.container(x, y - 35).setDepth(10000)

    this.nickname = this.scene.add
      .text(0, 0, '')
      .setFontSize(12)
      .setColor('#000000')
      .setOrigin(0.5)

    this.chatBox = this.scene.add.container(0, 0)

    this.avatarContainer.add(this.nickname)
    this.avatarContainer.add(this.chatBox)

    this.scene.physics.world.enable(this)
    this.scene.physics.world.enable(this.avatarContainer)

    const collisionRange = [0.5, 0.1]
    this.setSize(
      this.width * collisionRange[0],
      this.height * collisionRange[1],
    )
  }

  // 닉네임 변경
  setNickname(nickname: string) {
    this.nickname.setText(nickname)
  }

  // 아바타 텍스처 설정
  setAvatarTexture(avatarTexture: string) {
    this.avatarTexture = avatarTexture
    this.anims.play(`${avatarTexture}_stand_down`, true)
  }

  updateChat(content: string) {
    const limitedText =
      content.length <= 60 ? content : content.substring(0, 60).concat('...')

    this.clearChat()

    // 채팅 텍스트 생성
    const chat = this.scene.add
      .text(0, 0, limitedText, {
        wordWrap: { width: 150, useAdvancedWrap: true },
      })
      .setFontSize(14)
      .setColor('#000000')
      .setOrigin(0.5)
      .setDepth(11000)
      .setY(-25)

    // 채팅 박스 크기 및 위치 계산
    const chatWidth = chat.width
    const chatHeight = chat.height

    const chatBoxWidth = chatWidth + 8
    const chatBoxHeight = chatHeight + 4
    const chatBoxX = chat.x - chatWidth / 2 - 4
    const chatBoxY = chat.y - chatHeight / 2 - 2

    // 채팅 박스 생성
    this.chatBox
      .add(
        this.scene.add
          .graphics()
          .fillStyle(0xffffff, 1)
          .fillRoundedRect(chatBoxX, chatBoxY, chatBoxWidth, chatBoxHeight, 5)
          .lineStyle(1.5, 0x000000, 1)
          .strokeRoundedRect(
            chatBoxX,
            chatBoxY,
            chatBoxWidth,
            chatBoxHeight,
            5,
          ),
      )
      .setDepth(10000)

    // 채팅 박스에 텍스트를 담습니다.
    this.chatBox.add(chat)

    // 5초 후 채팅 박스를 삭제합니다.
    this.timeOut = window.setTimeout(() => {
      this.clearChat()
    }, 5000)
  }

  // 채팅 박스 삭제
  clearChat() {
    clearTimeout(this.timeOut)
    this.chatBox.removeAll(true)
  }
}
