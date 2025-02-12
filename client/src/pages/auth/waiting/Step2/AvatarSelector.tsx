import { useMemo } from 'react'
import { textureImage } from '../../../../constants'

interface AvatarSelectorProps {
  texture: number
  setTexture: React.Dispatch<React.SetStateAction<number>>
}

function AvatarSelector({ texture, setTexture }: AvatarSelectorProps) {
  const textureArr = useMemo(() => Array.from(textureImage).slice(1), [])

  const textureImageLength = textureArr.length

  const onTextureLeftArrowClick = () => {
    if (texture > 0) {
      setTexture((prev) => prev - 1)
    } else if (texture === 0) {
      setTexture(textureImageLength - 1)
    }
  }

  const onTextureRightArrowClick = () => {
    if (texture < textureImageLength - 1) {
      setTexture((prev) => prev + 1)
    } else if (texture === textureImageLength - 1) {
      setTexture(0)
    }
  }

  return (
    <div className="relative w-full rounded-md bg-gray-200 py-14">
      <div className="flex items-center justify-center gap-10">
        <div className="cursor-pointer" onClick={onTextureLeftArrowClick}>
          〈
        </div>

        <div className="flex">
          <div
            className={`h-[52px] w-[32px] scale-150 bg-[-608px] bg-no-repeat ${textureArr[texture][1]}`}
          />
        </div>

        <div className="cursor-pointer" onClick={onTextureRightArrowClick}>
          〉
        </div>
      </div>
    </div>
  )
}

export default AvatarSelector
