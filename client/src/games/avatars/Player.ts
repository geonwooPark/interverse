import { store } from '../../store/store'
import Avatar from './Avatar'

export default class Player extends Avatar {
  prevVx = 0
  prevVy = 0
  moveSpeed = 200
  moveDirection: 'down' | 'up' | 'left' | 'right' = 'down'
  isInteracting = false

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    texture: string,
    frame?: string | number,
  ) {
    super(scene, x, y, texture, frame)
  }

  // 방 참여
  joinRoom(roomNum: string) {
    const avatar = store.getState().avartar

    this.setNickname(avatar.nickname)
    this.setAvatarTexture(avatar.texture)
    this.ws.joinRoom({
      roomNum,
      nickname: avatar.nickname,
      texture: avatar.texture,
    })
  }

  // 인터렉션
  action(
    keySpace: Phaser.Input.Keyboard.Key,
    keyEscape: Phaser.Input.Keyboard.Key,
  ) {
    if (!this.selectedInteractionItem) return

    if (Phaser.Input.Keyboard.JustDown(keySpace)) {
      ;(this.selectedInteractionItem as any).do(this)

      this.isInteracting = true
    }

    if (Phaser.Input.Keyboard.JustDown(keyEscape)) {
      ;(this.selectedInteractionItem as any).undo(this)

      this.isInteracting = false
    }
  }

  // 플레이어,닉네임, 채팅 이동
  update(cursorsKeys: Phaser.Types.Input.Keyboard.CursorKeys, roomNum: string) {
    if (this.isInteracting) return this.setVelocity(0, 0)

    let vx = 0
    let vy = 0

    // 화살표 키 입력 감지 및 애니메이션 실행
    if (cursorsKeys?.left.isDown) {
      vx -= this.moveSpeed
      this.moveDirection = 'left'
    } else if (cursorsKeys.right.isDown) {
      vx += this.moveSpeed
      this.moveDirection = 'right'
    } else if (cursorsKeys.up.isDown) {
      vy -= this.moveSpeed
      this.moveDirection = 'up'
    } else if (cursorsKeys.down.isDown) {
      vy += this.moveSpeed
      this.moveDirection = 'down'
    }

    this.setVelocity(vx, vy)

    // 아바타가 움직이는지 확인하여 서버로 좌표를 전송
    if (this.body?.velocity.x !== 0 || this.body?.velocity.y !== 0) {
      this.play(`${this.avatarTexture}_run_${this.moveDirection}`, true)

      this.ws.sendAvatarPosition({
        x: this.x,
        y: this.y,
        roomNum,
        animation: this.anims.currentAnim!.key,
      })

      this.avatarContainer.setPosition(this.x, this.y - 35)
    } else {
      this.anims.play(`${this.avatarTexture}_stand_${this.moveDirection}`, true)
    }

    // 충돌 상태 해지
    if ((vx !== this.prevVx || vy !== this.prevVy) && !(vx === 0 && vy === 0)) {
      this.prevVx = vx
      this.prevVy = vy

      if (this.selectedInteractionItem) {
        this.selectedInteractionItem.clearInteractionBox()
        this.selectedInteractionItem = undefined
      }
    }
  }
}
