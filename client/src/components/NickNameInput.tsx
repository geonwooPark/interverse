interface NickNameInputProps {
  value: string
  setValue: React.Dispatch<React.SetStateAction<string>>
  error: string
}

function NickNameInput({ value, setValue, error }: NickNameInputProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  return (
    <div>
      <p className="mb-4">닉네임을 입력해주세요</p>
      <input
        type="text"
        name="name"
        value={value}
        placeholder="닉네임"
        autoComplete="off"
        className="mb-4 w-full rounded-md border bg-gray-100 px-4 py-2 text-xl outline-none"
        onChange={handleChange}
      />
      {error && (
        <p className="mb-2 flex items-center text-sm text-red-600">
          <span className="mr-1">{error}</span>
          <span className="translate-y-[2px] text-lg">🥲</span>
        </p>
      )}
    </div>
  )
}

export default NickNameInput
