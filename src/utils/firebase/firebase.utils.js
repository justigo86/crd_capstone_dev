import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import {
  getFirestore,
  doc, //data from instance(s)
  getDoc, //get doc data
  setDoc, //set doc data
  collection,
  writeBatch,
  query,
  getDocs,
} from "firebase/firestore";

//user sign-in and authentication with Firebase
//each function is created so that the Firebase methods do not have to be called in code/files
//centralizes Firestore and Firestore jargon here
//also helps because Firestore frquently changes methods

const firebaseConfig = {
  apiKey: "AIzaSyBeP-ig2ZdkzJinHwGLMIuANbDdHLrpn5E",
  authDomain: "crd-capston-dev.firebaseapp.com",
  projectId: "crd-capston-dev",
  storageBucket: "crd-capston-dev.appspot.com",
  messagingSenderId: "7952701054",
  appId: "1:7952701054:web:9dd89a32124a12a9936a2f",
};

const firebaseApp = initializeApp(firebaseConfig);
//initializeApp is function that allows us to interact with our instance of Firebase - by calling it with config info
//all things firebase will be run through firebaseApp - e.g., CRUD actions

const provider = new GoogleAuthProvider(); //a class that we will want multiple instances of
provider.setCustomParameters({
  prompt: "select_account", //when user interacts with provider - they have to select an account
});

export const auth = getAuth(); //single authentication for the app
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
//google popup prompt - when attached to click (SignIn page) - pops up overlay and asks user to sign-in
export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, provider);

export const db = getFirestore(); //used to point to and access database

//used to create a collection in the db - async bc interacting with Firebase db
export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd
) => {
  const collectionRef = collection(db, collectionKey);
  //as a reference point - get the collection out of the db (getFireStore()) using the passed in collectionKey
  //need to add store data (objects) to the categories in the db
  const batch = writeBatch(db); //returns db batch
  objectsToAdd.forEach((object) => {
    //looping through objects to run Set events (write)
    const docRef = doc(collectionRef, object.title.toLowerCase());
    //gets docReference instance of doc within param1 that matches param2
    batch.set(docRef, object); //write location using the object being passed in
  });
  await batch.commit(); //asynchronously commit
  console.log("done writing batch");
};

//async again because of Firebase interaction
export const getCategoriesAndDocuments = async () => {
  const collectionRef = collection(db, "categories");
  //next section is unique to Firestore
  const q = query(collectionRef); //retrieves object of data with query
  const querySnapshot = await getDocs(q); //asynchronously saves snapshot of the object
  //querySnapshot.docs retrieves an array from the snapshot

  //how data was handled before implementing the Reducer - logic moved to category.selector
  // const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
  //   const { title, items } = docSnapshot.data();
  //   acc[title.toLowerCase()] = items;
  //   return acc;
  // }, {});
  // return categoryMap;

  //data handled with Reducer
  return querySnapshot.docs.map((docSnapshot) => docSnapshot.data());
};

export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInfo = {}
) => {
  //take data from from auth and store in Firestore
  if (!userAuth) return;

  const userDocRef = doc(db, "users", userAuth.uid); //see if there is an existing document reference
  //3 arguments = database instance, document path, user.uid (pulled from Google User SignIn fetch response)
  //give me the document from within the DB, within "users" collection, for this user ID
  console.log(userDocRef);

  const userSnapshot = await getDoc(userDocRef);
  console.log(userSnapshot);

  //if user snapshot does not exist - create user data
  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth; //destructuring user info from auth
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        //create user data using created user values
        displayName,
        email,
        createdAt,
        ...additionalInfo,
      });
    } catch (err) {
      console.log("error creating user", err.message);
    }
  }
  //if user exists
  return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback) =>
  onAuthStateChanged(auth, callback);
//onAuthStateChange returns an observer listener - subscribes to auth changes and calls callback - returns function
// - onAuthStateChangedListener just makes sure we get a callback for onAuthStateChanged as second param
//in the observer subscription, the callback is the "next" method

//trying to see if there is a user that has been authenticated already
export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (userAuth) => {
        unsubscribe(); //if we don't do this - will have memory leak
        resolve(userAuth);
      },
      reject
    );
  });
};
