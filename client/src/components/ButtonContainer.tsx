import IconLink from '../svgs/IconLink.svg?react'
import IconOff from '../svgs/IconOff.svg?react'

function ButtonContainer() {
  return (
    <div className="fixed right-8 top-4 flex gap-3">
      <button className="flex size-[50px] items-center justify-center rounded-full bg-purple-600 text-white duration-200 hover:bg-purple-700">
        <IconLink />
      </button>
      <button className="flex size-[50px] items-center justify-center rounded-full bg-white text-red-600">
        <IconOff />
      </button>
    </div>
  )
}

export default ButtonContainer
