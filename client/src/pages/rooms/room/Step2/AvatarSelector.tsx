import { IconChevronLeft, IconChevronRight } from '@assets/svgs'
import { TEXTURE_MAP } from '@constants/index'

interface AvatarSelectorProps {
  texture: number
  onChange: (value: number) => void
}

function AvatarSelector({ texture, onChange }: AvatarSelectorProps) {
  const textureArr = Object.keys(TEXTURE_MAP)

  const textureImageLength = textureArr.length

  const onLeftArrowClick = () => {
    if (texture > 0) {
      onChange(texture - 1)
    } else if (texture === 0) {
      onChange(textureImageLength - 1)
    }
  }

  const onRightArrowClick = () => {
    if (texture < textureImageLength - 1) {
      onChange(texture + 1)
    } else if (texture === textureImageLength - 1) {
      onChange(0)
    }
  }

  return (
    <div className="relative w-full py-14">
      <div className="flex items-center justify-center gap-10">
        <IconChevronLeft className="size-6" onClick={onLeftArrowClick} />

        <div className="flex">
          <div
            className={`h-[52px] w-[32px] scale-150 bg-[-608px] bg-no-repeat ${TEXTURE_MAP[textureArr[texture]]}`}
          />
        </div>

        <IconChevronRight className="size-6" onClick={onRightArrowClick} />
      </div>
    </div>
  )
}

export default AvatarSelector
