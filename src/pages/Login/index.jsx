import './style.css'
import logo from '../../assets/logo.webp'
import background from '../../assets/background.jpg'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import api from '../../contants/api.js'



export default function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState ("")
  const [msg, setMsg] = useState ("")


async function ExecuteLogin () {
    setMsg("")

try{
  const response = await api.post("/admin/login", {
    email,
    password
  })

  if(response.data){
    console.log(response.data) 
    localStorage.setItem("sessionToken" , response.data.token)
    localStorage.setItem("sessionId" , response.data.id_admin)
    localStorage.setItem("sessionEmail" , response.data.email)
    localStorage.setItem("sessionName" , response.data.name)
    api.defaults.headers.common["Authorization"] = "Bearer " + response.data.token


    navigate("/appointments")



   
  }else {
    setMsg("Usuário ou senha incorretos.")
    console.log("Login failed",response)
  }
}catch(error) {
  setMsg(error.response?error.response.data.error : "Erro na autenticação.")
  if(error.response){

    if(error.response.status === 404) {
        setMsg("Usuário não cadastrado")
    } else {
      setMsg("Ocorreu um erro. Tente novamente mas tarde!")

    }
    console.log("Error Response Data:" + error.response.data)
    console.log("Error Status:" + error.response.status)

  } else {
    console.log("Error:", error.message)
    setMsg("Erro de conexao. Verifique sua internet.")

  }
}
   

   
  }
  return (
    <div className="row">

      <div className="col-sm-5 d-flex justify-content-center text-center align-items-center">
        <form className='form-sign-in' onSubmit={ExecuteLogin}>
          <img src={logo} alt="" className='logo mb-4' />
          <h5 className='mb-5'>Manage your appointments effortlessly.</h5>
          <h5 className='mb-4 text-secondary'>Access your account</h5>

          <div className='mt-4'>
            <input type="email" placeholder='E-mail' className='form-control'
            onChange={(e)=> setEmail(e.target.value)} value={email} required
            />
          </div>
          <div className='mt-2'>
            <input type="password" placeholder='Password' className='form-control'
            onChange={(e)=> setPassword(e.target.value)} value={password} required
/>
          </div>

          <div className='mt-3 mb-5'>
            <button type='submit' className='btn btn-primary w-100' >Login</button>
          </div>

        {
          msg && (<div className="alert alert-danger">{msg}</div>
          )
        }
          <div>
            <span className='me-1'>I don&#39;t have an account.
              <Link to="/account">Create one now!</Link>
            </span>
          </div>
        </form>
      </div>

      <div className="col-sm-7">
        <img src={background} className='background-login'  />
      </div>

    </div>
  )
}
