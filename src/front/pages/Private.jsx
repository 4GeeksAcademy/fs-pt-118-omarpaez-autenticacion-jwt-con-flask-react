import { useEffect, useState } from "react";
import userServices from "../services/userServices";
import { Link, useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

const Private = () => {
    const {store, dispatch} = useGlobalReducer()
    const navigate = useNavigate()
  const [userData, setUserData] = useState();
  useEffect(() => {
    userServices.private().then((data) => {
         dispatch({type:"save_user", payload: data})

         
       });
  }, []);
  
  
  const handleLogout = () =>{
    dispatch({type:"logged_out"})
    navigate('/')
  }


  return <>
    {!store?.user && 
    <div className="text-center p-5">
    <h2>Esto es privado</h2>
     <Link to={`/login`}>Login</Link>
     </div> }
    {store?.user && 
    <div className="text-center p-5">
    <h2>Bienvenido: {store.user?.name} a tu area privada</h2>
    <div className="h5 text-primary">Tu role es: {store.user?.role}</div>
    <button className="btn btn-primary" onClick={handleLogout}>Cerrar sesión</button>
    </div>
    }
  </>;
};

export default Private;
