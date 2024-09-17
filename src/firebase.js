// Importa as funções necessárias do SDK do Firebase
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBZLWIog0PiAj0K29pvK9cpWYYj0x2_pfA",
  authDomain: "acme-5f7a5.firebaseapp.com",
  projectId: "acme-5f7a5",
  storageBucket: "acme-5f7a5.appspot.com",
  messagingSenderId: "165173680683",
  appId: "1:165173680683:web:a80de3abba7e54691ce86e"
};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);

// Inicializa o Firestore e a autenticação
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
