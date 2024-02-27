import { createAvatarAnims } from '../anims/AvatarAnims'

export default class Game extends Phaser.Scene {
  private map!: Phaser.Tilemaps.Tilemap
  private player: any
  cursors: any

  constructor() {
    // Scene Key
    super('game')
  }

  // Scene이 로드되기 전에 호출, 사용할 에셋을 로드
  preload() {
    // Tiled로 생성된 JSON 형식의 타입맵을 로드
    this.load.tilemapTiledJSON('tilemap', 'assets/map/map.json')
    // 스프라이트 시트 이미지 파일을 로드
    this.load.spritesheet('tiles_wall', 'assets/tile/floorAndWall.png', {
      frameWidth: 32,
      frameHeight: 32,
    })
    this.load.spritesheet('chair', 'assets/object/chair.png', {
      frameWidth: 32,
      frameHeight: 64,
    })
    this.load.spritesheet('secretary', 'assets/object/secretary.png', {
      frameWidth: 64,
      frameHeight: 32,
    })
    this.load.spritesheet('interior', 'assets/tile/interior.png', {
      frameWidth: 32,
      frameHeight: 32,
    })
    this.load.spritesheet('office', 'assets/tile/office.png', {
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
    const FloorAndWall = this.map.addTilesetImage('floorAndWall', 'tiles_wall')
    // 레이어 추가
    const floorLayer = this.map.createLayer('Ground', FloorAndWall)
    // 타일맵 레이어에서 특정 속성을 가진 타일들에 대해 충돌처리 활성화 (collides 속성을 가진 모들 타일에 충돌 활성화)
    this.map.setCollisionByProperty({ collides: true })
    floorLayer?.setCollisionByProperty({ collides: true })
    // 플레이어 생성
    this.player = this.physics.add.sprite(100, 100, 'conference')
    // 플레이어와 레이어 충돌 방지
    this.physics.add.collider(floorLayer!, this.player)
    // 애니메이션 추가
    createAvatarAnims(this.anims)
    // 첫 랜더링시 플레이어 애니메이션 적용
    this.player.anims.play('conference_stand_down', true)
  }

  // 주로 게임 상태를 업데이트하고 게임 객체들의 상태를 조작하는 데 사용. 게임이 실행되는 동안 지속적으로 호출됨
  update() {
    this.cursors = this.input.keyboard?.createCursorKeys()
    const cursorsKeys = this.input.keyboard?.createCursorKeys()
    const moveSpeed = 200
    let vx = 0
    let vy = 0
    // 화살표 키 입력 감지 및 애니메이션 실행
    if (cursorsKeys?.left.isDown) {
      vx -= moveSpeed
      this.player.anims.play('conference_run_left', true)
    } else if (cursorsKeys?.right.isDown) {
      vx += moveSpeed
      this.player.anims.play('conference_run_right', true)
    } else if (cursorsKeys?.up.isDown) {
      vy -= moveSpeed
      this.player.anims.play('conference_run_up', true)
    } else if (cursorsKeys?.down.isDown) {
      vy += moveSpeed
      this.player.anims.play('conference_run_down', true)
    } else {
      // 이동 후 정지시 애니메이션 실행
      const animParts = this.player.anims.currentAnim.key.split('_')
      animParts[1] = 'stand'
      this.player.anims.play(animParts.join('_'), true)
    }
    this.player.setVelocity(vx, vy)
  }
}
