import React, { Component,useState } from 'react';
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import '../css/Pagination.css';
import '../css/Menu.css';
import { Translation } from 'react-i18next';
import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.css';
import paginationFactory from 'react-bootstrap-table2-paginator';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';
import filterFactory, {textFilter} from 'react-bootstrap-table2-filter';
import Tab from "../components/Tab";


const url1 = "https://localhost:44301/DdCodTecReal";
const url2 = "https://localhost:44301/DdOrganismos";
const url3 = "https://localhost:44301/DdRedes";
const url4 = "https://localhost:44301/DdRegimenExplotacion";
const url5 = "https://localhost:44301/DdRegimenGestion";
const url6 = "https://localhost:44301/DdCapasBase";
const url7 = "https://localhost:44301/DdCapasIntermedia";
const url8 = "https://localhost:44301/DdCapasRodadura";
const url9 = "https://localhost:44301/DdCapasSubbase";
var indice ='';

const config = {
  headers: {
      'content-type': 'application/json'
  }
}

class VerEditTrams extends Component{
  
  constructor(props) {
    super(props);
    this.state = {
      offset: 0,
      tableData: [],
      orgtableData: [],
      perPage: 50000,
      currentPage: 0,
      modalInsertar: false,
      modalEliminar: false,
      modalEditar: false,
      activeIndex: 0,
      Index: 0,
      url:'',
      setBtnSeleccionar: false,
      capa:'',
      columnaCapa:'',
      form:{
        codigo:'',
        nombre:'',
        comentario:''
      } 
  }
    


  this.columns = [
    {dataField: 'codigo', text:<Translation ns= "global">{(t) => <>{t('codigo')}</>}</Translation>, sort: true, filter: textFilter()},
    {dataField: 'nombre', text: <Translation ns= "global">{(t) => <>{t('nombre')}</>}</Translation>, sort: true, filter: textFilter()},
    {dataField: 'acciones', text: <Translation ns= "global">{(t) => <>{t( 'Acciones')}</>}</Translation>, formatter: this.ButtonsAcciones}
  ]

  this.columns2 = [
    {dataField: 'codigo', text:<Translation ns= "global">{(t) => <>{t('codigo')}</>}</Translation>, sort: true, filter: textFilter()},
    {dataField: 'nombre', text: <Translation ns= "global">{(t) => <>{t('nombre')}</>}</Translation>, sort: true, filter: textFilter()},
    {dataField: 'acciones', text: <Translation ns= "global">{(t) => <>{t( 'Acciones')}</>}</Translation>, formatter: this.ButtonsAcciones}
  ]

  this.columns3 = [
    {dataField: 'codigo', text:<Translation ns= "global">{(t) => <>{t('codigo')}</>}</Translation>, sort: true, filter: textFilter()},
    {dataField: 'nombre', text: <Translation ns= "global">{(t) => <>{t('nombre')}</>}</Translation>, sort: true, filter: textFilter()},
    {dataField: 'acciones', text: <Translation ns= "global">{(t) => <>{t( 'Acciones')}</>}</Translation>, formatter: this.ButtonsAcciones}
  ]

  this.columns4 = [
    {dataField: 'codigo', text:<Translation ns= "global">{(t) => <>{t('codigo')}</>}</Translation>, sort: true, filter: textFilter()},
    {dataField: 'nombre', text: <Translation ns= "global">{(t) => <>{t('nombre')}</>}</Translation>, sort: true, filter: textFilter()},
    {dataField: 'acciones', text: <Translation ns= "global">{(t) => <>{t( 'Acciones')}</>}</Translation>, formatter: this.ButtonsAcciones}
  ]

  this.columns5 = [
    {dataField: 'codigo', text:<Translation ns= "global">{(t) => <>{t('codigo')}</>}</Translation>, sort: true, filter: textFilter()},
    {dataField: 'nombre', text: <Translation ns= "global">{(t) => <>{t('nombre')}</>}</Translation>, sort: true, filter: textFilter()},
    {dataField: 'acciones', text: <Translation ns= "global">{(t) => <>{t( 'Acciones')}</>}</Translation>, formatter: this.ButtonsAcciones}
  ]

  this.columns6 = [
    {dataField: 'codigo', text:<Translation ns= "global">{(t) => <>{t('codigo')}</>}</Translation>, sort: true, filter: textFilter()},
    {dataField: 'idDdTiposFirmesTramo', text: <Translation ns= "global">{(t) => <>{t('TipFirTram')}</>}</Translation>, sort: true, filter: textFilter()},
    {dataField: 'acciones', text: <Translation ns= "global">{(t) => <>{t( 'Acciones')}</>}</Translation>, formatter: this.ButtonsAcciones}
  ]

  this.state.columnaCapa = this.columns6

  this.columns7 = [
    {dataField: 'codigo', text:<Translation ns= "global">{(t) => <>{t('codigo')}</>}</Translation>, sort: true, filter: textFilter()},
    {dataField: 'idDdTiposFirmesTramo', text: <Translation ns= "global">{(t) => <>{t('TipFirTram')}</>}</Translation>, sort: true, filter: textFilter()},
    {dataField: 'acciones', text: <Translation ns= "global">{(t) => <>{t( 'Acciones')}</>}</Translation>, formatter: this.ButtonsAcciones}
  ]

  this.columns8 = [
    {dataField: 'codigo', text:<Translation ns= "global">{(t) => <>{t('codigo')}</>}</Translation>, sort: true, filter: textFilter()},
    {dataField: 'idDdTiposFirmesTramo', text: <Translation ns= "global">{(t) => <>{t('TipFirTram')}</>}</Translation>, sort: true, filter: textFilter()},
    {dataField: 'acciones', text: <Translation ns= "global">{(t) => <>{t( 'Acciones')}</>}</Translation>, formatter: this.ButtonsAcciones}
  ]

  this.columns9 = [
    {dataField: 'codigo', text:<Translation ns= "global">{(t) => <>{t('codigo')}</>}</Translation>, sort: true, filter: textFilter()},
    {dataField: 'idDdTiposFirmesTramo', text: <Translation ns= "global">{(t) => <>{t('TipFirTram')}</>}</Translation>, sort: true, filter: textFilter()},
    {dataField: 'acciones', text: <Translation ns= "global">{(t) => <>{t( 'Acciones')}</>}</Translation>, formatter: this.ButtonsAcciones}
  ]

  this.pagination = paginationFactory({
    page: 1,
    sizePerPage: 10,
    lastPageText: '>>',
    firstPageText: '<<',
    nextPageText: '>',
    prePageText: '<',
    showTotal: true,
    alwaysShowAllBtns: true,
  })

  }


