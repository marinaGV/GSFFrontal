import React, { useState } from 'react';
import axios  from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'
import Error from "../components/Error";
import '../css/Menu.css';


function CargarExcel(){

  const url = "https://localhost:44301/api/cargaractuaciones";

  const config = {
    headers: {
        'content-type': 'multipart/form-data'
    }
}

  const [archivo, setArchivo]=useState(null);
  const [msgOut, guardarMsgOut] = useState();
  const [msgOutBoolOK, setMsgOutBoolOK] = useState(false);
  const [msgOutBoolKO, setMsgOutBoolKO] = useState(false);

  const subirArchivos=e=>{
    setArchivo(e);
  }

  const insertarArchivos=async()=>{
    const f = new FormData();
    console.log(archivo);
    f.append('Fichero',archivo);
    console.log(f);

    

    await axios.post(url, f, config)
    .then(response =>{
      console.log(response.data);     
      guardarMsgOut(response.data);
      setMsgOutBoolOK(true);
      setMsgOutBoolKO(false);
      
    }).catch(error=>{
      console.log("prueba2");
      console.log(error);
      guardarMsgOut(error.data);
      setMsgOutBoolKO(true);
      setMsgOutBoolOK(false);
    })
  }



  return (
    <div>
      <br/>
        <h1>Importar Actuaciones</h1>
     
        <input type="file" name ="files" onChange={(e)=>subirArchivos(e.target.files[0])} />
        
        <button className="btn btn-primario" onClick={()=>insertarArchivos()}>Cargar</button>
       <br/><br/>
       { msgOutBoolOK ? 
       <div class="alert alert-success">
          {/*Mostramos mensaje*/}
          {msgOut}
      </div>
      : ""}

      { msgOutBoolKO ? 
       <div class="alert alert-danger">
          {/*Mostramos mensaje*/}
          {msgOut}
      </div>
      : ""}
      
      </div>
  )

}

export default CargarExcel;