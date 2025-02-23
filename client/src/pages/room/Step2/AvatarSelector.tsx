import { textureMap } from '@constants/index'

interface AvatarSelectorProps {
  texture: number
  onChange: (value: number) => void
}

function AvatarSelector({ texture, onChange }: AvatarSelectorProps) {
  const textureArr = Object.keys(textureMap)

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
    <div className="relative w-full rounded-md bg-gray-100 py-14">
      <div className="flex items-center justify-center gap-10">
        <div className="cursor-pointer" onClick={onLeftArrowClick}>
          〈
        </div>

        <div className="flex">
          <div
            className={`h-[52px] w-[32px] scale-150 bg-[-608px] bg-no-repeat ${textureMap[textureArr[texture]]}`}
          />
        </div>

        <div className="cursor-pointer" onClick={onRightArrowClick}>
          〉
        </div>
      </div>
    </div>
  )
}

export default AvatarSelector