  ButtonsAcciones = (cell, row, rowIndex) => {
    //console.log("cell :", cell);
      console.log("row: ", row);
    //  console.log("rowindex ", rowIndex);
      
      
    return (
      <div>
      <button className="btn btn-primary" onClick={()=>{this.seleccionarTramo(row); this.setState({modalEditar: true})}}><FontAwesomeIcon icon={faEdit}/></button>
      {"  "}
      <button className="btn btn-danger" onClick={()=>{this.seleccionarTramo(row); this.setState({modalEliminar: true})}}><FontAwesomeIcon icon={faTrashAlt}/></button>
      </div>              

      );
  };

  handleChange=async e=>{
    e.persist();
    await this.setState({
      form:{
        ...this.state.form,
        [e.target.name]: e.target.value
      }
    });
    console.log("Funcion Handle",this.state.form);

    if(this.state.form.codigo === "" || this.state.form.nombre === "" || this.state.form.codigo === undefined || this.state.form.nombre === undefined){
      this.setState({setBtnSeleccionar: false});
    }else{
      this.setState({setBtnSeleccionar: true});
    }

    console.log("Codigo: ",this.state.form.codigo);
    console.log("Codigo: ",this.state.form.nombre);
    console.log("Codigo: ",this.state.setBtnSeleccionar);
    //this.habBtnSeleccionar();

    }


