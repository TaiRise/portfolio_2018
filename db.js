import Vue from 'vue'
import VueFire from 'vuefire'
import Firebase from 'firebase'

// explicit installation required in module environments
Vue.use(VueFire)

const firebaseApp = Firebase.initializeApp({
  apiKey: "AIzaSyBzz4DTj-MmROxMmcfA-zpIhAk5810nI98",
  authDomain: "portfolio-tai.firebaseapp.com",
  databaseURL: "https://portfolio-tai.firebaseio.com",
  projectId: "portfolio-tai",
  storageBucket: "portfolio-tai.appspot.com",
  messagingSenderId: "404040824232"
})

export const db = firebaseApp.database()
