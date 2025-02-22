import Chair from '../items/Chair'
import { changeAlertContent, openAlert } from '../../store/features/alertSlice'
import { store } from '../../store/store'
import Avatar from './Avatar'
import { handleScreenSharing } from '../../store/features/myStreamSlice'
import { handleModals } from '../../store/features/modalsSlice'

export default class Player extends Avatar {
  isCollide = false
  prevVx = 0
  prevVy = 0
  preX = 0
  preY = 0
  moveSpeed = 200
  moveDirection: 'down' | 'up' | 'left' | 'right' = 'down'

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    texture: string,
    frame?: string | number,
  ) {
    super(scene, x, y, texture, frame)
  }

  // 플레이어,닉네임 및 채팅 이동
  update(
    cursorsKeys: Phaser.Types.Input.Keyboard.CursorKeys,
    keySpace: Phaser.Input.Keyboard.Key,
    keyEscape: Phaser.Input.Keyboard.Key,
    roomNum: string,
  ) {
    let vx = 0
    let vy = 0

    switch (this.interaction) {
      case 'inactive':
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

        // 아바타가 움직이는지 확인하여 애니메이션을 결정
        if (this.body?.velocity.x !== 0 || this.body?.velocity.y !== 0) {
          this.play(`${this.avatarTexture}_run_${this.moveDirection}`, true)
        } else {
          this.anims.play(
            `${this.avatarTexture}_stand_${this.moveDirection}`,
            true,
          )
        }

        // 플레이어 이동
        this.setVelocity(vx, vy)
        this.avatarContainer.setPosition(this.x, this.y - 35)

        // 충돌 상태 해지
        if (
          (vx !== this.prevVx || vy !== this.prevVy) &&
          !(vx === 0 && vy === 0)
        ) {
          this.isCollide = false
          this.prevVx = vx
          this.prevVy = vy
        }

        if (Phaser.Input.Keyboard.JustDown(keySpace)) {
          if (!this.selectedInteractionItem) return
          const chair =
            this.selectedInteractionItem.itemType === 'chair'
              ? (this.selectedInteractionItem as Chair)
              : undefined
          this.preX = this.x
          this.preY = this.y

          switch (this.selectedInteractionItem.itemType) {
            case 'chair':
              if (!chair) return
              // if (this.ws.occupiedChairs.has(chair.id.toString())) return

              this.setVelocity(0, 0)
              this.setPosition(chair.x, chair.y + 5)
              this.avatarContainer.setPosition(this.x, this.y - 35)

              this.anims.play(
                `${this.avatarTexture}_sit_${chair.heading}`,
                true,
              )

              // 의자에 앉으면 서버로 의자의 넘버를 보냄
              this.ws.sendChairId({
                roomNum,
                chairId: chair.id?.toString() || '',
              })

              this.ws.sendAvatarPosition({
                x: this.x,
                y: this.y,
                roomNum,
                animation: this.anims.currentAnim!.key,
              })

              if (chair.interaction === 'menual') {
                store.dispatch(handleModals('creator'))
                store.dispatch(
                  changeAlertContent(
                    'ESC 키를 눌러 게임으로 돌아갈 수 있습니다.',
                  ),
                )
              } else if (chair.interaction === 'interview') {
                store.dispatch(handleModals('video'))
                store.dispatch(
                  changeAlertContent(
                    'ESC 키를 눌러 화상통화를 중지할 수 있습니다.',
                  ),
                )
              } else {
                store.dispatch(
                  changeAlertContent(
                    'ESC 키를 눌러 의자에서 일어날 수 있습니다.',
                  ),
                )
              }
              store.dispatch(openAlert())
              this.selectedInteractionItem.itemType = 'chair'
              break
            case 'secretary':
              store.dispatch(handleModals('manual'))
              store.dispatch(
                changeAlertContent(
                  'ESC 키를 눌러 게임으로 돌아갈 수 있습니다.',
                ),
              )
              this.selectedInteractionItem.itemType = 'secretary'
              break
            case 'printer':
              store.dispatch(handleModals('survey'))
              store.dispatch(
                changeAlertContent(
                  'ESC 키를 눌러 게임으로 돌아갈 수 있습니다.',
                ),
              )
              this.selectedInteractionItem.itemType = 'printer'
              break
            case 'screenBoard':
              this.anims.play(`${this.avatarTexture}_stand_down`, true)

              this.ws.sendAvatarPosition({
                x: this.x,
                y: this.y,
                roomNum,
                animation: this.anims.currentAnim!.key,
              })

              store.dispatch(handleModals('video'))
              store.dispatch(handleScreenSharing(true))
              store.dispatch(
                changeAlertContent(
                  'ESC 키를 눌러 화면공유를 중지할 수 있습니다.',
                ),
              )
              this.selectedInteractionItem.itemType = 'screenBoard'
              break
          }

          if (this.selectedInteractionItem.itemType !== 'waterPurifier') {
            this.interaction = 'active'
          }
        }
        break

      case 'active':
        if (Phaser.Input.Keyboard.JustDown(keyEscape)) {
          if (!this.selectedInteractionItem) return
          const chair =
            this.selectedInteractionItem.itemType === 'chair'
              ? (this.selectedInteractionItem as Chair)
              : undefined

          switch (this.selectedInteractionItem.itemType) {
            case 'chair':
              if (!chair) return

              this.ws.sendChairId({
                roomNum,
                chairId: chair.id?.toString() || '',
              })
              if (chair.interaction === 'menual') {
                store.dispatch(handleModals('creator'))
              }
              if (chair.interaction === 'interview') {
                this.ws.leaveVideoRoom()
              }
              this.setPosition(this.preX, this.preY)

              break
            case 'secretary':
              store.dispatch(handleModals('manual'))
              break
            case 'printer':
              store.dispatch(handleModals('survey'))
              break
            case 'screenBoard':
              this.ws.leaveVideoRoom()
          }

          this.interaction = 'inactive'
        }
        break
    }

    // 오브젝트와 충돌이 해제되면 Alert 제거
    if (this.selectedInteractionItem && !this.isCollide) {
      this.selectedInteractionItem.clearInteractionBox()
      this.selectedInteractionItem = undefined
    }

    // 실시간으로 나의 위치 전송
    this.ws.sendAvatarPosition({
      x: this.x,
      y: this.y,
      roomNum,
      animation: this.anims.currentAnim!.key,
    })
  }
}
