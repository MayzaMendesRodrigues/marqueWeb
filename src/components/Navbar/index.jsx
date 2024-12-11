import { Link, useNavigate } from "react-router-dom"
import logo from "../../assets/logo.webp"
import './style.css'
import api from '../../contants/api'



export default function NavBar() {

  const navigate = useNavigate()

  function Logout () {
    localStorage.removeItem("sessionToken" )
    localStorage.removeItem("sessionId")
    localStorage.removeItem("sessionEmail" )
    localStorage.removeItem("sessionName" )

    api.defaults.headers.commom['Authorization']= ""
    navigate("/")



  }


  return <nav className="navbar  fixed-top navbar-expand-lg bg-body-tertiary" data-bs-theme="dark">
    <div className="container-fluid">
        <Link className="navbar-brain" to="/appointments">
        <img src={logo} alt="" className="navbar-logo" />
        </Link>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>

    <div className="collapse navbar-collapse" id="navbarSupportedContent">

    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
        <Link className="nav-link active" to="/appointments">Appointments</Link>
        </li>
        <li className="nav-item">
        <Link className="nav-link active" to="/pro">Profissionals</Link>
        </li>
    </ul>

    <ul className="navbar-nav">
        <li className="nav-item">
            <div className="btn-group">
  <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
    {localStorage.getItem("sessionName")}
  </button>
  <ul className="dropdown-menu dropdown-menu-end">
    <li><Link className="dropdown-item" to="/">My profile</Link></li>
    <li><hr className="dropdown-divider"/></li>
    <li><a className="dropdown-item" onClick={Logout}>Desconect</a></li>
  </ul>
</div>
            
        </li>
    </ul>

  

</div>


    </div>
    </nav>

  
}
