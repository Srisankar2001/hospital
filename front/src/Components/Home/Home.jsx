import React, { useContext } from 'react'
import { AppContext } from '../../App'

export const Home = () => {
    const {user} = useContext(AppContext)

    return(
        <div>
            <h1>Home</h1>
            {user ? <div><h3>ID:{user.id}</h3><h3>Name:{user.name}</h3><h3>Role:{user.role}</h3></div> : <h1>Hello, Guest!</h1>}
        </div>
    )

}