    handleCapa=async e=>{
      e.persist();
      await this.setState({
        form:{
          ...this.state.form,
          [e.target.name]: e.target.value
        }
      });
      console.log("Funcion Handle",e.target.value);
      
      switch(e.target.value) {

        case "CapaBase": 
          this.state.columnaCapa=this.columns6;
          this.state.capa=this.state.tableData6;
          console.log("Capa Base", this.state.capa);
          this.peticionGet6();
        break;
    
        case "CapaIntermedia": 
          this.state.columnaCapa=this.columns7;
          this.state.capa=this.state.tableData7;
          console.log("Capa Intermedia", this.state.capa);
          this.peticionGet7();
        break;
    
        case "CapaRodadura":  
          this.state.columnaCapa=this.columns8;
          this.state.capa=this.state.tableData8;
          console.log("Capa Rodadura", this.state.capa);
          this.peticionGet8();
        break;
    
        case "CapaSubbase":  
          this.state.columnaCapa=this.columns9;
          this.state.capa=this.state.tableData9;
          console.log("Capa SubBase", this.state.capa);
          this.peticionGet9();
        break;
    
        default:  
          this.state.columnaCapa=this.columns6;
          this.state.capa=this.state.tableData6;
          console.log("Default", this.state.capa);
          this.peticionGet6();
        break;
    
        }

      }
  

    checkSwitch=(param)=>{
      console.log("Parametro Switch: ",param);

      switch(param) {

        case 0: return url1;

        case 1: return url2;
   
        case 2:  return url3;
   
        case 3:  return url4;
  
        case 4:  return url5;
   
        case 5:  return url6;

        case 6:  return url7;

        case 7:  return url8;

        case 8:  return url9;
  
        default:  return url1;

        }
   
    }

 habBtnSeleccionar(){
  console.log(this.state.form);

 }

  componentDidMount(){
    this.peticionGet1();
    this.peticionGet2();
    this.peticionGet3();
    this.peticionGet4();
    this.peticionGet5();
    this.peticionGet6();
    this.peticionGet7();
    this.peticionGet8();
    this.peticionGet9();
  }

