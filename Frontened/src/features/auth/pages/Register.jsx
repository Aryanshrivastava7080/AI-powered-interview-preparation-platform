import React, { useActionState, useState } from 'react'
import {useNavigate, Link, unstable_useRouterState} from 'react-router'
import {useAuth} from '../hooks/useAuth'

const Register =()=>{

    const navigate= useNavigate()
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setpassword] = useState("")
     
    const{loading,handleRegister} = useAuth()

    const handleSubmit = async (e) => {
        e.preventDefault()
        await handleRegister({username,email,password})
        navigate("/")
    }
    if(loading){
        return (<main><h1>Loading.........</h1></main>)
    }

    // const handleSubmit = (e) => {
    //     e.preventDefault()
    // }


    return(
          <main>
            <div className="form-container">
            <h1>Register</h1>


            <form onSubmit={handleSubmit}>
                 <div className="input-group">
                    <label htmlFor='Username'>Username</label>
                    <input 
                    onChange={(e)=>{setUsername(e.target.value)}}
                    type='Username' id='Username' name='Username' placeholder='Enter ypur Username'/>

                </div>
                <div className="input-group">
                    <label htmlFor='email'>Email</label>
                    <input 
                     onChange={(e)=>{setEmail(e.target.value)}}
                    type='email' id='email' name='email' placeholder='Enter ypur email'/>

                </div>
                 <div className="input-group">
                    <label htmlFor='password'>Password</label>
                    <input
                     onChange={(e)=>{setpassword(e.target.value)}}
                    type='password' id='password' name='password' placeholder='Enter ypur password'/>

                </div>

                <button className="button primary-button">Register</button>

            </form>

            <p>Already have an account? <Link  to="/login" > Login</Link>  </p>
</div>

            </main>
    )
}


export default Register;