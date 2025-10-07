import { useState } from "react"
import userServices from "../services/userServices"
import useGlobalReducer from "../hooks/useGlobalReducer"
import { useNavigate } from "react-router-dom"
const Login = () =>{
    const navigate = useNavigate()
    const [error, setError] = useState()
    const [formData, setFormData] = useState({
        email:"",
        password:""

    })
    const {store, dispatch} = useGlobalReducer()
    const handleChange = (e) =>{
        const {name, value} = e.target 
        setFormData({...formData, [name]: value})

    }

    const handleSubmit = (e) =>{
        e.preventDefault()
        userServices.login(formData).then(data =>{
           
            if(data.success){
                localStorage.setItem('token', data.token)
                dispatch({type:'logged_in'})
                
                navigate('/private')
            } else {
                setError(data.data)
            }
        } )
    }



      return (
        <div className="container w-50 my-5">
          {error && (
            <div class="alert alert-danger" role="alert">
              {error}
            </div>
          )}
          <form className="form-style" onSubmit={handleSubmit}>
            <h2 className="text-center">Inciar sesión</h2>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                value={formData.email}
                name="email"
                onChange={handleChange}
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
              ></input>
            </div>
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                alue={formData.password}
                name="password"
                onChange={handleChange}
                className="form-control"
                id="exampleInputPassword1"
              ></input>
            </div>

            <button type="submit" className="btn btn-primary">
              Enviar
            </button>
          </form>
        </div>
      );

    
}

export default Login