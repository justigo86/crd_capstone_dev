import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  createUserWithEmailAndPassword
} from 'firebase/auth';
import {
  getFirestore,
  doc,    //data from instance(s)
  getDoc, //get doc data
  setDoc  //set doc data
} from 'firebase/firestore'

//user sign-in and authentication with Firebase

const firebaseConfig = {
  apiKey: "AIzaSyBeP-ig2ZdkzJinHwGLMIuANbDdHLrpn5E",
  authDomain: "crd-capston-dev.firebaseapp.com",
  projectId: "crd-capston-dev",
  storageBucket: "crd-capston-dev.appspot.com",
  messagingSenderId: "7952701054",
  appId: "1:7952701054:web:9dd89a32124a12a9936a2f"
};

const firebaseApp = initializeApp(firebaseConfig);
//initializeApp is function that allows us to interact with our instance of Firebase - by calling it with config info
//all things firebase will be run through firebaseApp - e.g., CRUD actions


const provider = new GoogleAuthProvider();  //a class that we will want multiple instances of
provider.setCustomParameters({
  prompt: "select_account"      //when user interacts with provider - they have to select an account
})

export const auth = getAuth();  //single authentication for the app
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
//google popup prompt - when attached to click (SignIn page) - pops up overlay and asks user to sign-in
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, provider);

export const db = getFirestore();   //used to point to and access database

export const createUserDocumentFromAuth = async (userAuth, additionalInfo = {}) => {  //take data from from auth and store in Firestore
  if (!userAuth) return;

  const userDocRef = doc(db, 'users', userAuth.uid)//see if there is an existing document reference
    //3 arguments = database instance, document path, user.uid (pulled from Google User SignIn fetch response)
    //give me the document from within the DB, within 'users' collection, for this user ID
    console.log(userDocRef);

    const userSnapshot = await getDoc(userDocRef);
    console.log(userSnapshot);

    //if user snapshot does not exist - create user data
    if(!userSnapshot.exists()) {
      const {displayName, email} = userAuth;  //destructuring user info from auth
      const createdAt = new Date();

      try {
        await setDoc(userDocRef, {    //create user data using created user values
          displayName, email, createdAt, ...additionalInfo,
        });
      } catch (err) {
        console.log('error creating user', err.message);
      }
    }
    //if user exists
    return userDocRef;
}

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
}

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
}