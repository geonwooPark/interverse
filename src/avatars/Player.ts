export default class Player {
  avatar: any
  scene: Phaser.Scene
  avatarTexture: string
  nickname: Phaser.GameObjects.Text
  chatBox: Phaser.GameObjects.Container
  timeOut?: number

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    avatarTexture: string,
  ) {
    this.scene = scene
    this.avatarTexture = avatarTexture
    // 플레이어 생성
    this.avatar = this.scene.physics.add.sprite(x, y, this.avatarTexture)
    // 플레이어 랜더시 애니메이션 실행
    this.avatar.anims.play(`${this.avatarTexture}_stand_down`, true)
    this.avatar.setSize(32, 32)
    // 닉네임 변수 설정
    this.nickname = this.scene.add
      .text(this.avatar.x, this.avatar.y - 35, '')
      .setFontSize(12)
      .setColor('#000000')
      .setOrigin(0.5)
    // 채팅 변수 설정
    this.chatBox = this.scene.add
      .container(this.avatar.x, this.avatar.y)
      .setDepth(1000)
  }
  // 닉네임 생성
  setNickname(nickname: string) {
    this.nickname = this.scene.add
      .text(0, -35, nickname)
      .setFontSize(12)
      .setColor('#000000')
      .setOrigin(0.5)
      .setDepth(1000)
  }
  // 채팅 생성
  updateChat(content: string) {
    this.clearChat()

    const chat = this.scene.add
      .text(0, 0, content)
      .setFontSize(12)
      .setColor('#000000')
      .setOrigin(0.5)
    chat.setY(-55)

    const chatWidth = chat.width
    const chatHeight = chat.height

    const chatBoxWidth = chatWidth + 8
    const chatBoxHeight = chatHeight + 4
    const chatBoxX = chat.x - chatWidth / 2 - 4
    const chatBoxY = chat.y - chatHeight / 2 - 2

    this.chatBox.add(
      this.scene.add
        .graphics()
        .fillStyle(0xffffff, 1)
        .fillRoundedRect(chatBoxX, chatBoxY, chatBoxWidth, chatBoxHeight, 5),
    )
    this.chatBox.add(chat)

    this.timeOut = window.setTimeout(() => {
      this.clearChat()
    }, 5000)
  }
  // 채팅 삭제
  clearChat() {
    clearTimeout(this.timeOut)
    this.chatBox.removeAll(true)
  }
  // 플레이어,닉네임 및 채팅 이동
  update(cursorsKeys: any) {
    const moveSpeed = 200
    let vx = 0
    let vy = 0

    // 화살표 키 입력 감지 및 애니메이션 실행
    if (cursorsKeys?.left.isDown) {
      vx -= moveSpeed
      this.avatar.anims.play('conference_run_left', true)
    } else if (cursorsKeys?.right.isDown) {
      vx += moveSpeed
      this.avatar.anims.play('conference_run_right', true)
    } else if (cursorsKeys?.up.isDown) {
      vy -= moveSpeed
      this.avatar.anims.play('conference_run_up', true)
    } else if (cursorsKeys?.down.isDown) {
      vy += moveSpeed
      this.avatar.anims.play('conference_run_down', true)
    } else {
      // 이동 후 정지시 애니메이션 실행
      const animParts = this.avatar.anims.currentAnim.key.split('_')
      animParts[1] = 'stand'
      this.avatar.anims.play(animParts.join('_'), true)
    }
    this.avatar.setVelocity(vx, vy)
    // 닉네임 이동
    this.nickname.x = this.avatar.x
    this.nickname.y = this.avatar.y - 35
    // 채팅 이동
    this.chatBox.x = this.avatar.x
    this.chatBox.y = this.avatar.y
  }
}
