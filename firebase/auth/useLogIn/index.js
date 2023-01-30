import { getAuth, signInWithPopup } from 'firebase/auth'

export const useLogIn = () => {
  const auth = getAuth()
  const logIn = (provider) => {
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log(result)
      }).catch((error) => {
        console.log(error)
      })
  }
  return logIn
}
