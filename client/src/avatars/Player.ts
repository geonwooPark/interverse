import Chair from '../items/Chair'
import Item from '../items/Item'

export default class Player {
  scene: Phaser.Scene
  avatar: any
  avatarTexture: string
  nickname: Phaser.GameObjects.Text
  chatBox: Phaser.GameObjects.Container
  timeOut?: number
  selectedInteractionItem?: Item
  behavior = 'stand'

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
    this.avatar.setSize(32, 1)
    // 초기 닉네임 생성
    this.nickname = this.scene.add
      .text(this.avatar.x, this.avatar.y - 35, '')
      .setFontSize(12)
      .setColor('#000000')
      .setOrigin(0.5)
    // 채팅 박스 생성
    this.chatBox = this.scene.add
      .container(this.avatar.x, this.avatar.y)
      .setDepth(1000)
  }
  // 닉네임 생성
  setNickname(nickname: string) {
    this.nickname = this.scene.add
      .text(this.avatar.x, this.avatar.y - 35, nickname)
      .setFontSize(12)
      .setColor('#000000')
      .setOrigin(0.5)
      .setDepth(1000)
  }
  // 채팅 생성
  updateChat(content: string) {
    this.clearChat()
    // 채팅 텍스트 생성
    const chat = this.scene.add
      .text(0, 0, content)
      .setFontSize(12)
      .setColor('#000000')
      .setOrigin(0.5)
    chat.setY(-55)
    // 채팅 박스 크기 및 위치 계산
    const chatWidth = chat.width
    const chatHeight = chat.height

    const chatBoxWidth = chatWidth + 8
    const chatBoxHeight = chatHeight + 4
    const chatBoxX = chat.x - chatWidth / 2 - 4
    const chatBoxY = chat.y - chatHeight / 2 - 2
    // 채팅 박스 생성
    this.chatBox.add(
      this.scene.add
        .graphics()
        .fillStyle(0xffffff, 1)
        .fillRoundedRect(chatBoxX, chatBoxY, chatBoxWidth, chatBoxHeight, 5),
    )
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
  // 플레이어,닉네임 및 채팅 이동
  update(
    cursorsKeys: Phaser.Types.Input.Keyboard.CursorKeys,
    keySpace: Phaser.Input.Keyboard.Key,
  ) {
    const moveSpeed = 200
    let vx = 0
    let vy = 0

    switch (this.behavior) {
      case 'stand':
        // 화살표 키 입력 감지 및 애니메이션 실행
        if (cursorsKeys?.left.isDown) {
          vx -= moveSpeed
          this.avatar.anims.play('conference_run_left', true)
        } else if (cursorsKeys.right.isDown) {
          vx += moveSpeed
          this.avatar.anims.play('conference_run_right', true)
        } else if (cursorsKeys.up.isDown) {
          vy -= moveSpeed
          this.avatar.anims.play('conference_run_up', true)
        } else if (cursorsKeys.down.isDown) {
          vy += moveSpeed
          this.avatar.anims.play('conference_run_down', true)
        } else {
          // 이동 후 정지상태 애니메이션 실행
          const animParts = this.avatar.anims.currentAnim.key.split('_')
          animParts[1] = 'stand'
          this.avatar.anims.play(animParts.join('_'), true)
        }
        // 플레이어 이동
        this.avatar.setVelocity(vx, vy)
        // 닉네임 이동
        this.nickname.x = this.avatar.x
        this.nickname.y = this.avatar.y - 35
        // 채팅 이동
        this.chatBox.x = this.avatar.x
        this.chatBox.y = this.avatar.y
        // 의자에 앉기
        if (
          Phaser.Input.Keyboard.JustDown(keySpace) &&
          this.selectedInteractionItem?.itemType === 'chair'
        ) {
          const chiar = this.selectedInteractionItem as Chair

          this.avatar.setVelocity(0, 0)
          this.avatar.setPosition(chiar.x, chiar.y)
          this.nickname.x = this.avatar.x
          this.nickname.y = this.avatar.y - 35
          this.chatBox.x = this.avatar.x
          this.chatBox.y = this.avatar.y

          this.avatar.anims.play(
            `${this.avatarTexture}_sit_${chiar.heading}`,
            true,
          )

          chiar.clearInteractionBox()
          this.behavior = 'sit'
        }
        break
      case 'sit':
        // 의자에서 일어나기
        if (
          cursorsKeys.left.isDown ||
          cursorsKeys.right.isDown ||
          cursorsKeys.up.isDown ||
          cursorsKeys.down.isDown
        ) {
          const animParts = this.avatar.anims.currentAnim.key.split('_')
          animParts[1] = 'stand'
          this.avatar.anims.play(animParts.join('_'), true)
          this.behavior = 'stand'
        }
        break
    }
    // 플레이어와 오브젝트 겹침이 끝닐 시
    if (this.selectedInteractionItem) {
      if (
        !this.scene.physics.overlap(this.avatar, this.selectedInteractionItem)
      ) {
        this.selectedInteractionItem.clearInteractionBox()
        this.selectedInteractionItem = undefined
      }
    }
  }
}
