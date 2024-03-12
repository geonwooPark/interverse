import { createAvatarAnims } from '../anims/AvatarAnims'
import OtherPlayer from '../avatars/OtherPlayer'
import Player from '../avatars/Player'
import Chair from '../items/Chair'
import Printer from '../items/Printer'
import Secretary from '../items/Secretary'
import WaterPurifier from '../items/WaterPurifier'
import { joinRoom } from '../lib/ws'
import { ClientJoinRoom, ServerAvatarPosition } from '../../../types/socket'
import { AddOtherPlayerType, DisplayOtherPlayerChatType } from '../types/client'

export default class Game extends Phaser.Scene {
  private map!: Phaser.Tilemaps.Tilemap
  private otherPlayers!: Phaser.Physics.Arcade.Group
  private otherPlayersMap = new Map<string, OtherPlayer>()
  cursur?: Phaser.Types.Input.Keyboard.CursorKeys
  keySpace?: Phaser.Input.Keyboard.Key
  keyEscape?: Phaser.Input.Keyboard.Key
  player!: Player
  roomNum!: string
  isCreate = false

  constructor() {
    // Scene Key
    super('game')
  }

  setUpKeys() {
    this.cursur = this.input.keyboard?.createCursorKeys()
    this.keySpace = this.input.keyboard?.addKey('space')
    this.keyEscape = this.input.keyboard?.addKey(
      Phaser.Input.Keyboard.KeyCodes.ESC,
    )
    if (this.input.keyboard) {
      this.input.keyboard.disableGlobalCapture()
      this.input.keyboard.on('keydown-ENTER', () => {
        this.cursur?.left.reset()
        this.cursur?.right.reset()
        this.cursur?.up.reset()
        this.cursur?.down.reset()
        this.events.emit('onFocusChat')
      })
    }
  }

  enalbeKeys() {
    if (!this.input.keyboard) return
    this.input.keyboard.enabled = true
  }

  disableKeys() {
    if (!this.input.keyboard) return
    this.input.keyboard.enabled = false
  }

  // Scene이 로드될 때 한번 호출, 게임 오브젝트 배치
  create() {
    // 타일맵 로드
    this.map = this.make.tilemap({ key: 'tilemap' })
    // 타일셋 이미지를 로드하여 타일맵에 추가
    const FloorAndWall = this.map.addTilesetImage(
      'floorAndWall',
      'floorAndWall',
    )
    const Office = this.map.addTilesetImage('office', 'office')
    const Classroom = this.map.addTilesetImage('classroom', 'classroom')

    // Ground Layer
    const groundLayer = this.map.createLayer('Ground', FloorAndWall!)

    // Secretary Layer
    const secretary = this.physics.add.staticGroup({ classType: Secretary })
    const secretaryLayer = this.map.getObjectLayer('Secretary')
    secretaryLayer?.objects.forEach((object) => {
      const firstgid = this.map.getTileset('classroom')?.firstgid
      const actualX = object.x! + object.width! * 0.5
      const actualY = object.y! - object.height! * 0.5
      const obj = secretary.get(
        actualX,
        actualY,
        'classroom',
        object.gid! - firstgid!,
      )
      return obj as Secretary
    })

    // ChairToDown Layer
    const chairToDown = this.physics.add.staticGroup({ classType: Chair })
    const chairToDownLayer = this.map.getObjectLayer('ChairToDown')
    chairToDownLayer?.objects.forEach((object) => {
      const firstgid = this.map.getTileset('chair')?.firstgid
      const actualX = object.x! + object.width! * 0.5
      const actualY = object.y! - object.height! * 0.5
      const obj = chairToDown.get(
        actualX,
        actualY,
        'chair',
        object.gid! - firstgid!,
      )
      obj.heading = 'down'
      obj.interaction = object.properties[0].value
      return obj
    })

    // WaterPurifier Layer
    const waterPurifier = this.physics.add.staticGroup({
      classType: WaterPurifier,
    })
    const waterPurifierLayer = this.map.getObjectLayer('WaterPurifier')
    waterPurifierLayer?.objects.forEach((object) => {
      const firstgid = this.map.getTileset('office')?.firstgid
      const actualX = object.x! + object.width! * 0.5
      const actualY = object.y! - object.height! * 0.5
      const obj = waterPurifier.get(
        actualX,
        actualY,
        'office',
        object.gid! - firstgid!,
      )
      return obj as WaterPurifier
    })

    // Printer Layer
    const printer = this.physics.add.staticGroup({ classType: Printer })
    const printerLayer = this.map.getObjectLayer('Printer')
    printerLayer?.objects.forEach((object) => {
      const firstgid = this.map.getTileset('office')?.firstgid
      const actualX = object.x! + object.width! * 0.5
      const actualY = object.y! - object.height! * 0.5
      const obj = printer.get(
        actualX,
        actualY,
        'office',
        object.gid! - firstgid!,
      )
      return obj as Printer
    })

    // interiorOnCollide Layer
    const interiorOnCollide = this.physics.add.staticGroup()
    const interiorOnCollideLayer = this.map.getObjectLayer('InteriorOnCollide')
    interiorOnCollideLayer?.objects.forEach((object) => {
      const firstgid = this.map.getTileset('office')?.firstgid
      const actualX = object.x! + object.width! * 0.5
      const actualY = object.y! - object.height! * 0.5
      const obj = interiorOnCollide.get(
        actualX,
        actualY,
        'office',
        object.gid! - firstgid!,
      )
      return obj
    })

    // OtherPlayers Layer
    this.otherPlayers = this.physics.add.group({ classType: OtherPlayer })
    // this.otherPlayers.setDepth(0)

    // Player Layer
    // 플레이어 생성
    createAvatarAnims(this.anims)
    this.player = new Player(this, 730, 160, 'conference')
    this.add.existing(this.player)

    // Camera Setting
    this.cameras.main.zoom = 1.4
    this.cameras.main.startFollow(this.player, true)

    // Wall Layer
    const wallLayer = this.map.createLayer('Wall', FloorAndWall!)
    wallLayer?.setDepth(2000)

    // interior Layer
    const interiorLayer = this.map.createLayer('Interior', [
      Office!,
      Classroom!,
    ])
    interiorLayer?.setDepth(2000)

    // ChairToUp Layer
    const chairToUp = this.physics.add.staticGroup({ classType: Chair })
    const chairToUpLayer = this.map.getObjectLayer('ChairToUp')
    chairToUpLayer?.objects.forEach((object) => {
      const firstgid = this.map.getTileset('chair')?.firstgid
      const actualX = object.x! + object.width! * 0.5
      const actualY = object.y! - object.height! * 0.5
      const obj = chairToUp.get(
        actualX,
        actualY,
        'chair',
        object.gid! - firstgid!,
      )
      obj.heading = 'up'
      obj.interaction = object.properties[0].value
      obj.setDepth(2000)
      return obj
    })

    // Top Layer
    const topLayer = this.map.createLayer('Top', Office!)
    topLayer?.setDepth(2000)

    // 플레이어와 물체 간의 충돌처리
    if (this.player) {
      // this.physics.add.collider(this.player.avatar, secretary)
      this.physics.add.collider(this.player, interiorOnCollide)
    }

    // 타일맵 레이어에서 특정 속성을 가진 타일들에 대해 충돌처리 활성화 (collide 속성을 가진 모들 타일에 충돌 활성화)
    this.physics.add.collider(groundLayer!, this.player)
    this.physics.add.collider(wallLayer!, this.player)
    this.physics.add.collider(topLayer!, this.player)
    groundLayer?.setCollisionByProperty({ collide: true })
    wallLayer?.setCollisionByProperty({ collide: true })
    topLayer?.setCollisionByProperty({ collide: true })
    // 플레이어와 오브젝트 겹침 감지
    this.physics.add.overlap(
      this.player,
      [secretary, chairToDown, chairToUp, waterPurifier, printer],
      this.handlePlayerOverlap,
      undefined,
      this,
    )

    this.events.once('update', () => {
      this.isCreate = true
      this.events.emit('createGame', this.isCreate)
    })
  }
  /** 플레이어와 오브젝트가 겹쳤을때 발생하는 콜백 함수 */
  private handlePlayerOverlap(player: any, interactionItem: any) {
    if (
      this.player.behavior === 'sit' &&
      interactionItem.interaction === 'menual'
    ) {
      player.isFrontOfCeoDesk = true
    } else if (
      this.player.behavior === 'sit' &&
      interactionItem.interaction === 'interview'
    ) {
      player.isFrontOfInterviewDesk = true
    }

    if (this.player.selectedInteractionItem) return

    player.selectedInteractionItem = interactionItem
    interactionItem.onInteractionBox()
  }

