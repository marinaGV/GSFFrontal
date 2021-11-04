import React, { useState, Fragment } from 'react';
import axios  from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'
import Error from "../components/Error";
import '../css/Menu.css';
import { useTranslation } from 'react-i18next';


function CargarExcel(){
  
  const { t, i18n } = useTranslation();
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
      /*if (response.data == 1){
          var msg = "El archivo se ha guardado correctamente.";
          setMsgOutBoolOK(true);
          setMsgOutBoolKO(false);
      } 
      if (response.data == 3){
        var msg = "El archivo debe ser de tipo .xls o .xlsx.";
        setMsgOutBoolKO(true);
        setMsgOutBoolOK(false);
      }  */ 
      
    switch(response.data){
      
      case 1:
        var msg = "El archivo se ha guardado correctamente.";
          setMsgOutBoolOK(true);
          setMsgOutBoolKO(false);
          break;
      case 2:
        var msg = "El archivo debe ser de tipo .xls o .xlsx.";
        setMsgOutBoolKO(true);
        setMsgOutBoolOK(false);
        break;
      default:
      var msg = "Error al subir el fichero.";
        setMsgOutBoolKO(true);
        setMsgOutBoolOK(false);
        break;


    } 
  
    guardarMsgOut(msg);
      
      
    }).catch(error=>{
      console.log("prueba2");
      console.log(error);
      guardarMsgOut(error.data);
      var msg = "Error al subir el fichero.";
      setMsgOutBoolKO(true);
      setMsgOutBoolOK(false);
      
    })
    
  }

  

  return (
    <div>
      <br/>
        <h1>{ t('ImpAct') }</h1>
        <p>Idioma : { i18n.language }</p>
        <input type="file" name ="files" onChange={(e)=>subirArchivos(e.target.files[0])} />
        
        <button className="btn btn-primario" onClick={()=>insertarArchivos()}>{ t('Cargar') }</button>
       <br/><br/>
       { msgOutBoolOK ? 
       <div className="alert alert-success">
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