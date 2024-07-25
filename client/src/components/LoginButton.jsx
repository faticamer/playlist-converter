import PropTypes from 'prop-types'

const loginPageRoute = 'http://localhost:5173/login'
const logoutRoute = '/auth/spotify/logout'

const redirect = () => {
    window.location.href = loginPageRoute
}

const logout = () => {
    // This would be the place to implement the logic for signing out of the service(s)
    // If user is authenticated with either service, check which one it is, and reach the endpoint
    window.location.href = logoutRoute
}

const LoginButton = (props) => {
    return (
       <div>
            <div className='cursor-pointer'>
                {props.user
                ?
                <button onClick={redirect}>Login</button>
                :
                <button onClick={logout}>Logout</button>
                }
            </div> 
       </div>
    )
}

LoginButton.propTypes = {
    user : PropTypes.string
}

export default LoginButton