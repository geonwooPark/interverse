import { createAvatarAnims } from '../anims/AvatarAnims'
import Player from '../avatars/Player'

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
    this.load.spritesheet('conferenceHall', 'assets/builder/conference.png', {
      frameWidth: 32,
      frameHeight: 32,
    })
    this.load.spritesheet('livingRoom', 'assets/builder/livingRoom.png', {
      frameWidth: 32,
      frameHeight: 32,
    })
    this.load.spritesheet('bedroom', 'assets/builder/bedroom.png', {
      frameWidth: 32,
      frameHeight: 32,
    })
    this.load.spritesheet('halloween', 'assets/builder/halloween.png', {
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
    const LivingRoom = this.map.addTilesetImage('livingRoom', 'livingRoom')
    const Classroom = this.map.addTilesetImage('classroom', 'classroom')
    const Bedroom = this.map.addTilesetImage('bedroom', 'bedroom')
    const Halloween = this.map.addTilesetImage('halloween', 'halloween')
    const ConferenceHall = this.map.addTilesetImage(
      'conferenceHall',
      'conferenceHall',
    )

    // 레이어 추가
    this.map.createLayer('Ground', FloorAndWall!)
    const wallLayer = this.map.createLayer('Wall', FloorAndWall!)
    const interiorLayer = this.map.createLayer('Interior', [
      Office!,
      LivingRoom!,
      Classroom!,
      Bedroom!,
    ])
    const itemLayer = this.map.createLayer('Item', [Office!, Halloween!])

    // // 의자 관련
    // const chairs = this.physics.add.staticGroup()
    // // getObjectLayer - Tiled 맵에서 오브젝트 레이어를 가져오는 메서드
    // const chairLayer = this.map.getObjectLayer('Chair')
    // // chair레이어의 오브젝트를 반복하여 방향 속성을 가져옴
    // chairLayer?.objects.forEach((chairObj) => {
    //   const item = this.addObjectFromTiled(chairs, chairObj, 'chair', 'chair')
    //   item.itemDirection = chairObj.properties[0].value

    //   console.log(item)
    // })

    // 비서 관련
    const secretary = this.physics.add.staticGroup()
    // getObjectLayer - Tiled 맵에서 오브젝트 레이어를 가져오는 메서드
    const secretaryLayer = this.map.getObjectLayer('Secretary')
    secretaryLayer?.objects.forEach((secretaryObj) => {
      const item = this.addObjectFromTiled(
        secretary,
        secretaryObj,
        'secretary',
        'secretary',
      )
    })

    // 타일맵 레이어에서 특정 속성을 가진 타일들에 대해 충돌처리 활성화 (collide 속성을 가진 모들 타일에 충돌 활성화)
    wallLayer?.setCollisionByProperty({ collide: true })

    // 애니메이션 추가
    createAvatarAnims(this.anims)
    // 아바타 생성
    this.player = new Player(this, 500, 150, 'conference')
    this.player.setNickname('player')
    this.physics.add.collider(wallLayer!, this.player)
  }

  private addObjectFromTiled(
    group: Phaser.Physics.Arcade.StaticGroup,
    object: Phaser.Types.Tilemaps.TiledObject,
    key: string,
    tilesetName: string,
  ) {
    const firstgid = this.map.getTileset(tilesetName)?.firstgid
    const actualX = object.x! + object.width! * 0.5
    const actualY = object.y! - object.height! * 0.5
    const obj = group
      .get(actualX, actualY, key, object.gid! - firstgid!)
      .setDepth(actualY)
    return obj
  }

  // 주로 게임 상태를 업데이트하고 게임 객체들의 상태를 조작하는 데 사용. 게임이 실행되는 동안 지속적으로 호출됨
  update() {
    const cursorsKeys = this.input.keyboard?.createCursorKeys()
    this.player.update(cursorsKeys)
  }
}
