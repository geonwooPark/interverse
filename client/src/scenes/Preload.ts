export default class Preload extends Phaser.Scene {
  constructor() {
    // Scene Key
    super('preload')
  }

  // Scene이 로드되기 전에 호출, 사용할 에셋을 로드
  preload() {
    // Tiled로 생성된 JSON 형식의 타입맵을 로드
    this.load.tilemapTiledJSON(
      'tilemap',
      `${import.meta.env.VITE_FRONTEND}/assets/map/interverse.json`,
    )
    // 스프라이트 시트 이미지 파일을 로드
    this.load.spritesheet(
      'floorAndWall',
      `${import.meta.env.VITE_FRONTEND}/assets/builder/floorAndWall.png`,
      {
        frameWidth: 32,
        frameHeight: 32,
      },
    )
    this.load.spritesheet(
      'office',
      `${import.meta.env.VITE_FRONTEND}/assets/builder/office.png`,
      {
        frameWidth: 32,
        frameHeight: 32,
      },
    )
    this.load.spritesheet(
      'chair',
      `${import.meta.env.VITE_FRONTEND}/assets/builder/chair.png`,
      {
        frameWidth: 32,
        frameHeight: 64,
      },
    )
    this.load.spritesheet(
      'waterPurifier',
      `${import.meta.env.VITE_FRONTEND}/assets/builder/waterPurifier.png`,
      {
        frameWidth: 28,
        frameHeight: 60,
      },
    )
    this.load.spritesheet(
      'printer',
      `${import.meta.env.VITE_FRONTEND}/assets/builder/printer.png`,
      {
        frameWidth: 52,
        frameHeight: 54,
      },
    )
    this.load.spritesheet(
      'secretary',
      `${import.meta.env.VITE_FRONTEND}/assets/builder/secretary.png`,
      {
        frameWidth: 116,
        frameHeight: 74,
      },
    )
    this.load.spritesheet(
      'screenboard_top',
      `${import.meta.env.VITE_FRONTEND}/assets/builder/screenboard_top.png`,
      {
        frameWidth: 60,
        frameHeight: 26,
      },
    )
    this.load.spritesheet(
      'screenboard_bottom',
      `${import.meta.env.VITE_FRONTEND}/assets/builder/screenboard_bottom.png`,
      {
        frameWidth: 60,
        frameHeight: 20,
      },
    )
    this.load.spritesheet(
      'bookcase_top',
      `${import.meta.env.VITE_FRONTEND}/assets/builder/bookcase_top.png`,
      {
        frameWidth: 64,
        frameHeight: 46,
      },
    )
    this.load.spritesheet(
      'bookcase_bottom',
      `${import.meta.env.VITE_FRONTEND}/assets/builder/bookcase_bottom.png`,
      {
        frameWidth: 64,
        frameHeight: 20,
      },
    )
    this.load.spritesheet(
      'flowerpot_top',
      `${import.meta.env.VITE_FRONTEND}/assets/builder/flowerpot_top.png`,
      {
        frameWidth: 44,
        frameHeight: 40,
      },
    )
    this.load.spritesheet(
      'flowerpot_bottom',
      `${import.meta.env.VITE_FRONTEND}/assets/builder/flowerpot_bottom.png`,
      {
        frameWidth: 44,
        frameHeight: 20,
      },
    )
    this.load.spritesheet(
      'conference',
      `${import.meta.env.VITE_FRONTEND}/assets/character/conference.png`,
      {
        frameWidth: 32,
        frameHeight: 48,
      },
    )
    this.load.spritesheet(
      'bob',
      `${import.meta.env.VITE_FRONTEND}/assets/character/bob.png`,
      {
        frameWidth: 32,
        frameHeight: 48,
      },
    )
    this.load.spritesheet(
      'emma',
      `${import.meta.env.VITE_FRONTEND}/assets/character/emma.png`,
      {
        frameWidth: 32,
        frameHeight: 48,
      },
    )
    this.load.on('complete', () => {
      this.startGame()
    })
  }

  startGame() {
    this.scene.launch('game')
  }
}
