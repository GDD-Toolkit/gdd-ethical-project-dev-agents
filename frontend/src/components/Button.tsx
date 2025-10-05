interface ButtonProps {
  label: string;
  onClick?: () => void;
  className?: string;
}

const Button = ({ label, onClick, className }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`w-25 text-white bg-gradient-to-r from-[#A07CFF] to-[#6D83F2] hover:brightness-90 transition duration-200 ${
        className || ""
      }`}
    >
      <strong>{label}</strong>
    </button>
  );
};

export default Button;
