import { createAvatarAnims } from '../anims/AvatarAnims'
import OtherPlayer from '../avatars/OtherPlayer'
import Player from '../avatars/Player'
import Chair from '../items/Chair'
import Printer from '../items/Printer'
import Secretary from '../items/Secretary'
import WaterPurifier from '../items/WaterPurifier'

export default class Game extends Phaser.Scene {
  private map!: Phaser.Tilemaps.Tilemap
  player: any
  cursur?: Phaser.Types.Input.Keyboard.CursorKeys
  keySpace?: Phaser.Input.Keyboard.Key
  private otherPlayers!: Phaser.Physics.Arcade.Group

  constructor() {
    // Scene Key
    super('game')
  }

  setupKeys() {
    this.cursur = this.input.keyboard?.createCursorKeys()
    this.keySpace = this.input.keyboard?.addKey('space')
  }

  // Scene이 로드될 때 한번 호출, 게임 오브젝트 배치
  create(data: { nickName: string }) {
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

    // CeoDesk Layer
    const ceoDesk = this.physics.add.staticGroup()
    const ceoDeskLayer = this.map.getObjectLayer('CeoDesk')
    ceoDeskLayer?.objects.forEach((object) => {
      const firstgid = this.map.getTileset('office')?.firstgid
      const actualX = object.x! + object.width! * 0.5
      const actualY = object.y! - object.height! * 0.5
      const obj = ceoDesk.get(
        actualX,
        actualY,
        'office',
        object.gid! - firstgid!,
      )
      return obj
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

    // Player Layer
    createAvatarAnims(this.anims)
    this.player = new Player(this, 730, 160, 'conference')
    this.player.setNickname(data.nickName)

    // OtherPlayers Layer
    this.otherPlayers = this.physics.add.group({ classType: OtherPlayer })

    // Camera Setting
    this.cameras.main.zoom = 1.5
    this.cameras.main.startFollow(this.player.avatar, true)

    // Wall Layer
    const wallLayer = this.map.createLayer('Wall', FloorAndWall!)

    // interior Layer
    const interiorLayer = this.map.createLayer('Interior', [
      Office!,
      Classroom!,
    ])

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
      return obj
    })

    // Top Layer
    const topLayer = this.map.createLayer('Top', Office!)

    // 플레이어와 물체 간의 충돌처리
    if (this.player) {
      // this.physics.add.collider(this.player.avatar, secretary)
      this.physics.add.collider(this.player.avatar, interiorOnCollide)
      this.physics.add.collider(this.player.avatar, ceoDesk)
    }

    // 타일맵 레이어에서 특정 속성을 가진 타일들에 대해 충돌처리 활성화 (collide 속성을 가진 모들 타일에 충돌 활성화)
    this.physics.add.collider(groundLayer!, this.player.avatar)
    this.physics.add.collider(wallLayer!, this.player.avatar)
    this.physics.add.collider(topLayer!, this.player.avatar)
    groundLayer?.setCollisionByProperty({ collide: true })
    wallLayer?.setCollisionByProperty({ collide: true })
    topLayer?.setCollisionByProperty({ collide: true })
    // 플레이어와 오브젝트 겹침 감지
    this.physics.add.overlap(
      this.player.avatar,
      [secretary, chairToDown, chairToUp, waterPurifier, printer],
      this.handlePlayerOverlap,
      undefined,
      this,
    )

    // create 될 때 OtherPlayers 오브젝트 그룹과 addOtherPlayer 함수를 등록
    // Room에서 users의 변경이 생길 때 addOtherPlayer가 실행되어 OtherPlayers 그룹에 새로운 유저 추가
    // OtherUser는 각각의 위치, 아이디, 이미지를 가져야함
  }
  // 플레이어와 오브젝트가 겹쳤을때 발생하는 콜백 함수
  private handlePlayerOverlap(player: any, interactionItem: any) {
    if (this.player.selectedInteractionItem) return
    this.player.selectedInteractionItem = interactionItem
    interactionItem.onInteractionBox()
  }

  // 다른 플레이어가 참가
  addOtherPlayer() {
    const newPlayer = new OtherPlayer(this, 730, 160, 'conference')
    console.log(this.otherPlayers)
    this.otherPlayers.add(newPlayer.avatar)
    console.log('안녕')
  }

  // 주로 게임 상태를 업데이트하고 게임 객체들의 상태를 조작하는 데 사용. 게임이 실행되는 동안 지속적으로 호출됨
  update() {
    if (this.cursur && this.keySpace) {
      this.player.update(this.cursur, this.keySpace)
    }
  }
}
