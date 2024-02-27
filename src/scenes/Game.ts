export default class Game extends Phaser.Scene {
  private map!: Phaser.Tilemaps.Tilemap
  private player: any
  private moveSpeed = 200

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

    this.player = this.physics.add.sprite(100, 100, 'adam')
    this.player.setBounce(0.2)
    this.player.setCollideWorldBounds(true)
  }

  // 주로 게임 상태를 업데이트하고 게임 객체들의 상태를 조작하는 데 사용. 게임이 실행되는 동안 지속적으로 호출됨
  update() {
    const cursorsKeys = this.input.keyboard?.createCursorKeys()
    let vx = 0
    let vy = 0

    // 화살표 키 입력 감지
    if (cursorsKeys?.left.isDown) vx -= this.moveSpeed

    if (cursorsKeys?.right.isDown) vx += this.moveSpeed
    if (cursorsKeys?.up.isDown) vy -= this.moveSpeed
    if (cursorsKeys?.down.isDown) vy += this.moveSpeed

    this.player.setVelocity(vx, vy)
  }
}
