import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDC3WDf2uFog7LhCdgqCpRruFbYfMk0X1Q",
  authDomain: "bachelor-thesis-project-341920.firebaseapp.com",
  projectId: "bachelor-thesis-project-341920",
  storageBucket: "bachelor-thesis-project-341920.appspot.com",
  messagingSenderId: "1088097606569",
  appId: "1:1088097606569:web:a42117f6c16a78404ac2b8",
  measurementId: "G-LWKPPF6231"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });

export { auth, provider};