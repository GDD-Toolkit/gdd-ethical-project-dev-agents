
interface buttonProps {
  name: string
}

const Button = ({name}: buttonProps) => {
  return (
    <>
      <button className='w-25 text-white bg-linear-to-r from-[#A07CFF] to-[#6D83F2]'>
        <strong>{name}</strong>
      </button>
    </>
  )
}

export default Button;