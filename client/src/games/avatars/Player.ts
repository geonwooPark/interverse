import Avatar from './Avatar'
import GameScene from '@games/scenes/Game'

export default class Player extends Avatar {
  private prevVx = 0
  private prevVy = 0
  private moveSpeed = 200
  private moveDirection: 'down' | 'up' | 'left' | 'right' = 'down'
  private isInteracting = false
  private stopTimeout: NodeJS.Timeout | null = null
  isEnabled: { video: boolean; audio: boolean } = {
    video: false,
    audio: false,
  }
  private _listeners = new Set<() => void>()

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    texture: string,
    frame?: string | number,
  ) {
    super(scene, x, y, texture, frame)
  }

  initialize({ nickname, texture }: { nickname: string; texture: string }) {
    this.setNickname(nickname)
    this.setAvatarTexture(texture)
  }

  subscribe(callback: () => void) {
    this._listeners.add(callback)

    return () => this._listeners.delete(callback)
  }

  toggleVideo() {
    this.isEnabled = { ...this.isEnabled, video: !this.isEnabled.video }
    this._listeners.forEach((cb) => cb())
  }

  toggleAudio() {
    this.isEnabled = { ...this.isEnabled, audio: !this.isEnabled.audio }
    this._listeners.forEach((cb) => cb())
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
  update(cursorsKeys: Phaser.Types.Input.Keyboard.CursorKeys) {
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

    const isMoving = this.body?.velocity.x !== 0 || this.body?.velocity.y !== 0

    if (isMoving) {
      const runAnims = `${this.avatarTexture}_run_${this.moveDirection}`

      this.play(runAnims, true)

      this.avatarContainer.setPosition(this.x, this.y - 35)
      ;(this.scene as GameScene).play.sendAvatarPosition({
        x: this.x,
        y: this.y,
        animation: this.anims.currentAnim!.key,
      })

      if (this.stopTimeout) {
        clearTimeout(this.stopTimeout)
        this.stopTimeout = null
      }
    } else {
      const standAnims = `${this.avatarTexture}_stand_${this.moveDirection}`

      this.anims.play(standAnims, true)

      if (!this.stopTimeout) {
        this.stopTimeout = setTimeout(() => {
          if (this.isInteracting) return
          ;(this.scene as GameScene).play.sendAvatarPosition({
            x: this.x,
            y: this.y,
            animation: standAnims,
            isLast: true,
          })
        }, 100)
      }
    }

    // 인터렉션 상태 해지
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
