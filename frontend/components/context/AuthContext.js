import { createContext } from 'react'
import { userRouter } from 'next/router'

const AuthContext = createContext()

export const AuthProvider = (props) => {
    const [user, setUser] = useState(null)
    const router = useRouter.push('/')
    /**
     * adds email to user
     * @param {string} email 
     */
    
    const loginUser = async (email) => {
        setUser({ email })
    }
    /**
     * Sets the user to null
     */

    const logoutUser = async () => {
        setUser(null)
        router.push('/')
    }

    return (
        <AuthContext.provider value={{ user, loginUser, logoutUser }}>
            {props.children}
        </AuthContext.provider>
    )
}

export default AuthContext