  onChange = activeIndex => {
    this.setState({
      activeIndex
    });
  };


//Recarga de datos después de una acción dependiendo del Tab
peticionGet=()=>{
  console.log("Indice Tab: ",this.state.Index);

  switch(this.state.Index) {

    case 0: this.peticionGet1();
    break;

    case 1: this.peticionGet2();
    break;

    case 2:  this.peticionGet3();
    break;

    case 3:  this.peticionGet4();
    break;

    case 4:  this.peticionGet5();
    break;

    case 5:  this.peticionGet6();
    break;

    case 6:  this.peticionGet7();
    break;

    case 7:  this.peticionGet8();
    break;

    case 8:  this.peticionGet9();
    break;

    default:  this.peticionGet1();
    break;

    }

}


/*Obtención datos Clasificación técnica real*/
peticionGet1=()=>{
  axios.get(url1).then(response=>{

      console.log(response.data);
      
      //this.setState({data: response.data})
      
      var data = response.data;
      var slice = data.slice(this.state.offset, this.state.offset + this.state.perPage)

      this.setState({
        pageCount: Math.ceil(data.length / this.state.perPage),
        orgtableData: response.data,
        tableData: slice,
        modalImportar: false
      })
  });
}    

/*Obtención datos Organismos*/
peticionGet2=()=>{
  axios.get(url2).then(response2=>{

      console.log(response2.data);
      
      //this.setState({data: response.data})
      
      var data2 = response2.data;
      var slice2 = data2.slice(this.state.offset, this.state.offset + this.state.perPage)

      this.setState({
        pageCount: Math.ceil(data2.length / this.state.perPage),
        orgtableData2: response2.data,
        tableData2: slice2,
        modalImportar: false
      })
  });
}    

/*Obtención datos Redes*/
peticionGet3=()=>{
  axios.get(url3).then(response3=>{

      console.log(response3.data);
      
      //this.setState({data: response.data})
      
      var data3 = response3.data;
      var slice3 = data3.slice(this.state.offset, this.state.offset + this.state.perPage)

      this.setState({
        pageCount: Math.ceil(data3.length / this.state.perPage),
        orgtableData3: response3.data,
        tableData3: slice3,
        modalImportar: false
      })
  });
}    


/*Obtención datos Régimen Exploatción*/
peticionGet4=()=>{
  axios.get(url4).then(response4=>{

      console.log(response4.data);
      
      //this.setState({data: response.data})
      
      var data4 = response4.data;
      var slice4 = data4.slice(this.state.offset, this.state.offset + this.state.perPage)

      this.setState({
        pageCount: Math.ceil(data4.length / this.state.perPage),
        orgtableData4: response4.data,
        tableData4: slice4,
        modalImportar: false
      })
  });
}    


/*Obtención datos Régimen Gestión*/
peticionGet5=()=>{
  axios.get(url5).then(response5=>{

      console.log(response5.data);
      
      //this.setState({data: response.data})
      
      var data5 = response5.data;
      var slice5 = data5.slice(this.state.offset, this.state.offset + this.state.perPage)

      this.setState({
        pageCount: Math.ceil(data5.length / this.state.perPage),
        orgtableData5: response5.data,
        tableData5: slice5,
        modalImportar: false
      })
  });
}    

/*Obtención datos Capa Base*/
peticionGet6=()=>{
  axios.get(url6).then(response6=>{

      console.log(response6.data);
      
      var data6 = response6.data;
      var slice6 = data6.slice(this.state.offset, this.state.offset + this.state.perPage)

      this.setState({
        pageCount: Math.ceil(data6.length / this.state.perPage),
        orgtableData6: response6.data,
        tableData6: slice6,
        modalImportar: false,
        capa: slice6
      })
  });
  
}    

/*Obtención datos Capa intermedia*/
peticionGet7=()=>{
  axios.get(url7).then(response7=>{

      console.log(response7.data);
      
      var data7 = response7.data;
      var slice7 = data7.slice(this.state.offset, this.state.offset + this.state.perPage)

      this.setState({
        pageCount: Math.ceil(data7.length / this.state.perPage),
        orgtableData7: response7.data,
        tableData7: slice7,
        modalImportar: false
      })
  });
}    

/*Obtención datos Capa Rodadura*/
peticionGet8=()=>{
  axios.get(url8).then(response8=>{

      console.log(response8.data);
      
      var data8 = response8.data;
      var slice8 = data8.slice(this.state.offset, this.state.offset + this.state.perPage)

      this.setState({
        pageCount: Math.ceil(data8.length / this.state.perPage),
        orgtableData8: response8.data,
        tableData8: slice8,
        modalImportar: false
      })
  });
}    

/*Obtención datos Capa Subbase*/
peticionGet9=()=>{
  axios.get(url9).then(response9=>{

      console.log(response9.data);
      
      var data9 = response9.data;
      var slice9 = data9.slice(this.state.offset, this.state.offset + this.state.perPage)

      this.setState({
        pageCount: Math.ceil(data9.length / this.state.perPage),
        orgtableData9: response9.data,
        tableData9: slice9,
        modalImportar: false
      })
  });
}    

/*Insertar registro*/
modalInsertar=()=>{
  this.setState({modalInsertar: !this.state.modalInsertar});
}

/*Editar registro*/
modalEditar=()=>{
  this.setState({modalEditar: !this.state.modalEditar});
}

/*Editar registro*/
peticionPut=(urlVar)=>{
  const data = new FormData();

  console.log("Codigo a editar: ", this.state.form.codigo);
  console.log("URL escogida: ", urlVar);

  axios.put(urlVar,this.state.form,config).then(response=>{
    console.log("OK PUT");
    this.setState({modalEditar: false});
    this.peticionGet();
  }).catch(error=>{
    console.log("KO");
    console.log("URL para PUT:", urlVar);
    console.log(data);
    console.log(config);
    console.log("ERROR PUT");
    console.log(error);        
})   
}


/*Editar registro*/
peticionPost=(urlVar)=>{
  const data = new FormData();

  console.log("Objeto a insertar: ", this.state.form);
  console.log("URL escogida: ", urlVar);
  console.log("Validación: ", this.state.setBtnSeleccionar);

  if (this.state.setBtnSeleccionar==true){
    axios.post(urlVar,this.state.form,config).then(response=>{
      console.log("OK POST");
      this.setState({modalInsertar: false});
      this.peticionGet();
      this.setState({setBtnSeleccionar: false});
    }).catch(error=>{
      this.setState({setBtnSeleccionar: false});
      console.log("KO");
      console.log("URL para POST:", urlVar);
      console.log(data);
      console.log(config);
      console.log("ERROR POST");
      console.log(error);        
    })   
  }else{
    alert("Rellena correctamente el formulario");
    this.setState({setBtnSeleccionar: false});
  }
}


/*Eliminar Capa*/
peticionDelete=(urlVar)=>{
  console.log("Codigo a eliminar: ", this.state.form.codigo);
  console.log("URL Delete: ", urlVar);
  axios.delete(urlVar+"/"+this.state.form.codigo).then(response=>{
    console.log("eliminar");
    this.setState({modalEliminar: false});
    this.peticionGet();
  }).catch(error=>{
    console.log("KO Delete");
    console.log(urlVar);
    console.log(this.state.form.codigo);
    console.log(error);        
})   
}
 

//Selecciona una row
seleccionarTramo=(diccionario)=>{
  console.log("seleccionarTramo");
  console.log("Diccionario",diccionario);
  this.setState({
    tipoModal: 'actualizar',
    form: {
      codigo: diccionario.codigo,
      nombre: diccionario.nombre,
      comentario: ''
    }
  })

  console.log("Codigo a eliminar: ", diccionario.codigo);
}   

