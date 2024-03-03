import { useAppSelector } from '../../store/store'

function Alert() {
  const { content, isAlert } = useAppSelector((state) => state.alert)

  if (!isAlert) return null

  return (
    <div className="fixed left-[50%] top-4 flex w-[500px] translate-x-[-50%] justify-center">
      <div className="rounded-full bg-white px-4 py-2 text-center shadow-md">
        <span className="font-neodgm text-lg">✨ {content} ✨</span>
      </div>
    </div>
  )
}

export default Alert
