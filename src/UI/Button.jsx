function Button({ children, textOnly, className, ...props }) {
  return (
    <button
      className={textOnly ? "text-button" : "button" + ' ' +  className}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
