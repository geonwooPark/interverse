import React, { useState } from 'react'
import AvatarSelector from './AvatarSelector'
import TextField from '@components/TextField'
import { MAX_NICKNAME_LENGTH, TEXTURE_MAP } from '@constants/index'
import { StepFlowProps } from '@components/StepFlow/types'
import Button from '@components/Button'
import { useAppDispatch } from '@store/store'
import { setAvatar } from '@store/features/avatarSlice'
import GameManager from '@managers/GameManager'

interface Step2Props extends Partial<StepFlowProps> {}

export default function Step2({ activeStep, onNext }: Step2Props) {
  const game = GameManager.getInstance()

  const dispatch = useAppDispatch()

  const [texture, setTexture] = useState(0)

  const [nickname, setNickname] = useState('')

  const onNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length > MAX_NICKNAME_LENGTH) {
      e.target.value = e.target.value.slice(0, MAX_NICKNAME_LENGTH)
    }

    setNickname(e.target.value)
  }

  const onTextureChange = (value: number) => {
    setTexture(value)
  }

  const onEnter = () => {
    // 아바타 전역 상태에 등록
    dispatch(
      setAvatar({ texture: Object.keys(TEXTURE_MAP)[texture], nickname }),
    )

    // 게임 실행
    game.scene.start('game')
    ;(document.getElementById('game-container') as HTMLElement).style.display =
      'block'

    onNext && onNext()
  }

  return (
    <div className="flex size-full items-center justify-center">
      <div className="w-[360px] rounded-3xl p-8 shadow-level1">
        <AvatarSelector texture={texture} onChange={onTextureChange} />

        <div className="mb-6 mt-3">
          <TextField
            value={nickname}
            onChange={onNicknameChange}
            placeholder="닉네임"
            maxLength={MAX_NICKNAME_LENGTH}
          />
          <p className="ml-2 mt-1 text-xs text-gray-700">
            닉네임은 최대 {MAX_NICKNAME_LENGTH}글자까지 가능합니다.
          </p>
        </div>

        <Button size="lg" variant="contained" fullWidth onClick={onEnter}>
          입장하기
        </Button>
      </div>
    </div>
  )
}
