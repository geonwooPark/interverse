import Chair from '../items/Chair'
import {
  sendAvatarPosition,
  sendPlayerInfo,
  sendPlayerInfoToNewPlayer,
} from '../lib/ws'
import {
  closeCreatorModal,
  openCreatorModal,
} from '../store/features/creatorModalDisplaySlice'
import { store } from '../store/store'
import Avatar from './Avatar'

export default class Player extends Avatar {
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
      roomNum,
      newPlayerId,
    })
  }

  // 플레이어,닉네임 및 채팅 이동
  update(
    cursorsKeys: Phaser.Types.Input.Keyboard.CursorKeys,
    keySpace: Phaser.Input.Keyboard.Key,
    roomNum: string,
  ) {
    const avatarContainerBody = this.avatarContainer
      .body as Phaser.Physics.Arcade.Body
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
              break
            case 'secretary':
              store.dispatch(openCreatorModal())
          }
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
          const animParts = this.anims.currentAnim!.key.split('_')
          animParts[1] = 'stand'
          this.anims.play(animParts.join('_'), true)
          this.behavior = 'stand'
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
          store.dispatch(closeCreatorModal())
      }
      this.selectedInteractionItem.clearInteractionBox()
      this.selectedInteractionItem = undefined
    }
  }
}
