import { useState } from "react";
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";
import "./sign-up-form.styles.scss";

//create object for useState to update
//note: we do not want to store this information because it is sensitive
const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
}

const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;

  // const { setUserContext } = useContext(UserContext);  - //functionality moved/centralized in user.context

  const handleChange = (event) => {   //change has been generalized for incoming form data entry
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value})  //update formFields with object name and entered value
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match. Please try again.");
      return;
    }

    try {
      const {user} = await createAuthUserWithEmailAndPassword(email, password);
      await createUserDocumentFromAuth(user, { displayName});
      resetFormFields();
    } catch (err) {
      if(err.code === "auth/email-already-in-use") {
        alert("Cannot create user. Email already in use.")
      } else {
        console.log("User creation experienced an error.", err)
      }
    }
  }

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  }

  return (
    <div className="sign-up-container">
      <h2>Don't have an account?</h2>
      <span>Sign up with email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Display Name"
          type="text"
          id="displayName"
          onChange={handleChange}
          name="displayName"
          required
          value={displayName}
        />
        
        <FormInput
          label="Email"
          type="email"
          id="email"
          onChange={handleChange}
          name="email"
          required
          value={email}
        />
        
        <FormInput
          label="Password"
          type="password"
          id="password"
          onChange={handleChange}
          name="password"
          required
          value={password}
        />
        
        <FormInput
          label="Confirm Password"
          type="password"
          id="confirmPassword"
          onChange={handleChange}
          name="confirmPassword"
          required
          value={confirmPassword}
        />

        <Button type="submit">Sign Up</Button>
      </form>
    </div>
  )
};
export default SignUpForm;