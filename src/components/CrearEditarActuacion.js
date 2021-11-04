import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import axios  from 'axios';
import { Translation } from 'react-i18next';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { View, Text } from "react-native";
import '../css/Menu.css';
/*import TextField from '@material-ui/core/TextField';  
import Autocomplete from '@material-ui/lab/Autocomplete';  
import AppBar from '@material-ui/core/AppBar';  
import Toolbar from '@material-ui/core/Toolbar'; */ 

function CrearEditarActuacion({idAct, tiposActuaciones, carreteras, grafos}){
    console.log("id: ", idAct);
    console.log("tip act: ", tiposActuaciones);
    console.log("carr: ", carreteras);
    console.log("graf: ", grafos);

    const url = "https://localhost:44301/api/InsertarActuaciones/";

    const config = {
        headers: {
            'content-type': 'application/json'
        }
    }

    const [Form, actualizarForm] = useState({
        TipoActuacion: '',
        Carretera: '',
        Grafo: '',
        PkIni: '',
        PkFin: '',
        MIni: '',
        MFin: ''
    });


    const [FormActuacion, actualizarFormActuacion] = useState({
        ShowClaveObra: false,
        ClaveObra: ''
    });

    const [TablaTramos, actualizarTablaTramos] = useState({
        DatosTramos: []
 
    });

    const columnsTramos = [
        {dataField: 'nombre', text:<Translation ns= "global">{(t) => <>{t('Tramo')}</>}</Translation>},
        {dataField: 'PKIni', text: <Translation ns= "global">{(t) => <>{t('PKIni')}</>}</Translation>},
        {dataField: 'PKFin', text: <Translation ns= "global">{(t) => <>{t('PKFin')}</>}</Translation>},
        {dataField: '', text: <Translation ns= "global">{(t) => <>{t('TipoFirme')}</>}</Translation>},
        {dataField: 'idDdTiposCalzada', text: <Translation ns= "global">{(t) => <>{t('TipoCalzada')}</>}</Translation>},
      ]

    const [btnSeleccionar, setBtnSeleccionar] = useState(false);

    const handleChange=async e=>{
        e.persist();
        console.log(e);
       
        await actualizarForm({
            ...Form,
            [e.target.name]: e.target.value
          
        });

        console.log(Form);

        if(Form.TipoActuacion != '' && Form.Carretera != '' && Form.PKIni != '' &&
           Form.MIni != '' && Form.PKFin != '' && Form.MFin != ''){
            setBtnSeleccionar(true);
           }

        habBtnSeleccionar();
   }

   const habBtnSeleccionar=()=>{
    console.log(Form);

   }

   

   const peticionSeleccionar=async e=>{
    const data = new FormData();


    console.log("peticionSeleccionar");   
    console.log(Form); 
    //var data= JSON.stringify(Form);
    //data.append('TipoActuacion',Form.TipoActuacion);
    data.append('idCarretera',Form.Carretera);
    data.append('PkIni',Form.PkIni);
    data.append('MIni',Form.MIni);
    data.append('PkFin',Form.PkFin);
    data.append('MFin',Form.MFin);


    await axios.post(url, data, config)
    .then(response =>{
        console.log("OK1");
        console.log(response.data); 
        actualizarTablaTramos({DatosTramos: response.data.result});
        console.log(TablaTramos);
        EvaluarTipoAct();

    }).catch(error=>{
        console.log(error);        
      })   
    }

    const EvaluarTipoAct=()=>{
        console.log("EvaluarTipoAct");
     switch(Form.TipoActuacion){
       
         //Acondicionamiento
         case 'Acondicionament':
             console.log("acondi");
             actualizarFormActuacion({ShowClaveObra: true});
             break;
     }
 
    }

    return(

        <div>          
          <div className="form-group">
             {/*Desplegable Tipos de Actuaciones*/} 
             <Container>
             <Row>
             <Col xs={2}><label htmlFor="TipoActuacion"><Translation ns= "global">{(t) => <>{t('TipoAct')}</>}</Translation></label></Col>
             <Col xs={4}><select name="TipoActuacion" className="form-control" onChange={handleChange}>
                {tiposActuaciones.map(elemento=>(
                    <option key={elemento.id} value={elemento.id}>{elemento.nombre}</option>
                )
                )}
            </select>
            <br /></Col>
            </Row>
           

            {/*Carreteras*/}             
             <Row>
             <Col xs={2}><label htmlFor="Carretera">Carretera</label></Col>
             {/*<Col><input className="form-control" type="text" name="Carretera" id="Carretera" onChange={handleChange}/><br /></Col>*/}
             <Col xs={4}><select name="Carretera" className="form-control" onChange={handleChange}>
                {carreteras.map(elemento=>(
                    <option key={elemento.id} value={elemento.id}>{elemento.nombre}</option>
                )
                )}
            </select>
            <br /></Col>
            </Row>
          

            {/*Desplegable Grafo*/} 
           
             <Row>
             <Col xs={2}><label htmlFor="Grafo">Grafo</label></Col>
             <Col xs={4}><select name="Grafo" className="form-control" onChange={handleChange}>
                {grafos.map(elemento=>(
                    <option key={elemento.id} value={elemento.id}>{elemento.nombre}</option>
                )
                )}
            </select>
            <br /></Col>
            </Row>
           
            
            {/*PK Ini*/} 
            
            <Row>
                <Col xs={2}><label htmlFor="PKIni">PK Inicial</label></Col>
                <Col xs={2}><input className="form-control" type="text" name="PkIni" id="PkIni" onChange={handleChange}/></Col> 
                {/*<Col xs={1}><View style={{ justifyContent: 'center' }}/><Text>+</Text></Col>*/}
                <Col xs={2}><input className="form-control" type="text" name="MIni" id="MIni" onChange={handleChange}/></Col>           
            </Row>
            <br />

          
            <Row>
            {/*PK Fin*/} 
            <Col xs={2}><label htmlFor="PKFin">PK Final</label></Col> 
            <Col xs={2}><input className="form-control" type="text" name="PkFin" id="PkFin" onChange={handleChange}/></Col> 
            <Col xs={2}><input className="form-control" type="text" name="MFin" id="MFin" onChange={handleChange}/><br /></Col> 
            <br />
            </Row>
            </Container>

            <button className="btn btn-primario" onClick={()=>peticionSeleccionar()} disabled = {btnSeleccionar === false}>Seleccionar</button>
                {/*<Autocomplete 
                    id="Carretera"
                    options={actuaciones}
                    getOptionLabel={option => option.Name}
                    style={{ width: 300}}
                    renderInput={ params => (
                        <TextField {...params} label="Autocomplete" variant="outlined" fullWidth />  
                    )}
                    />*/}
          </div>

          {FormActuacion.ShowClaveObra == true ? <button className="btn btn-primario">Seleccionar</button> : null}
        </div>
        )
}

export default CrearEditarActuacion;