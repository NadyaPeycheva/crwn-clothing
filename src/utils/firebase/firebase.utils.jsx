
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "firebase/auth";

import { getFirestore, doc, getDoc, setDoc,collection,writeBatch,query,getDocs } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDAAzdOX63n_Nn_5jZyiqgVZXFTgf-rN3A",
  authDomain: "crw-clothes.firebaseapp.com",
  projectId: "crw-clothes",
  storageBucket: "crw-clothes.appspot.com",
  messagingSenderId: "1022720229645",
  appId: "1:1022720229645:web:d94029e30f276d52e5b044",
};

const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: "select-account",
});

// export const auth = getAuth(firebaseApp);
// export const db = getFirestore(firebaseApp);
export const auth = getAuth();
export const singInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
export const singInWithGoogleRedirect=()=>signInWithRedirect(auth, googleProvider)

export const db = getFirestore();

export const addColectionAndDocument=async(collectionKey,objectsToAdd,field)=>{
  
  const collectionRef=collection(db,collectionKey);
  const batch=writeBatch(db);

  objectsToAdd.forEach((object)=>{
    const docRef=doc(collectionRef,object.title.toLowerCase());
    batch.set(docRef,object);
  });
  await batch.commit();
}

export const getCetegoriesAndDocuments=async()=>{
  const collectionRef=collection(db,'collections');
  const q=query(collectionRef);

  const querySnapshot=await getDocs(q);
  const categoryMap=querySnapshot.docs.reduce((acc,docSnapShot)=>{
    const {title, items}=docSnapShot.data();
    acc[title.toLowerCase()]=items;
    return acc;
  },{});
  return categoryMap;
}

export const createUserDocumentFromAuth = async (userAuth,additionalInformation={}) => {
  if(!userAuth){
    return;
  }
  const userDocRef = doc(db, "users", userAuth.uid);

  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {  displayName, email, createdAt,...additionalInformation });
    } catch (err) {
      console.log("error creating the user", err.message);
    }
  }
  return userDocRef;
};

export const createAuthUserWithEmailAndPassword=async (email,password)=>{
  if(!email || !password){
    return
  }
  return createUserWithEmailAndPassword(auth,email,password)
}

export const singInAuthUserWithEmailAndPassword=async (email,password)=>{
  console.log('work');
  if(!email || !password){
    return
  }
  return signInWithEmailAndPassword(auth,email,password)
}

export const singOutUser=async ()=> await signOut(auth);

export const onAuthStateChangeListener=(callback)=> onAuthStateChanged(auth,callback);

