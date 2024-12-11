import "./style.css"
import NavBar from "../../components/Navbar";
import { Link, useNavigate } from "react-router-dom";
import "../../theme/global.css"
import AppointmentsList from "../../components/AppointmentsList/index.jsx";
import { useEffect, useState } from "react";
import api from '../../contants/api.js'


export default function Appointments() {
  const navigate = useNavigate()
  const [appointments, setAppointments] = useState("")
  const [pro, setPro] = useState("")
  const [idPro, setIdPro] = useState("")
  const [dtStart, setDtStart] = useState("")
  const [dtEnd, setDtEnd] = useState("")

  function ClickEdit(id_appointment){
    navigate("/appointments/edit/" + id_appointment)
  }

  function ClickDelete(id_appointment){
    console.log("Delete" + id_appointment)
  }

  async function LoadingProfissionals() {
    console.log("LoadingAppointments...")
    try{
      const response = await api.get("/pro")
        if (response.data) {
setPro(response.data)
        }

    }catch (error){

      if(error.response?.data.error)  {

        if(error.response.status === 401){
          return  navigate("/")
         }
        alert(error.response?.data.error)
      }     else {
        alert ("Erro ao listar os medicos. Tente novamente mais tarde")
      } 
      

    }
  }

  async function LoadingAppointments() {
    console.log("LoadingAppointments...")
    try{
      const response = await api.get("/adm/appointments", {
        params:{
          id_pro:idPro,
          dt_start: dtStart,
          dt_end: dtEnd
        }
      })
        if (response.data) {
setAppointments (response.data)
        }

    }catch (error){

      if(error.response?.data.error)  {
        alert(error.response?.data.error)
      }   if(error.response.status === 401){
       return  navigate("/")
      }
      
      else {
        alert ("Erro ao exibir os agendamentos. Tente novamente mais tarde")
      }
      

    }
  }

  async function ChangePro(e) {
    setIdPro(e.target.value)
    
  }
useEffect(() => {
  LoadingAppointments()
  LoadingProfissionals()
}, [])

  return <div className="">
    <NavBar/>
    <div className="d-flex justify-content-between align-items-center mt-pages container-fluid">
      <div>
        <h2 className="d-inline">Appointments</h2>
        <Link className="btn btn-outline-secondary ms-5 mb-2" to="/appointments/add">
        New appointment
        </Link>
      </div>

      <div className="d-flex justify-content-end">
        <input type="date" id="startDate" className="form-control" onChange={(e) => setDtStart (e.target.value)}/>
        <spam className="m-2"> to </spam>
        <input type="date" id="endDate" className="form-control" onChange={(e) => setDtEnd (e.target.value)} />

        <div className="form-control ms-3 me-3">
          <select name="profissionais" id="Profissionais" value={idPro} onChange={ChangePro}>
            <option value="0">All professionals</option>
            {
              pro.map((profissionais) => {
                return <option  key={profissionais.id_pro}value={profissionais.id_pro}>
                  {profissionais.name}
                </option>
              })
            }

          </select>
        </div>
<button onClick={LoadingAppointments} className="btn btn-secondary" type="button">Filter</button>
      </div>
    </div>

    <div>
    <table className="table table-hover">
  <thead>
    <tr>
      <th scope="col">Client</th>
      <th scope="col">Profissional</th>
      <th scope="col">Service</th>
      <th scope="col">Date/ Hora</th>
      <th scope="col" className="text-end">Price</th>
      <th scope="col" className="cols-buttons"></th>
    </tr>
  </thead>
  <tbody>
  {
      appointments.map((ap) => {
    
       return <AppointmentsList 
       key={ap.id_appointment} 
       id_appointment={ap.id_appointment}
       users={ap.users}
       pro={ap.pro}
       service={ap.service}
       booking_date={ap.booking_date}
       booking_hours={ap.booking_hour}
       price={ap.price}
       clickEdit={ClickEdit}
       clickDelete={ClickDelete}

       />
      })
    }
  </tbody>
</table>
    </div>

    </div>
  
}