    render(url){
        const { activeIndex } = this.state;
            const tabs = [
      {
       

        label: <Translation ns= "global">{(t) => <>{t('ClasTecReal')}</>}</Translation>,
        
        content: (
          <div>
             
              {"  "}
              <button className="btn btn-primario" onClick={()=>{this.setState({form: null, tipoModal: 'insertar'}); this.modalInsertar()}}>Añadir Registro</button>      
              <br /><br />
              <BootstrapTable  
              bootstrap4 
              keyField='codigo' 
              columns={this.columns} 
              data={this.state.tableData}
              pagination={this.pagination}
              filter={filterFactory()}
              bordered={ false } >
              </BootstrapTable>

          </div>

        ),
        disabled: false
      },
      {
        label: <Translation ns= "global">{(t) => <>{t('Organismos')}</>}</Translation>,
        content: (
          <div>
             {"  "}
            <button className="btn btn-primario" onClick={()=>{this.setState({form: null, tipoModal: 'insertar'}); this.modalInsertar()}}>Añadir Registro</button>      

           <br /><br />
            <BootstrapTable  
            bootstrap4 
            keyField='codigo' 
            columns={this.columns2} 
            data={this.state.tableData2}
            pagination={this.pagination}
            filter={filterFactory()}
            bordered={ false } >
            </BootstrapTable>
          </div>
        ),
        disabled: false
      },
     {
        label: <Translation ns= "global">{(t) => <>{t('ClasFunRedes')}</>}</Translation>,
        content: (
          <div>
             {"  "}
            <button className="btn btn-primario" onClick={()=>{this.setState({form: null, tipoModal: 'insertar'}); this.modalInsertar()}}>Añadir Registro</button>      
            <br /><br />
            <BootstrapTable  
            bootstrap4 
            keyField='codigo' 
            columns={this.columns3} 
            data={this.state.tableData3}
            pagination={this.pagination}
            filter={filterFactory()}
            bordered={ false } >
            </BootstrapTable>
          </div>
        ),
        disabled: false
      },

      {
        label: <Translation ns= "global">{(t) => <>{t('RegExpl')}</>}</Translation>,
        content: (
          <div>
            {"  "}
            <button className="btn btn-primario" onClick={()=>{this.setState({form: null, tipoModal: 'insertar'}); this.modalInsertar()}}>Añadir Registro</button>      
            <br /><br />
            <BootstrapTable  
            bootstrap4 
            keyField='codigo' 
            columns={this.columns4} 
            data={this.state.tableData4}
            pagination={this.pagination}
            filter={filterFactory()}
            bordered={ false } >
            </BootstrapTable>
          </div>
        ),
        disabled: false
      },
      {
        label: <Translation ns= "global">{(t) => <>{t('RegGest')}</>}</Translation>,
        content: (
          <div>
            {"  "}
            <button className="btn btn-primario" onClick={()=>{this.setState({form: null, tipoModal: 'insertar'}); this.modalInsertar()}}>Añadir Registro</button>      
            <br /><br />
            <BootstrapTable  
            bootstrap4 
            keyField='codigo' 
            columns={this.columns5} 
            data={this.state.tableData5}
            pagination={this.pagination}
            filter={filterFactory()}
            bordered={ false } >
            </BootstrapTable>
          </div>
        ),
        disabled: false
      },
     {
        label:  <Translation ns= "global">{(t) => <>{t('Capas')}</>}</Translation>,
        content: (
          <div>
             {"  "}
            <button className="btn btn-primario" onClick={()=>{this.setState({form: null, tipoModal: 'insertar'}); this.modalInsertar()}}>Añadir Registro</button>   
            <span style={{float: 'right'}}>
            <select onChange={this.handleCapa}>
                <option value="CapaBase">Capa Base</option>
                <option value="CapaIntermedia">Capa Intermedia</option>
                <option value="CapaRodadura">Capa Rodadura</option>
                <option value="CapaSubbase">Capa Subbase</option>
              </select>
            </span>
   
            <br /><br />
            <BootstrapTable  
            bootstrap4 
            keyField={'codigo', 'IdDdTiposFirmesTramo'}
            columns={this.state.columnaCapa} 
            data={this.state.capa}
            pagination={this.pagination}
            filter={filterFactory()}
            bordered={ false } >
            </BootstrapTable>
          </div>
        ),
        disabled: false
      }


    ];

        return(

          indice= {activeIndex},
          this.state.Index=indice.activeIndex,
          console.log("Indice: ",this.state.Index),
          this.state.url=this.checkSwitch(indice.activeIndex),
          console.log("URL elegida: ",this.state.url),

          <div className="App"> 

          <Tab activeIndex={activeIndex} onChange={this.onChange} tabs={tabs} />  

          <Modal  size="lg" style={{maxWidth: '800px', width: '60%'}} isOpen={this.state.modalInsertar}>
                <ModalHeader style={{display: 'block'}}>
                Insertar registro
                  <span style={{float: 'right'}} onClick={()=>this.modalInsertar()}>x</span>
                </ModalHeader>
                <ModalBody>
                 
                <div className="form-group">
                    <label htmlFor="id">Codigo</label>
                    <input className="form-control" type="text" maxLength = "16" name='codigo' id='codigo' onChange={this.handleChange} />
                    <br />
                    <label htmlFor="nombre">Nombre</label>
                    <input className="form-control" type="text" maxLength = "128" name="nombre" id="nombre" onChange={this.handleChange} />
                  </div>     
                </ModalBody>

                <ModalFooter>                  
                    <button className="btn btn-success" onClick={()=>this.peticionPost(this.state.url)}>Aceptar</button>
                </ModalFooter>
          </Modal>
     
          <Modal isOpen={this.state.modalEliminar}>
            <ModalBody>
               ¿Estás seguro que deseas eliminar el registro?
            </ModalBody>
            <ModalFooter>
              <button className="btn btn-danger" onClick={()=>this.peticionDelete(this.state.url)}>Sí</button>
              <button className="btn btn-primary" onClick={()=>this.setState({modalEliminar: false})}>No</button>
            </ModalFooter>
          </Modal>
          
          <Modal size="lg" style={{maxWidth: '800px', width: '60%'}} isOpen={this.state.modalEditar}>
                <ModalHeader style={{display: 'block'}}>
                  Editar registro
                  <span style={{float: 'right'}} onClick={()=>this.modalEditar()}>x</span>
                </ModalHeader>
                <ModalBody>
                <div className="form-group">
                    <label htmlFor="id">Codigo</label>
                    <input className="form-control" type="text" maxLength = "16" name='codigo' id='codigo' readOnly onChange={this.handleChange} value={this.state.form?this.state.form.codigo: ''}/>
                    <br />
                    <label htmlFor="nombre">Nombre</label>
                    <input className="form-control" type="text" maxLength = "128" name="nombre" id="nombre" onChange={this.handleChange} value={this.state.form?this.state.form.nombre: ''}/>
                  </div>     
                </ModalBody>

                <ModalFooter>                  
                    <button className="btn btn-success" onClick={()=>this.peticionPut(this.state.url)}>Aceptar</button>
                </ModalFooter>
          </Modal>

  
          </div>
        )
    }
}


export default VerEditTrams;