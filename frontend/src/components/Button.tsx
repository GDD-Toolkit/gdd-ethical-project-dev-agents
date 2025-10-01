
interface buttonProps {
  name: string
}

const Button = ({name}: buttonProps) => {


  return (
    <>
      <button className=''>{name}</button>
    </>
  )
}

export default Button;