  /** 방에 입장 */
  joinRoom({ roomNum, authCookie }: ClientJoinRoom) {
    if (!this.player) return

    joinRoom({ roomNum, authCookie })
    this.player.setNickname(authCookie.nickName)
    this.player.setAvatarTexture(authCookie.texture)
    this.player.sendPlayerInfo(roomNum)
    this.roomNum = roomNum

    this.setUpKeys()
  }

  /** 다른 플레이어 입장 */
  addOtherPlayer({
    x,
    y,
    nickName,
    texture,
    animation,
    socketId,
  }: AddOtherPlayerType) {
    if (!socketId) return

    const newPlayer = new OtherPlayer(this, x, y, texture, nickName)
    newPlayer.anims.play(animation || `${texture}_stand_down`, true)
    newPlayer.setDepth(900)
    this.add.existing(newPlayer)

    this.otherPlayers.add(newPlayer)
    this.otherPlayersMap.set(socketId, newPlayer)
  }

  /** 다른 플레이어 퇴장 */
  removeOtherPlayer(socketId: string) {
    if (!socketId) return
    const otherPlayer = this.otherPlayersMap.get(socketId)

    if (!this.otherPlayersMap.has(socketId)) return
    if (!otherPlayer) return

    this.otherPlayers.remove(otherPlayer, true, true)
    this.otherPlayersMap.delete(socketId)
  }

  /** 다른 유저들 위치 정보 업데이트 */
  updateOtherPlayer({ x, y, socketId, animation }: ServerAvatarPosition) {
    const otherPlayer = this.otherPlayersMap.get(socketId)
    if (!otherPlayer) return
    otherPlayer?.updatePosition({ x, y, animation })
  }

  /** 다른 유저 채팅을 화면에 표시  */
  displayOtherPlayerChat({ message, socketId }: DisplayOtherPlayerChatType) {
    const otherPlayer = this.otherPlayersMap.get(socketId)
    otherPlayer?.updateChat(message)
  }

  // 주로 게임 상태를 업데이트하고 게임 객체들의 상태를 조작하는 데 사용. 게임이 실행되는 동안 지속적으로 호출됨
  update() {
    if (
      this.player &&
      this.cursur &&
      this.keySpace &&
      this.keyEscape &&
      this.roomNum
    ) {
      this.player.update(
        this.cursur,
        this.keySpace,
        this.keyEscape,
        this.roomNum,
      )
    }
  }
}
