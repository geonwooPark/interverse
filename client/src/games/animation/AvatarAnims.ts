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

  anims.create({
    key: 'conference_sit_right',
    frames: anims.generateFrameNumbers('conference', { start: 48, end: 48 }),
    frameRate: animsFrameRate,
    repeat: 0,
  })

  anims.create({
    key: 'conference_sit_left',
    frames: anims.generateFrameNumbers('conference', { start: 49, end: 49 }),
    frameRate: animsFrameRate,
    repeat: 0,
  })

  anims.create({
    key: 'conference_sit_down',
    frames: anims.generateFrameNumbers('conference', { start: 50, end: 50 }),
    frameRate: animsFrameRate,
    repeat: 0,
  })

  anims.create({
    key: 'conference_sit_up',
    frames: anims.generateFrameNumbers('conference', { start: 51, end: 51 }),
    frameRate: animsFrameRate,
    repeat: 0,
  })

  anims.create({
    key: 'bob_stand_right',
    frames: anims.generateFrameNumbers('bob', { start: 0, end: 5 }),
    frameRate: animsFrameRate,
    repeat: -1,
  })

  anims.create({
    key: 'bob_stand_up',
    frames: anims.generateFrameNumbers('bob', { start: 6, end: 11 }),
    frameRate: animsFrameRate,
    repeat: -1,
  })

  anims.create({
    key: 'bob_stand_left',
    frames: anims.generateFrameNumbers('bob', { start: 12, end: 17 }),
    frameRate: animsFrameRate,
    repeat: -1,
  })

  anims.create({
    key: 'bob_stand_down',
    frames: anims.generateFrameNumbers('bob', { start: 18, end: 23 }),
    frameRate: animsFrameRate,
    repeat: -1,
  })

  anims.create({
    key: 'bob_run_right',
    frames: anims.generateFrameNumbers('bob', { start: 24, end: 29 }),
    frameRate: animsFrameRate,
    repeat: -1,
  })

  anims.create({
    key: 'bob_run_up',
    frames: anims.generateFrameNumbers('bob', { start: 30, end: 35 }),
    frameRate: animsFrameRate,
    repeat: -1,
  })

  anims.create({
    key: 'bob_run_left',
    frames: anims.generateFrameNumbers('bob', { start: 36, end: 41 }),
    frameRate: animsFrameRate,
    repeat: -1,
  })

  anims.create({
    key: 'bob_run_down',
    frames: anims.generateFrameNumbers('bob', { start: 42, end: 47 }),
    frameRate: animsFrameRate,
    repeat: -1,
  })

  anims.create({
    key: 'bob_sit_right',
    frames: anims.generateFrameNumbers('bob', { start: 48, end: 48 }),
    frameRate: animsFrameRate,
    repeat: 0,
  })

  anims.create({
    key: 'bob_sit_left',
    frames: anims.generateFrameNumbers('bob', { start: 49, end: 49 }),
    frameRate: animsFrameRate,
    repeat: 0,
  })

  anims.create({
    key: 'bob_sit_down',
    frames: anims.generateFrameNumbers('bob', { start: 50, end: 50 }),
    frameRate: animsFrameRate,
    repeat: 0,
  })

  anims.create({
    key: 'bob_sit_up',
    frames: anims.generateFrameNumbers('bob', { start: 51, end: 51 }),
    frameRate: animsFrameRate,
    repeat: 0,
  })

  anims.create({
    key: 'emma_stand_right',
    frames: anims.generateFrameNumbers('emma', { start: 0, end: 5 }),
    frameRate: animsFrameRate,
    repeat: -1,
  })

  anims.create({
    key: 'emma_stand_up',
    frames: anims.generateFrameNumbers('emma', { start: 6, end: 11 }),
    frameRate: animsFrameRate,
    repeat: -1,
  })

  anims.create({
    key: 'emma_stand_left',
    frames: anims.generateFrameNumbers('emma', { start: 12, end: 17 }),
    frameRate: animsFrameRate,
    repeat: -1,
  })

  anims.create({
    key: 'emma_stand_down',
    frames: anims.generateFrameNumbers('emma', { start: 18, end: 23 }),
    frameRate: animsFrameRate,
    repeat: -1,
  })

  anims.create({
    key: 'emma_run_right',
    frames: anims.generateFrameNumbers('emma', { start: 24, end: 29 }),
    frameRate: animsFrameRate,
    repeat: -1,
  })

  anims.create({
    key: 'emma_run_up',
    frames: anims.generateFrameNumbers('emma', { start: 30, end: 35 }),
    frameRate: animsFrameRate,
    repeat: -1,
  })

  anims.create({
    key: 'emma_run_left',
    frames: anims.generateFrameNumbers('emma', { start: 36, end: 41 }),
    frameRate: animsFrameRate,
    repeat: -1,
  })

  anims.create({
    key: 'emma_run_down',
    frames: anims.generateFrameNumbers('emma', { start: 42, end: 47 }),
    frameRate: animsFrameRate,
    repeat: -1,
  })

  anims.create({
    key: 'emma_sit_right',
    frames: anims.generateFrameNumbers('emma', { start: 48, end: 48 }),
    frameRate: animsFrameRate,
    repeat: 0,
  })

  anims.create({
    key: 'emma_sit_left',
    frames: anims.generateFrameNumbers('emma', { start: 49, end: 49 }),
    frameRate: animsFrameRate,
    repeat: 0,
  })

  anims.create({
    key: 'emma_sit_down',
    frames: anims.generateFrameNumbers('emma', { start: 50, end: 50 }),
    frameRate: animsFrameRate,
    repeat: 0,
  })

  anims.create({
    key: 'james_sit_up',
    frames: anims.generateFrameNumbers('james', { start: 51, end: 51 }),
    frameRate: animsFrameRate,
    repeat: 0,
  })

  anims.create({
    key: 'james_stand_right',
    frames: anims.generateFrameNumbers('james', { start: 0, end: 5 }),
    frameRate: animsFrameRate,
    repeat: -1,
  })

  anims.create({
    key: 'james_stand_up',
    frames: anims.generateFrameNumbers('james', { start: 6, end: 11 }),
    frameRate: animsFrameRate,
    repeat: -1,
  })

  anims.create({
    key: 'james_stand_left',
    frames: anims.generateFrameNumbers('james', { start: 12, end: 17 }),
    frameRate: animsFrameRate,
    repeat: -1,
  })

  anims.create({
    key: 'james_stand_down',
    frames: anims.generateFrameNumbers('james', { start: 18, end: 23 }),
    frameRate: animsFrameRate,
    repeat: -1,
  })

  anims.create({
    key: 'james_run_right',
    frames: anims.generateFrameNumbers('james', { start: 24, end: 29 }),
    frameRate: animsFrameRate,
    repeat: -1,
  })

  anims.create({
    key: 'james_run_up',
    frames: anims.generateFrameNumbers('james', { start: 30, end: 35 }),
    frameRate: animsFrameRate,
    repeat: -1,
  })

  anims.create({
    key: 'james_run_left',
    frames: anims.generateFrameNumbers('james', { start: 36, end: 41 }),
    frameRate: animsFrameRate,
    repeat: -1,
  })

  anims.create({
    key: 'james_run_down',
    frames: anims.generateFrameNumbers('james', { start: 42, end: 47 }),
    frameRate: animsFrameRate,
    repeat: -1,
  })

  anims.create({
    key: 'james_sit_right',
    frames: anims.generateFrameNumbers('james', { start: 48, end: 48 }),
    frameRate: animsFrameRate,
    repeat: 0,
  })

  anims.create({
    key: 'james_sit_left',
    frames: anims.generateFrameNumbers('james', { start: 49, end: 49 }),
    frameRate: animsFrameRate,
    repeat: 0,
  })

  anims.create({
    key: 'james_sit_down',
    frames: anims.generateFrameNumbers('james', { start: 50, end: 50 }),
    frameRate: animsFrameRate,
    repeat: 0,
  })

  anims.create({
    key: 'james_sit_up',
    frames: anims.generateFrameNumbers('james', { start: 51, end: 51 }),
    frameRate: animsFrameRate,
    repeat: 0,
  })

  anims.create({
    key: 'sofia_stand_right',
    frames: anims.generateFrameNumbers('sofia', { start: 0, end: 5 }),
    frameRate: animsFrameRate,
    repeat: -1,
  })

  anims.create({
    key: 'sofia_stand_up',
    frames: anims.generateFrameNumbers('sofia', { start: 6, end: 11 }),
    frameRate: animsFrameRate,
    repeat: -1,
  })

  anims.create({
    key: 'sofia_stand_left',
    frames: anims.generateFrameNumbers('sofia', { start: 12, end: 17 }),
    frameRate: animsFrameRate,
    repeat: -1,
  })

  anims.create({
    key: 'sofia_stand_down',
    frames: anims.generateFrameNumbers('sofia', { start: 18, end: 23 }),
    frameRate: animsFrameRate,
    repeat: -1,
  })

  anims.create({
    key: 'sofia_run_right',
    frames: anims.generateFrameNumbers('sofia', { start: 24, end: 29 }),
    frameRate: animsFrameRate,
    repeat: -1,
  })

  anims.create({
    key: 'sofia_run_up',
    frames: anims.generateFrameNumbers('sofia', { start: 30, end: 35 }),
    frameRate: animsFrameRate,
    repeat: -1,
  })

  anims.create({
    key: 'sofia_run_left',
    frames: anims.generateFrameNumbers('sofia', { start: 36, end: 41 }),
    frameRate: animsFrameRate,
    repeat: -1,
  })

  anims.create({
    key: 'sofia_run_down',
    frames: anims.generateFrameNumbers('sofia', { start: 42, end: 47 }),
    frameRate: animsFrameRate,
    repeat: -1,
  })

  anims.create({
    key: 'sofia_sit_right',
    frames: anims.generateFrameNumbers('sofia', { start: 48, end: 48 }),
    frameRate: animsFrameRate,
    repeat: 0,
  })

  anims.create({
    key: 'sofia_sit_left',
    frames: anims.generateFrameNumbers('sofia', { start: 49, end: 49 }),
    frameRate: animsFrameRate,
    repeat: 0,
  })

  anims.create({
    key: 'sofia_sit_down',
    frames: anims.generateFrameNumbers('sofia', { start: 50, end: 50 }),
    frameRate: animsFrameRate,
    repeat: 0,
  })

  anims.create({
    key: 'sofia_sit_up',
    frames: anims.generateFrameNumbers('sofia', { start: 51, end: 51 }),
    frameRate: animsFrameRate,
    repeat: 0,
  })
}
