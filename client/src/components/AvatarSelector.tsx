import { textureImage } from '../routes/AvatarInfo'

interface AvatarSelectorProps {
  texture: number
  setTexture: React.Dispatch<React.SetStateAction<number>>
}

function AvatarSelector({ texture, setTexture }: AvatarSelectorProps) {
  const textureImageLength = Object.keys(textureImage).length
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
    <div className="mb-8">
      <p className="title mb-6">캐릭터를 선택해주세요</p>
      <div className="flex items-center justify-center gap-10">
        <div className="cursor-pointer" onClick={onTextureLeftArrowClick}>
          〈
        </div>
        <div
          className={`h-[48px] w-[32px] scale-150 bg-[64px] ${textureImage[texture]}`}
        ></div>
        <div className="cursor-pointer" onClick={onTextureRightArrowClick}>
          〉
        </div>
      </div>
    </div>
  )
}

export default AvatarSelector
