export default class Player {
  player: any
  scene: Phaser.Scene
  avatar: string
  nickname: Phaser.GameObjects.Text
  chatBox: Phaser.GameObjects.Container
  timeOut?: number

  constructor(scene: Phaser.Scene, x: number, y: number, avatar: string) {
    this.scene = scene
    this.avatar = avatar
    // 플레이어 생성
    this.player = this.scene.physics.add.sprite(x, y, this.avatar)
    // 플레이어 랜더시 애니메이션 실행
    this.player.anims.play(`${this.avatar}_stand_down`, true)
    this.player.setSize(32, 32)
    // 닉네임 변수 설정
    this.nickname = this.scene.add
      .text(this.player.x, this.player.y - 35, '')
      .setFontSize(12)
      .setColor('#000000')
      .setOrigin(0.5)
    // 채팅 변수 설정
    this.chatBox = this.scene.add.container(this.player.x, this.player.y)
  }
  // 닉네임 생성
  setNickname(nickname: string) {
    this.nickname = this.scene.add
      .text(0, -35, nickname)
      .setFontSize(12)
      .setColor('#000000')
      .setOrigin(0.5)
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
      this.player.anims.play('conference_run_left', true)
    } else if (cursorsKeys?.right.isDown) {
      vx += moveSpeed
      this.player.anims.play('conference_run_right', true)
    } else if (cursorsKeys?.up.isDown) {
      vy -= moveSpeed
      this.player.anims.play('conference_run_up', true)
    } else if (cursorsKeys?.down.isDown) {
      vy += moveSpeed
      this.player.anims.play('conference_run_down', true)
    } else {
      // 이동 후 정지시 애니메이션 실행
      const animParts = this.player.anims.currentAnim.key.split('_')
      animParts[1] = 'stand'
      this.player.anims.play(animParts.join('_'), true)
    }
    this.player.setVelocity(vx, vy)
    // 닉네임 이동
    this.nickname.x = this.player.x
    this.nickname.y = this.player.y - 35
    // 채팅 이동
    this.chatBox.x = this.player.x
    this.chatBox.y = this.player.y
  }
}
