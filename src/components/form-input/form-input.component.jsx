import './form-imput.styles.scss';

const FormInput = ({ label, ...inputProps }) => {
  //input above label in form due to subsequent-sibling combinator to apply focus css on click (not type)
  return (
    <div className="group">
      <input className="form-input" {...inputProps}/>
      {label ?? (
        <label
          className={`${inputProps.value.length ? 'shrink' : ''} form-input-label`}
        >
          {label}
        </label>
      )}
    </div>
  );
}
 
export default FormInput;