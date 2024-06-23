interface CreatorCardProps {
  image: string
  name: string
  job: string
  email: string
  link: string
}

function CreatorItem({ image, name, job, email, link }: CreatorCardProps) {
  return (
    <div className="flex h-[360px] w-[260px] flex-col items-center justify-between rounded-md bg-white p-6">
      <div className="flex aspect-square w-[190px] items-center justify-center rounded-full bg-gray-100">
        <img src={`/images/${image}`} alt="creator" width={90} />
      </div>
      <div className="flex flex-col self-start px-2">
        <div className="flex items-end gap-1">
          <span className="text-2xl">{name}</span>
          <span className="opacity-30">|</span>
          <span className="opacity-30">{job}</span>
        </div>
        <span className="text-lg">{email}</span>
      </div>
      <a
        href={link}
        target="_blank"
        rel="noreferrer"
        className="primary-button"
      >
        <span>GITHUB</span>
      </a>
    </div>
  )
}

export default CreatorItem
