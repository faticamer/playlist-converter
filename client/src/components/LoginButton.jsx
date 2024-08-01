import { useAuthContext } from '../context/useAuthContext'

const loginPageRoute = 'http://localhost:5173/login'
const logoutRoute = 'http://localhost:5555/auth/spotify/logout'

const redirect = () => {
    window.location.href = loginPageRoute
}

const logout = () => {
    // This would be the place to implement the logic for signing out of the service(s)
    // If user is authenticated with either service, check which one it is, and reach the endpoint
    window.location.href = logoutRoute
}

const LoginButton = () => {
    const { user } = useAuthContext()

    return (
       <div>
            <div className='cursor-pointer'>
                {!user && (
                    <button onClick={redirect}>Login</button>
                )}
                {user && (
                    <button onClick={logout}>Logout</button>
                )}
            </div> 
       </div>
    )
}

export default LoginButton