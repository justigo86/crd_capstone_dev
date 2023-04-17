import {
  signInWithGooglePopup,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";
import SignUpForm from "../../components/sign-up-form/sign-up-form.component";

const SignIn = () => {

  const logGoogleUser = async () => {
    // const response = await signInWithGooglePopup();
    // console.log(response)  //can be used to view user info (e.g,. uid) when user logs in
    const {user} = await signInWithGooglePopup();   //destructured
    const userDocRef = await createUserDocumentFromAuth(user)
  }

  //problematic because of redirect - site loses everything in memory - use useEffect above
  // const logGoogleRedirectUser = async () => {
  //   const {user} = await signInWithGoogleRedirect();
  //   createUserDocumentFromAuth(user)
  // }
  //useEffect used to remount after user logs in using Redirect
  // useEffect(async () => {
  //   const response = await getRedirectResult(auth); //get response for auth redirect
  //   if (response) {
  //     const userDocRef = await createUserDocumentFromAuth(response.user)
  //   }
  //   console.log(response);
  // }, []);

  return (
    <div>
      <h1>SignIn</h1>
      <button onClick={logGoogleUser}>
        Google Popup SignIn
      </button>
      {/* <button onClick={signInWithGoogleRedirect}> //associated with GoogleRedirect above
        Google Redirect SignIn
      </button> */}
      <SignUpForm />
    </div>
  );
}
 
export default SignIn;