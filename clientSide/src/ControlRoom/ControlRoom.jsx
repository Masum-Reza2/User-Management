import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth"
import { createContext } from "react"
import auth from "../Firebase/firebase.config"

export const GlobalContext = createContext()

const ControlRoom = ({ children }) => {

    // create user 
    const createUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password)
    }

    // login User
    const loginUser = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
    }

    const globalInfo = {
        createUser,
        loginUser
    }
    return (
        <GlobalContext.Provider value={globalInfo}>
            {children}
        </GlobalContext.Provider>
    )
}

export default ControlRoom