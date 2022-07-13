import { Navigate, Route, Routes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
//
import Periodo from './pages/Periodo';
import Login from './pages/Login';
import NotFound from './pages/Page404';
import Register from './pages/Register';
import Estados from './pages/Estados';

import DashboardApp from './pages/DashboardApp';
import RequireAuth from './components/RequiredAuth';
import Docentes from './pages/Docentes';
import Perfil from './pages/Perfil';
// ----------------------------------------------------------------------


export default function Router() {
  return (
    <Routes>
      <Route element={<RequireAuth/>}>
        <Route path='/home' element={<DashboardLayout />}>
          <Route path='app' element={<DashboardApp />} />
          <Route path='catalogo/periodo' element={<Periodo />} />
          <Route path='catalogo/estados' element={<Estados />} />
          <Route path='usuarios/docentes' element={<Docentes/>}/>
          <Route path='perfil' element={<Perfil/>}/>
        </Route>
      </Route>

      <Route path='/' element={<LogoOnlyLayout />}>
        <Route path='/' element={<Navigate to={"/home/app"} />} />
        <Route path='login' element={<Login />} />
        <Route path='register' element={<Register />} />
        <Route path='404' element={<NotFound />} />
        <Route path='*' element={<Navigate to="/404" />} />
      </Route>
      <Route path='*' element={<Navigate to="/404" />} />
    </Routes>
  );



}
