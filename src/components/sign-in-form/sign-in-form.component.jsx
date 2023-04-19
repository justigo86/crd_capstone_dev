import { useState } from "react";
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";
import "./sign-in-form.styles.scss";
import {
  signInAuthUserWithEmailAndPassword,
  signInWithGooglePopup
} from "../../utils/firebase/firebase.utils";

const defaultFormFields = {
  email: "",
  password: "",
}

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  // const { setCurrentUser } = useContext(UserContext); - functionality moved to user.context
  //pulling setCurrentUser from Context to set Context state for value currentUser

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value})
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!email) {
      alert("Pleaes provide email.")
      return
    } else if (!password) {
      alert("Please provide password.")
      return
    }

    try {
      //const { user } = 
      await signInAuthUserWithEmailAndPassword(email, password);
      //setCurrentUser(user);   //when we receive user information - used to set Context currentUser value
      resetFormFields();
    } catch (err) {
      switch(err.code) {
        case "auth/wrong-password":
          alert("Incorrect password for this email address.");
          break;
        case "auth/user-not-found":
          alert("No user associated with this email address.");
          break;
        default:
          console.log("Unable to sign in. Please check credentials and try again.", err);
      }
    }
  }

  const signInWithGoogle = async () => {
    //const { user } = 
    await signInWithGooglePopup();
    //setCurrentUser(user);   //functionality moved/centralized in user.context
    // await createUserDocumentFromAuth(user);  //also moved to user.context
  }

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  }

  return (
    <div className="sign-in-container">
      <h2>I already have an account</h2>
      <span>Sign in with email and password</span>
      <form onSubmit={handleSubmit}>
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

        <div className="buttons-container">
          <Button type="submit">Sign in</Button>
          <Button
            type="button"
            buttonType="google"
            onClick={signInWithGoogle}
          >Sign in with Google</Button>
        </div>

      </form>
    </div>
  );
}
 
export default SignInForm;