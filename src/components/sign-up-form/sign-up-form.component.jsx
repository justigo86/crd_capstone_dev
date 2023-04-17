import { useState } from "react";
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";

//create object for useState to update
//note: we do not want to store this information because it is sensitive
const defaultFormFields = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: '',
}

const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;

  const handleChange = (event) => {   //change has been generalized for incoming form data entry
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value})  //update formFields with object name and entered value
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match. Please try again.")
    }

    try {
      const {user} = await createAuthUserWithEmailAndPassword(email, password);
      await createUserDocumentFromAuth(user, { displayName});
    } catch (err) {
      if(err.code === 'auth/email-already-in-use') {
        alert('')
      }
      console.log("User creation experienced an error.", err)
    }
  }

  return (
    <div>
      <h1>Email Sign Up Form</h1>
      <form onSubmit={() => {}}>
        <label for="displayName">Display Name:</label>
        <input
          type="text"
          id="displayName"
          onChange={handleChange}
          name="displayName"
          required
          value={displayName}
        />
        
        <label for="email">Email:</label>
        <input
          type="email"
          id="email"
          onChange={handleChange}
          name="email"
          required
          value={email}
        />
        
        <label for="password">Password:</label>
        <input
          type="password"
          id="password"
          onChange={handleChange}
          name="password"
          required
          value={password}
        />
        
        <label for="confirmPassword">Confirm Password:</label>
        <input
          type="password"
          id="confirmPassword"
          onChange={handleChange}
          name="confirmPassword"
          required
          value={confirmPassword}
        />
        
        <button type="submit">Sign Up</button>
      </form>
    </div>
  )
};
export default SignUpForm;