export default class Preload extends Phaser.Scene {
  constructor() {
    // Scene Key
    super('preload')
  }

  // Scene이 로드되기 전에 호출, 사용할 에셋을 로드
  preload() {
    // Tiled로 생성된 JSON 형식의 타입맵을 로드
    this.load.tilemapTiledJSON('tilemap', `/assets/map/interverse.json`)
    // 스프라이트 시트 이미지 파일을 로드
    this.load.spritesheet('floorAndWall', `/assets/builder/floorAndWall.png`, {
      frameWidth: 32,
      frameHeight: 32,
    })
    this.load.spritesheet('office', `/assets/builder/office.png`, {
      frameWidth: 32,
      frameHeight: 32,
    })
    this.load.spritesheet('chair', `/assets/builder/chair.png`, {
      frameWidth: 32,
      frameHeight: 64,
    })
    this.load.spritesheet(
      'waterPurifier',
      `/assets/builder/waterPurifier.png`,
      {
        frameWidth: 28,
        frameHeight: 60,
      },
    )
    this.load.spritesheet('printer', `/assets/builder/printer.png`, {
      frameWidth: 52,
      frameHeight: 54,
    })
    this.load.spritesheet('secretary', `/assets/builder/secretary.png`, {
      frameWidth: 116,
      frameHeight: 74,
    })
    this.load.spritesheet(
      'screenboard_top',
      `/assets/builder/screenboard_top.png`,
      {
        frameWidth: 60,
        frameHeight: 26,
      },
    )
    this.load.spritesheet(
      'screenboard_bottom',
      `/assets/builder/screenboard_bottom.png`,
      {
        frameWidth: 60,
        frameHeight: 20,
      },
    )
    this.load.spritesheet('bookcase_top', `/assets/builder/bookcase_top.png`, {
      frameWidth: 64,
      frameHeight: 46,
    })
    this.load.spritesheet(
      'bookcase_bottom',
      `/assets/builder/bookcase_bottom.png`,
      {
        frameWidth: 64,
        frameHeight: 20,
      },
    )
    this.load.spritesheet(
      'flowerpot_top',
      `/assets/builder/flowerpot_top.png`,
      {
        frameWidth: 44,
        frameHeight: 40,
      },
    )
    this.load.spritesheet(
      'flowerpot_bottom',
      `/assets/builder/flowerpot_bottom.png`,
      {
        frameWidth: 44,
        frameHeight: 20,
      },
    )
    this.load.spritesheet('conference', `/assets/character/conference.png`, {
      frameWidth: 32,
      frameHeight: 48,
    })
    this.load.spritesheet('bob', `/assets/character/bob.png`, {
      frameWidth: 32,
      frameHeight: 48,
    })
    this.load.spritesheet('emma', `/assets/character/emma.png`, {
      frameWidth: 32,
      frameHeight: 48,
    })
    this.load.spritesheet('james', `/assets/character/james.png`, {
      frameWidth: 32,
      frameHeight: 48,
    })
    this.load.spritesheet('sofia', `/assets/character/sofia.png`, {
      frameWidth: 32,
      frameHeight: 52,
    })
  }
}
