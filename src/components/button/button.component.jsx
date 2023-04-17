import './button.styles.scss';

const button_type_classes = {   //object used for applying classNames to buttons
  google: 'google-sign-in',
  inverted: 'inverted'
}

const Button = ({children, buttonType, ...buttonProps}) => {
  return (
    <button
      className={`button-container ${button_type_classes[buttonType]}`}
      {...buttonProps}
    >
      {children}
    </button>
  );
}
 
export default Button;