type button = {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  type?: 'button' | 'submit';
};

const Button = ({ children, onClick, className = '', type }: button) => {
  return (
    <button type={type} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
