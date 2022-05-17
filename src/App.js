import './App.css';
import app from './Firebase.init';
import { getAuth, GithubAuthProvider, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth'
import { useState } from 'react';

const auth = getAuth(app)

function App() {

  const [user, setUser] = useState({});
  const googleProvider = new GoogleAuthProvider();
  const githubProvider = new GithubAuthProvider();


  const handelGoogleSubmit = () => {
    signInWithPopup(auth, googleProvider)
      .then(result => {
        const user = result.user;
        setUser(user);
        console.log(user);
      })
      .catch((error) => {
        console.log(error);
      })
  }
  const handelGithubSubmit = () => {
    signInWithPopup(auth, githubProvider)
      .then(result => {
        const user = result.user;
        setUser(user)
        console.log(user);

      })
      .catch(error => {
        console.log(error);
      })

  }
  const handelSignOUt = () => {
    signOut(auth)
      .then(() => {
        setUser({})
      })
      .catch(error => {
        setUser({})
      })
  }
  return (
    <div className="App">
      {
        user.uid ? <button onClick={handelSignOUt}>Sign Out</button> :
          <div>
            <button onClick={handelGoogleSubmit}>Google Sign In</button>
            <button onClick={handelGithubSubmit}>Github Sign In</button>
          </div>
      }


      <h1>Name: {user.displayName}</h1>
      <p>Email : {user.email}</p>
      <div className='photo'>
        <img src={user.photoURL} alt="" />
      </div>
    </div>
  );
}

export default App;
