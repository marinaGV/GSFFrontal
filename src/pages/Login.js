import React, {useState} from 'react';
import md5 from 'md5';
import 'bootstrap/dist/css/bootstrap.min.css';
import Cookies from 'universal-cookie';
import axios from 'axios';
import '../css/Login.css';
import Error from "../components/Error";
import { ClassNames } from '@emotion/react';


function Login(props){

    const baseUrl="https://localhost:44301/api/login";
    const cookies = new Cookies();
    const [error, guardarError] = useState(false);


    const [form, setForm]=useState({
        mail:'',
        password:''
    });

    const handleChange=e=>{
        console.log("dfsdf") 
        const {name, value} = e.target;
        setForm({
            ...form,
            [name]: value
        });
        console.log(form);
    }

    var componente;

    const iniciarSesion=async()=>{
        console.log("dfsdf")   
        await axios.get(baseUrl+`/${form.mail}/${form.password}`)
        .then(response=>{    
            console.log("dfsdf")       
            return response.data;
        }).then(response=>{  
            //Usuario y contraseña correctos -> Se entra al menú principal  
            console.log("dfsdf")      
            var respuesta=response[0];
            cookies.set('id', respuesta.id, {path:'/'});
            props.history.push('menu');
        }).catch(error=>{
            //Usuario o contraseña incorrectos
            console.log("PRUEBA3");
            console.log(error);
            //alert('El usuario o la contraseña no son correctos.');
            guardarError(true);            
        })
    }

    if(error){
        //Mensaje de error
        componente = <Error mensaje='Datos incorrectos.'/>
        console.log(componente);
    }

    return(
       
        <div className="form-usuario">
            <div className="contenedor-form sombra-dark">
            <h1>Iniciar Sesión</h1>
                <div className="form-group">
                <div className="campo-form">
                    <label>Usuario: </label>
                    <br />
                    <input
                        type="text"
                        className="form-control"
                        name="mail"
                        onChange={handleChange}
                    />
                    </div>

                    <div className="campo-form">
                    <label>Contraseña: </label>
                    <br />
                    <input
                        type="password"
                        className="form-control"
                        name="password"
                        onChange={handleChange}
                    />
                    <br />
                    </div>
                    
                    <button className="btn btn-primario btn-block" onClick={()=>iniciarSesion()} style={{marginTop: '5%'}}>Iniciar sesión</button>
                    <br />
               
                    
                    </div>
                    {componente}
                </div>                        
        </div>           
    )
}

export default Login;