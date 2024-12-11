import { BrowserRouter, Route, Routes} from 'react-router-dom'
import Account from './pages/Account'
import Appointments from './pages/Appointments'
import Login from './pages/Login'
import AppointmentAdd from './pages/Appointments-add'

export default function Rotas () {
  return <BrowserRouter>
<Routes>
<Route path='/' element={<Login/>}/>
<Route path='/account' element={<Account/>}/>
<Route path='/appointments' element={<Appointments/>}/>
<Route path='/appointments/add' element={<AppointmentAdd/>}/>
<Route path='/appointments/edit/:id_appointment' element={<AppointmentAdd/>}/>




</Routes>
  </BrowserRouter>
}
