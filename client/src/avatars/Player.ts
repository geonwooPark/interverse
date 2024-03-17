import Chair from '../items/Chair'
import {
  occupiedChairs,
  sendAvatarPosition,
  sendChairId,
  sendPlayerInfo,
  sendPlayerInfoToNewPlayer,
  socket,
} from '../lib/ws'
import {
  changeAlertContent,
  closeAlert,
  openAlert,
} from '../store/features/alertSlice'
import {
  closeCreatorModal,
  openCreatorModal,
} from '../store/features/creatorModalSlice'
import {
  closeManualModal,
  openManualModal,
} from '../store/features/manualModalSlice'
import {
  closeSurveyModal,
  openSurveyModal,
} from '../store/features/surveyModalSlice'
import { showVideoModal } from '../store/features/videoModalSlice'
import { store } from '../store/store'
import Avatar from './Avatar'
import { peer as me } from '../lib/peer'
import { handleScreenSharing } from '../store/features/myStreamSlice'

export default class Player extends Avatar {
  isCollide = false
  prevVx = 0
  prevVy = 0
  preX = 0
  preY = 0
  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    texture: string,
    frame?: string | number,
  ) {
    super(scene, x, y, texture, frame)
  }

  // 서버로 나의 아바타 정보 전달
  sendPlayerInfo(roomNum: string) {
    sendPlayerInfo({
      x: this.x,
      y: this.y,
      nickName: this.nickname.text,
      texture: this.avatarTexture,
      roomNum,
    })
  }
  // 새로운 유저에세 나의 아바타 정보 전달
  sendPlayerInfoToNewPlayer({
    roomNum,
    newPlayerId,
  }: {
    roomNum: string
    newPlayerId: string
  }) {
    sendPlayerInfoToNewPlayer({
      x: this.x,
      y: this.y,
      nickName: this.nickname.text,
      texture: this.avatarTexture,
      animation: this.anims.currentAnim!.key,
      roomNum,
      newPlayerId,
    })
  }

  // 플레이어,닉네임 및 채팅 이동
  update(
    cursorsKeys: Phaser.Types.Input.Keyboard.CursorKeys,
    keySpace: Phaser.Input.Keyboard.Key,
    keyEscape: Phaser.Input.Keyboard.Key,
    roomNum: string,
  ) {
    const moveSpeed = 200
    let vx = 0
    let vy = 0

    switch (this.behavior) {
      case 'stand':
        // 화살표 키 입력 감지 및 애니메이션 실행

        if (cursorsKeys?.left.isDown) {
          vx -= moveSpeed
        } else if (cursorsKeys.right.isDown) {
          vx += moveSpeed
        } else if (cursorsKeys.up.isDown) {
          vy -= moveSpeed
        } else if (cursorsKeys.down.isDown) {
          vy += moveSpeed
        }

        if (vx > 0) {
          this.play(`${this.avatarTexture}_run_right`, true)
        } else if (vx < 0) {
          this.play(`${this.avatarTexture}_run_left`, true)
        } else if (vy > 0) {
          this.play(`${this.avatarTexture}_run_down`, true)
        } else if (vy < 0) {
          this.play(`${this.avatarTexture}_run_up`, true)
        } else {
          // 이동 후 정지상태 애니메이션 실행
          const animParts = this.anims.currentAnim!.key.split('_')
          animParts[1] = 'stand'
          this.anims.play(animParts.join('_'), true)
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

        sendAvatarPosition({
          x: this.x,
          y: this.y,
          roomNum,
          animation: this.anims.currentAnim!.key,
        })

        // 의자에 앉기
        if (Phaser.Input.Keyboard.JustDown(keySpace)) {
          if (!this.selectedInteractionItem) return
          const chair = this.selectedInteractionItem as Chair

          switch (this.selectedInteractionItem.itemType) {
            case 'chair':
              if (occupiedChairs.includes(chair.id.toString())) return
              this.preX = this.x
              this.preY = this.y
              this.setVelocity(0, 0)
              this.setPosition(chair.x, chair.y + 5)
              this.avatarContainer.setPosition(this.x, this.y - 35)

              this.anims.play(
                `${this.avatarTexture}_sit_${chair.heading}`,
                true,
              )

              chair.clearInteractionBox()
              this.behavior = 'sit'

              // 의자에 앉으면 서버로 의자의 넘버를 보냄
              sendChairId({
                roomNum,
                chairId: chair.id?.toString() || '',
              })

              sendAvatarPosition({
                x: this.x,
                y: this.y,
                roomNum,
                animation: this.anims.currentAnim!.key,
              })

              if (chair.interaction === 'menual') {
                store.dispatch(openCreatorModal())
                store.dispatch(
                  changeAlertContent(
                    'ESC 키를 눌러 게임으로 돌아갈 수 있습니다.',
                  ),
                )
              } else if (chair.interaction === 'interview') {
                if (me.disconnected) {
                  me.reconnect()
                }
                store.dispatch(showVideoModal(true))
                store.dispatch(
                  changeAlertContent(
                    'ESC 키를 눌러 화면공유를 중지할 수 있습니다.',
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
              break
            case 'secretary':
              store.dispatch(openManualModal())
              store.dispatch(closeAlert())
              break
            case 'printer':
              store.dispatch(openSurveyModal())
              store.dispatch(closeAlert())
              break
            case 'screenBoard':
              this.anims.play(`${this.avatarTexture}_stand_down`, true)
              this.behavior = 'share'

              sendAvatarPosition({
                x: this.x,
                y: this.y,
                roomNum,
                animation: this.anims.currentAnim!.key,
              })

              if (me.disconnected) {
                me.reconnect()
              }
              store.dispatch(showVideoModal(true))
              store.dispatch(handleScreenSharing(true))
              store.dispatch(
                changeAlertContent(
                  'ESC 키를 눌러 화면공유를 중지할 수 있습니다.',
                ),
              )
              break
          }
        }

        break
      case 'sit':
        // 의자에서 일어나기
        if (Phaser.Input.Keyboard.JustDown(keyEscape)) {
          const chair = this.selectedInteractionItem as Chair
          if (!this.selectedInteractionItem) return

          sendChairId({
            roomNum,
            chairId: chair.id?.toString() || '',
          })

          if (chair.interaction === 'menual') {
            store.dispatch(closeCreatorModal())
          }
          if (chair.interaction === 'interview') {
            socket.emit('clientLeaveVideoRoom', roomNum)
          }

          this.setPosition(this.preX, this.preY)
          const animParts = this.anims.currentAnim!.key.split('_')
          animParts[1] = 'stand'
          this.anims.play(animParts.join('_'), true)
          this.behavior = 'stand'
          this.setDepth(1000)

          store.dispatch(closeAlert())
        }
        break
      case 'share':
        if (Phaser.Input.Keyboard.JustDown(keyEscape)) {
          if (!this.selectedInteractionItem) return
          this.behavior = 'stand'
          socket.emit('clientLeaveVideoRoom', roomNum)
        }
        break
    }

    if (
      this.selectedInteractionItem &&
      !this.isCollide
      // !this.scene.physics.overlap(this, this.selectedInteractionItem)
    ) {
      // 플레이어와 오브젝트 겹침이 끝날 시
      switch (this.selectedInteractionItem.itemType) {
        case 'secretary':
          store.dispatch(closeManualModal())
          break
        case 'printer':
          store.dispatch(closeSurveyModal())
          break
      }

      this.selectedInteractionItem.clearInteractionBox()
      this.selectedInteractionItem = undefined
    }
  }
}
