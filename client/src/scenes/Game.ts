import { createAvatarAnims } from '../anims/AvatarAnims'
import Player from '../avatars/Player'
import Secretary from '../items/Secretary'

export default class Game extends Phaser.Scene {
  private map!: Phaser.Tilemaps.Tilemap
  player: any

  constructor() {
    // Scene Key
    super('game')
  }

  // Scene이 로드되기 전에 호출, 사용할 에셋을 로드
  preload() {
    // Tiled로 생성된 JSON 형식의 타입맵을 로드
    this.load.tilemapTiledJSON('tilemap', 'assets/map/interverse.json')
    // 스프라이트 시트 이미지 파일을 로드
    this.load.spritesheet('floorAndWall', 'assets/builder/floorAndWall.png', {
      frameWidth: 32,
      frameHeight: 32,
    })
    this.load.spritesheet('office', 'assets/builder/office.png', {
      frameWidth: 32,
      frameHeight: 32,
    })
    this.load.spritesheet('classroom', 'assets/builder/classroom.png', {
      frameWidth: 32,
      frameHeight: 32,
    })
    this.load.spritesheet('chair', 'assets/builder/chair.png', {
      frameWidth: 32,
      frameHeight: 32,
    })

    this.load.spritesheet('adam', 'assets/character/adam.png', {
      frameWidth: 48,
      frameHeight: 96,
    })
    this.load.spritesheet('conference', 'assets/character/conference.png', {
      frameWidth: 32,
      frameHeight: 48,
    })
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
    const chairToDown = this.physics.add.staticGroup()
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

    // 플레이어 생성
    createAvatarAnims(this.anims)
    this.player = new Player(this, 500, 150, 'conference')
    this.player.setNickname('player')

    // Wall Layer
    const wallLayer = this.map.createLayer('Wall', FloorAndWall!)

    // interior Layer
    const interiorLayer = this.map.createLayer('Interior', [
      Office!,
      Classroom!,
    ])

    // ChairToUp Layer
    const chairToUp = this.physics.add.staticGroup()
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
      return obj
    })

    // Top Layer
    const topLayer = this.map.createLayer('Top', Office!)

    // 플레이어와 물체 간의 충돌처리
    if (this.player) {
      this.physics.add.collider(this.player.avatar, secretary)
      this.physics.add.collider(this.player.avatar, interiorOnCollide)
    }

    // 타일맵 레이어에서 특정 속성을 가진 타일들에 대해 충돌처리 활성화 (collide 속성을 가진 모들 타일에 충돌 활성화)
    this.physics.add.collider(groundLayer!, this.player.avatar)
    this.physics.add.collider(wallLayer!, this.player.avatar)
    this.physics.add.collider(topLayer!, this.player.avatar)
    groundLayer?.setCollisionByProperty({ collide: true })
    wallLayer?.setCollisionByProperty({ collide: true })

    topLayer?.setCollisionByProperty({ collide: true })

    // this.physics.add.overlap(
    //   this.player.avatar,
    //   [secretary],
    //   this.handlePlayerOverlap,
    //   undefined,
    //   this,
    // )
  }

  // handlePlayerOverlap(player: any, interactionItem: any) {
  //   interactionItem.onInteractionBox()
  // }

  // 주로 게임 상태를 업데이트하고 게임 객체들의 상태를 조작하는 데 사용. 게임이 실행되는 동안 지속적으로 호출됨
  update() {
    const cursorsKeys = this.input.keyboard?.createCursorKeys()
    this.player.update(cursorsKeys)
  }
}
