
import './style.css'
import logo from '../../assets/logo.webp'
import background from '../../assets/background.jpg'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import api from '../../contants/api'




export default function Account() {

  const navigate = useNavigate()
  const [name, setName] = useState ("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState ("")
  const [passwordConfirm, setPasswordConfirm] = useState ("")
  const [msg, setMsg] = useState ("")



async function ExecuteAccount() {
    setMsg("")
    if(!name || !email || !password || !passwordConfirm) {
      setMsg("Por favor preencha todos os campos.")
      return;
    }

    if ( password !== passwordConfirm) {
      setMsg("As senhas nao conhecidem. Digite novamente")
      return;
    }
  

try{
  const response = await api.post("/adm/register", {
    name,
    email,
    password
    
  })

  if(response.data){
    console.log("Conta creada com sucesso:" , response.data) 
    localStorage.setItem("sessionToken" , response.data.token)
    localStorage.setItem("sessionId" , response.data.id_admin)
    localStorage.setItem("sessionEmail" , email)
    localStorage.setItem("sessionName" , name)
    api.defaults.headers.common["Authorization"] = "Bearer " + response.data.token

    navigate("/appointments")

   
  }else {
    setMsg("Erro ao criar conta. Tente novamente mais tarde")
    console.log("Account failed: ",response)
  }

}catch(error) {
  const errorMensage = error.response
  ?error.response.data.error || "Erro na autenticação." :  "Erro de conexão. Verifique sua internet."
setMsg (errorMensage)

  if(error.response){
      setMsg("Ocorreu um erro. Tente novamente mas tarde!")

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
        <form className='form-sign-in'>
          <img src={logo} alt="" className='logo mb-4' />
          <h5 className='mb-5'>Create your account right now</h5>
          <h5 className='mb-4 text-secondary'>Fill in the fields below</h5>

          <div className='mt-4'>
            <input type="name" placeholder='Name' className='form-control' onChange={(e) => setName(e.target.value)}/>
          </div>
          <div className='mt-2'>
            <input type="email" placeholder='E-mail' className='form-control' onChange={(e) => setEmail(e.target.value)}/>
          </div>
          <div className='mt-2'>
            <input type="password" placeholder='Password' className='form-control' onChange={(e) => setPassword(e.target.value)}/>
          </div>
          <div className='mt-2'>
            <input type="password" placeholder='Confirm your password' className='form-control' onChange={(e => setPasswordConfirm(e.target.value))}/>
          </div>


          <div className='mt-3 mb-5'>
            <button className='btn btn-primary w-100' onClick={ExecuteAccount}  type='button'>Create my account</button>
          </div>
          
        {
          msg.length> 0 && (<div className="alert alert-danger" role='alert'>{msg}</div>
          )
        }
          <div>
            <span className='me-1'>I already have an account  </span>
              <Link to="/">Access now!</Link>
           
          </div>
        </form>
      </div>

      <div className="col-sm-7">
        <img src={background} className='background-login'  />
      </div>

    </div>
  )
}
