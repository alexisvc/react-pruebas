import Togglable from './Togglable'
import React, { useState } from 'react'

export const LoginForm = ({ loginUser }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
    
        try {
          loginUser({ username, password })
          setUsername("")
          setPassword("")
        } catch (error) {
          console.error("Error al hacer login:", error)
        }
      }

    return ( 
            <Togglable buttonLabel='Show login'>
                <h2>LOGIN</h2>
                <form onSubmit={handleLoginSubmit}>
                    <div>
                    <input
                        type="text"
                        placeholder="username"
                        value={username}
                        name="username"
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    </div>
                    <div>
                    <input
                        type="password"
                        placeholder="password"
                        value={password}
                        name="password"
                        onChange={(e) => setPassword(e.target.value)}
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