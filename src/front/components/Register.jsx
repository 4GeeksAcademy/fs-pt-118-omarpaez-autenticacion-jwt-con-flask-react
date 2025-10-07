import { useState } from "react";
import userServices from "../services/userServices";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    role: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    userServices
      .register(formData)
      .then((data) => {
        if(data.success){
            setFormData({
              email: "",
              password: "",
              name: "",
              role: "",
            });
        }
      });
  };
  
  return (
    <div className="container w-50 my-5">
      <form className="form-style" onSubmit={handleSubmit}>
        <h2 className="text-center">Registrate</h2>
        <div className="mb-3">
          <label className="form-label">Nombre</label>
          <input
            type="text"
            value={formData.name}
            name="name"
            onChange={handleChange}
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
          ></input>
        </div>
        <div className="mb-3">
          <label className="form-label">Role</label>
          
          <select class="form-select" id="inputGroupSelect01"  value={formData.role} name="role" onChange={handleChange}>
            <option selected>Indica tu role...</option>
            <option value="ADMIN">Administrador</option>
            <option value="USER">Usuario</option>
            
          </select>
        </div>
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
            value={formData.password}
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
};

export default Register;
