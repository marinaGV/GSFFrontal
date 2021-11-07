import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import axios  from 'axios';
import { Translation } from 'react-i18next';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Select from 'react-select'
import { View, Text } from "react-native";
import '../css/Menu.css';
import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.css';
/*import TextField from '@material-ui/core/TextField';  
import Autocomplete from '@material-ui/lab/Autocomplete';  
import AppBar from '@material-ui/core/AppBar';  
import Toolbar from '@material-ui/core/Toolbar'; */ 

function CrearEditarActuacion({idAct, tiposActuaciones, carreteras, grafos}){
    //console.log("id: ", idAct);
    //console.log("tip act: ", tiposActuaciones);
    //console.log("carr: ", carreteras);
    //console.log("graf: ", grafos);



    let optionsTiposAct = tiposActuaciones.map(function(elemento){
        return{
        value: elemento.codigo,
        label: elemento.nombre
        };
    })

    let optionsCarreteras = carreteras.map(function(elemento){
        return{
        value: elemento.id,
        label: elemento.nombre
        };
    })

    const url = "https://localhost:44301/api/InsertarActuaciones/";

    const config = {
        headers: {
            'content-type': 'application/json'
        }
    }

    const [Form, actualizarForm] = useState({
        TipoActuacion: '',
        Carretera: '',
        PkIni: '',
        PkFin: '',
        MIni: '',
        MFin: ''
    });


    const [FormActuacion, actualizarFormActuacion] = useState({
        ShowTablaTramos: false,
        ShowCamposComunes: false,
        ClaveObra: ''
    });

    const [TablaTramos, actualizarTablaTramos] = useState([]);
  

    const columnsTramos = [
        {dataField: 'nombre', text:<Translation ns= "global">{(t) => <>{t('Tramo')}</>}</Translation>, align: 'center'},
        {dataField: 'puntoFin.pk', text: <Translation ns= "global">{(t) => <>{t('PKIni')}</>}</Translation>,formatter: (cell, row) =>{return <div>{`${row.puntoIni.pk} + ${row.puntoIni.m}`}</div>;}, align: 'center'},
        {dataField: 'puntoIni.pk', text: <Translation ns= "global">{(t) => <>{t('PKFin')}</>}</Translation>, formatter: (cell, row) =>{return <div>{`${row.puntoFin.pk} + ${row.puntoFin.m}`}</div>;}, align: 'center'},
        {dataField: 'firmesTramo.idCarrilDdTiposFirmesTramo', text: <Translation ns= "global">{(t) => <>{t('TipoFirme')}</>}</Translation>, align: 'center'},
        {dataField: 'idDdTiposCalzada', text: <Translation ns= "global">{(t) => <>{t('TipoCalzada')}</>}</Translation>, align: 'center'},
      ]

    const [btnSeleccionar, setBtnSeleccionar] = useState(false);

    const handleChange=async e=>{
        //e.persist();
        console.log("opción:", e);
       
        await actualizarForm({
            ...Form,
            [e.target.name]: e.target.value
          
        });
    
        console.log(Form);

        habBtnSeleccionar();
   }

   const handleSelectChange=(e, {name})=>{
    //e.persist();
    console.log("opción:", e);
    console.log("name:", name);
   
    actualizarForm({
        ...Form,
        [name]: e.value
      
    });

    console.log(Form);

    habBtnSeleccionar();
}

   const habBtnSeleccionar=()=>{
    console.log("Form: ", Form);
    if((Form.TipoActuacion != '' && Form.TipoActuacion != 0) && Form.Carretera > 0 && Form.PKIni != '' &&
           Form.MIni != '' && Form.PKFin != '' && Form.MFin != ''){
            setBtnSeleccionar(true);
           }
   }

   const [msgOut, guardarMsgOut] = useState();
   const [msgOutBoolOK, setMsgOutBoolOK] = useState(false);
   const [msgOutBoolKO, setMsgOutBoolKO] = useState(false);

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
        //console.log("result: ", response.data.result); 
        var datos = response.data.result;
        //actualizarTablaTramos({nombre:datos.nombre});
        //actualizarTablaTramos((Olddatos)=>[...Olddatos, ...datos]);
        console.log("tabla datos prueba", TablaTramos);
        EvaluarTipoAct(datos);


    }).catch(error=>{
        console.log(error); 
        console.log(error.response.data);  

        setMsgOutBoolKO(true);
        setMsgOutBoolOK(false);  
        
        switch(error.response.data){          
            case 1:
                //PK Ini mayor que PK Fin
                var msg= <Translation ns= "global">{(t) => <>{t('PkIniMayorFin')}</>}</Translation>
                break;
            default:
                var msg= <Translation ns= "global">{(t) => <>{t('ErrorGuardarAct')}</>}</Translation>
                break;
        }

        guardarMsgOut(msg);
      })   
    }


   

    const EvaluarTipoAct=(datos)=>{
        console.log("EvaluarTipoAct");
        //console.log(datos);
        actualizarTablaTramos(datos);
        console.log("tabla tramos: ", TablaTramos);
        actualizarFormActuacion({ShowTablaTramos: true});
        actualizarFormActuacion({ShowCamposComunes: true});


     switch(Form.TipoActuacion){
       
         //Acondicionamiento
         case 'A':
             console.log("acondi");
             actualizarFormActuacion({ShowCamposComunes: true});
             break;
     }
 
    }

    return(

        <div>  
            
          <div className="form-group">
          
          
          { msgOutBoolKO ? 
            <div class="alert alert-danger">
                {/*Mostramos mensaje*/}
                {msgOut}
            </div>
            : ""}
            <br />  
             {/*Desplegable Tipos de Actuaciones*/} 
             <Container>
             <Row>
             <Col xs={2} style={{textAlign: "right"}}><label htmlFor="TipoActuacion"><Translation ns= "global">{(t) => <>{t('TipoAct')}</>}</Translation></label></Col>
             <Col xs={4}>
                 <Select name="TipoActuacion" 
                onChange={handleSelectChange}
                labelKey='nombre'
                valueKey='codigo'
                options={optionsTiposAct}
                defaultValue={{label: "Seleccionar", value: 0}}>               
                </Select>
            <br /></Col>
            
            {/*PK Ini*/} 
            <Col xs={2} style={{textAlign: "right"}}><label htmlFor="PKIni">PK Inicial</label></Col>
                <Col xs={2}><input 
                className="form-control" 
                type="text" 
                name="PkIni" 
                id="PkIni" 
                placeholder="PK"
                onChange={handleChange}/></Col> 
                {/*<Col xs={1}><View style={{ justifyContent: 'center' }}/><Text>+</Text></Col>*/}
                <Col xs={2}><input className="form-control" 
                type="text" 
                name="MIni" 
                id="MIni" 
                placeholder="M"
                onChange={handleChange}/></Col>           
            
            <br />

            {/*Carreteras*/}                                      
            </Row>          
           
            
            
            
            <Row>
            <Col xs={2} style={{textAlign: "right"}}><label htmlFor="Carretera">Carretera</label></Col>
             {/*<Col><input className="form-control" type="text" name="Carretera" id="Carretera" onChange={handleChange}/><br /></Col>*/}
             <Col xs={4}>
            <Select name="Carretera" 
                onChange={handleSelectChange}
                labelKey='nombre'
                valueKey='id'
                options={optionsCarreteras}
                defaultValue={{label: "Seleccionar", value: 0}}>                   
            </Select>
            <br /></Col>    

          
           
            {/*PK Fin*/} 
            <Col xs={2} style={{textAlign: "right"}}><label htmlFor="PKFin">PK Final</label></Col> 
            <Col xs={2}><input className="form-control" 
                                type="text" 
                                name="PkFin" 
                                id="PkFin" 
                                placeholder="PK"
                                onChange={handleChange}/></Col> 
            <Col xs={2}><input className="form-control" 
                                type="text" 
                                name="MFin" 
                                id="MFin" 
                                placeholder="M"
                                onChange={handleChange}/><br /></Col> 
            <br />
            </Row>
            </Container>
            
            <Container>
               <Row>
                   <Col xs={10}></Col>
                <Col xs={2} style={{textAlign: "right"}}><button className="btn btn-primario" 
                                                        onClick={()=>peticionSeleccionar()} 
                                                        disabled = {btnSeleccionar === false}>Seleccionar
                                                        </button></Col>
                <br />
                </Row>
            </Container>
            <br />

            {FormActuacion.ShowTablaTramos == true ?
           
            <Container>      
                <Row>        
                <BootstrapTable 
                    bootstrap4 
                    keyField='id' 
                    columns={columnsTramos} 
                    data={TablaTramos}
                />   
                </Row>     
            </Container>  
          : null}
          
            </div>

            
          
          {FormActuacion.ShowCamposComunes == true ? 
          <Container>
          <Row>
                <Col xs={2} style={{textAlign: "right"}}><label htmlFor="ClaveObra">Clave de Obra</label></Col>
                <Col xs={2}><input className="form-control" type="text" name="ClaveObra" id="ClaveObra" onChange={handleChange}/></Col>              

                <Col xs={2} style={{textAlign: "right"}}><label htmlFor="ClaveObra">Sentido</label></Col>
                <Col xs={2}><input 
                                    type="checkbox" 
                                    name="Creciente"
                                    onChange={handleChange}/>Creciente   
                                    <br />                    
                <input 
                                    type="checkbox" 
                                    name="Decreciente" 
                                    onChange={handleChange}/>Decreciente</Col>                       
                       
            </Row>
            </Container>
          : null}
        </div>
        )
}

export default CrearEditarActuacion;