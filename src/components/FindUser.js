import React, { useState } from "react";
import "../style/FindUser.css";

const API_URL = "http://pzelaya-001-site1.atempurl.com/ObtenerClave?Usuario=";

const User = () => {
  const [username, setUsername] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setData(null);
    try {
      if(!username){
        setData("Sin Datos")
        return false;
      }
      const response = await fetch(`${API_URL}${username}`);
      const jsonData = await response.json();
      setData(jsonData);
      setUsername("");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (event) => {
    setUsername(event.target.value);
  };

  return (
    <div className="container">
      <h1>Ingrese su nombre de usuario:</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={username}
          onChange={handleChange}
          placeholder="Ingrese su nombre de usuario"
        />
        <button type="submit" disabled={loading}>
          {loading ? "Cargando..." : "Enviar"}
        </button>
      </form>
      {error && <p className="error">{error}</p>}
      {data && (
        <table className="table">
          <thead>
            <tr>
              <th>Usuario</th>
              <th>Nombre</th>
              <th>Clave</th>
              <th>Procedencia</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{data.usuario}</td>
              <td>{data.nombreCompleto}</td>
              <td>{data.claveDesencriptada}</td>
              <td>{data.procedencia}</td>
            </tr>
          </tbody>
        </table>
      )}
    </div>
  );
};

export default User;