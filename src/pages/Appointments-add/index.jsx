import NavBar from "../../components/Navbar";
import {pro, pro_services} from "../../contants/data.js"
import { Link, useParams } from "react-router-dom";


export default function AppointmentAdd() {

    const {id_appointment} = useParams();

  return <>
    <NavBar/>

    <div className="container-fluid mt-page">
        <div className="row col-lg-4 offset-lg-4">
            <div className="col-12 mt-2">
                <h2>
                    {
                        id_appointment > 0 ?  "Edit Appointment" : "  New Appointments"
                    }
                  </h2>

            </div>

            <div className="col-12 mt-4">
                <label htmlFor="pro" className="form-label">Profissional</label>
                <div className="form-control mb-2">
                    <select name="pro" id="pro">
                        <option value="0">Select the profissional</option>

                        {pro.map(p => {
                            return <option key={p.id_pro} value={p.id_pro}>{p.name}</option>
                        })}
                    </select>
                </div>
            </div>

            <div className="col-12 mt-3">
                <label htmlFor="service" className="form-label">Service</label>
                <div className="form-control mb-2">
                    <select name="service" id="service">
                        <option value="0">Select the service</option>

                        {pro_services.map(p => {
                            return <option key={p.id_service} value={p.id_service}>{p.description}</option>
                        })}
                    </select>
                </div>
            </div>

            
            <div className="col-6 mt-3">
                <label htmlFor="bookingDate" className="form-label">Date</label>
                <input type="date" className="form-control mb-2" name="bookingDate"/>
            </div>
            
            <div className="col-6 mt-3">
                <label htmlFor="bookingHours" className="form-label">Hours</label>
                <div className="form-control mb-2">
                    <select name="bookingHours" id="bookingHours">
                        <option value="0">Horarios</option>
                        <option value="18:00">18:00</option>
                        <option value="19:00">19:00</option>
                        <option value="20:00">20:00</option>
                        <option value="21:00">21:00</option>
                    </select>
                </div>
            </div>

            <div className="col-12 mt-4">
                <div className="d-flex justify-content-end">
                    <Link to="#" className="btn btn-outline-secondary me-3">Cancelar</Link>
                    <Link to="/appointments" className="btn btn-secondary">Salvar agendamento</Link>
                </div>
            </div>


        </div>
    </div>
    </>
}
