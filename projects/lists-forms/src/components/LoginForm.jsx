import Togglable from './Togglable'

export const LoginForm = ({handleLoginSubmit, username, handleUsernameChange, password, handlePasswordChange}) => {

    return ( 
            <Togglable buttonLabel='Show login'>
                <h3>LOGIN</h3>
                <form onSubmit={handleLoginSubmit}>
                    <div>
                    <input
                        type="text"
                        placeholder="username"
                        value={username}
                        name="username"
                        onChange={handleUsernameChange}
                    />
                    </div>
                    <div>
                    <input
                        type="password"
                        placeholder="password"
                        value={password}
                        name="password"
                        onChange={handlePasswordChange}
                    />
                    </div>
                    <div>
                    <button>
                        Login
                    </button>
                    </div>
                </form>
            </Togglable>
      )
    }