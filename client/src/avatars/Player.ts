import Chair from '../items/Chair'
import {
  앉았다일어나기,
  sendAvatarPosition,
  sendChairId,
  sendPlayerInfo,
  sendPlayerInfoToNewPlayer,
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

export default class Player extends Avatar {
  isFrontOfCeoDesk = false
  isFrontOfInterviewDesk = false
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
              this.setVelocity(0, 0)
              this.setPosition(chair.x, chair.y + 5)
              this.avatarContainer.setPosition(this.x, this.y - 35)

              this.anims.play(
                `${this.avatarTexture}_sit_${chair.heading}`,
                true,
              )

              chair.clearInteractionBox()
              this.behavior = 'sit'

              // 소켓에 의자의 넘버를 보냄
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
          }
        }

        break
      case 'sit':
        // 의자에서 일어나기
        if (Phaser.Input.Keyboard.JustDown(keyEscape)) {
          const chair = this.selectedInteractionItem as Chair
          if (!this.selectedInteractionItem) return
          switch (this.selectedInteractionItem.itemType) {
            case 'chair':
              앉았다일어나기({
                roomNum,
                chairId: chair.id?.toString() || '',
              })
              break
          }
          switch (this.isFrontOfCeoDesk) {
            case true:
              store.dispatch(closeCreatorModal())
              break
          }
          switch (this.isFrontOfInterviewDesk) {
            case true:
              store.dispatch(showVideoModal(false))
              break
          }
          const animParts = this.anims.currentAnim!.key.split('_')
          animParts[1] = 'stand'
          this.anims.play(animParts.join('_'), true)
          this.behavior = 'stand'

          store.dispatch(closeAlert())
        }
        break
    }
    // 플레이어와 오브젝트 겹침이 끝날 시
    if (
      this.selectedInteractionItem &&
      !this.scene.physics.overlap(this, this.selectedInteractionItem)
    ) {
      switch (this.selectedInteractionItem.itemType) {
        case 'secretary':
          store.dispatch(closeManualModal())
          break
        case 'printer':
          store.dispatch(closeSurveyModal())
          break
      }
      switch (this.isFrontOfCeoDesk) {
        case true:
          this.isFrontOfCeoDesk = false
          break
      }
      switch (this.isFrontOfInterviewDesk) {
        case true:
          this.isFrontOfInterviewDesk = false
          break
      }
      this.selectedInteractionItem.clearInteractionBox()
      this.selectedInteractionItem = undefined
    }
  }
}
