import firebase from 'firebase'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/database'
import 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyAOTwRWyy1v3pOokBVwt2VbSjmaSYmvqao",
    authDomain: "veggiego-d20b9.firebaseapp.com",
    databaseURL: "https://veggiego-d20b9-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "veggiego-d20b9",
    storageBucket: "veggiego-d20b9.appspot.com",
    messagingSenderId: "702276621615",
    appId: "1:702276621615:web:c5b7c8f3515e5741b57dda"
  };

  // firebase.initializeApp(firebaseConfig)


var fireDb = !firebase.apps.length
? firebase.initializeApp(firebaseConfig)
: firebase.app()

//   var fireDb = !firebase.apps.length
//   ? firebase.initializeApp(firebaseConfig)
//   : firebase.app()


   const storage = fireDb.storage()
   const database = fireDb.database()
  // export default fireDb.database()
   export { storage, database as default }
// export default firebase;
  