import Phaser from 'phaser'

export const createAvatarAnims = (
  anims: Phaser.Animations.AnimationManager,
) => {
  const animsFrameRate = 12

  anims.create({
    key: 'conference_stand_right',
    frames: anims.generateFrameNumbers('conference', { start: 0, end: 5 }),
    frameRate: animsFrameRate,
    repeat: -1,
  })

  anims.create({
    key: 'conference_stand_up',
    frames: anims.generateFrameNumbers('conference', { start: 6, end: 11 }),
    frameRate: animsFrameRate,
    repeat: -1,
  })

  anims.create({
    key: 'conference_stand_left',
    frames: anims.generateFrameNumbers('conference', { start: 12, end: 17 }),
    frameRate: animsFrameRate,
    repeat: -1,
  })

  anims.create({
    key: 'conference_stand_down',
    frames: anims.generateFrameNumbers('conference', { start: 18, end: 23 }),
    frameRate: animsFrameRate,
    repeat: -1,
  })

  anims.create({
    key: 'conference_run_right',
    frames: anims.generateFrameNumbers('conference', { start: 24, end: 29 }),
    frameRate: animsFrameRate,
    repeat: -1,
  })

  anims.create({
    key: 'conference_run_up',
    frames: anims.generateFrameNumbers('conference', { start: 30, end: 35 }),
    frameRate: animsFrameRate,
    repeat: -1,
  })

  anims.create({
    key: 'conference_run_left',
    frames: anims.generateFrameNumbers('conference', { start: 36, end: 41 }),
    frameRate: animsFrameRate,
    repeat: -1,
  })

  anims.create({
    key: 'conference_run_down',
    frames: anims.generateFrameNumbers('conference', { start: 42, end: 47 }),
    frameRate: animsFrameRate,
    repeat: -1,
  })
}
