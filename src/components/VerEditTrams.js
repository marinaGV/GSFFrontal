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



const url = "https://localhost:44301/DdCodTecReal";
const url2 = "https://localhost:44301/DdOrganismos";
const url3 = "https://localhost:44301/DdRedes";
const url4 = "https://localhost:44301/DdRegimenExplotacion";
const url5 = "https://localhost:44301/DdRegimenGestion";
const url6 = "https://localhost:44301/DdCapasBase";


class VerEditTrams extends Component{
  
  constructor(props) {
    super(props);
    this.state = {
      offset: 0,
      tableData: [],
      orgtableData: [],
      perPage: 50000,
      currentPage: 0,
      modalImportar: false,
      modalEliminar: false,
      modalEdiatar: false,
      activeIndex: 0,
      form:{
        id: ''
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
    console.log(this.state.form);
    }
    


  componentDidMount(){
    this.peticionGet();
    this.peticionGet2();
    this.peticionGet3();
    this.peticionGet4();
    this.peticionGet5();
    this.peticionGet6();
  }

  onChange = activeIndex => {
    this.setState({
      activeIndex
    });
  };


/*Obtención datos Clasificación técnica real*/
peticionGet=()=>{
  axios.get(url).then(response=>{

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

/*Obtención datos Régimen Gestión*/
peticionGet6=()=>{
  axios.get(url6).then(response6=>{

      console.log(response6.data);
      
      var data6 = response6.data;
      var slice6 = data6.slice(this.state.offset, this.state.offset + this.state.perPage)

      this.setState({
        pageCount: Math.ceil(data6.length / this.state.perPage),
        orgtableData6: response6.data,
        tableData6: slice6,
        modalImportar: false
      })
  });
}    

/*Insertar Capa*/
modalInsertar=()=>{
  this.setState({modalInsertar: !this.state.modalInsertar});
}

/*Editar Capa*/
peticionPut=()=>{
  console.log("Codigo a editar: ", this.state.form.id);
  axios.put(url+"/"+this.state.form).then(response=>{
    console.log("Editar");
    this.modalInsertar();
    this.peticionGet();
  })
}

/*Eliminar Capa*/
peticionDelete=()=>{
  console.log("Codigo a eliminar: ", this.state.form.id);
  axios.delete(url+"/"+this.state.form.id).then(response=>{
    console.log("eliminar");
    this.setState({modalEliminar: false});
    this.peticionGet();
  })
}    
 

seleccionarTramo=(DdCodTecReal)=>{
  console.log("seleccionarTramo");
  console.log(DdCodTecReal);
  this.setState({
    tipoModal: 'actualizar',
    form: {
      id: DdCodTecReal.codigo
    }
  })




  console.log("Codigo a eliminar: ", DdCodTecReal.codigo);
}    

    render(){
        const { activeIndex } = this.state;
            const tabs = [
      {
        label: <Translation ns= "global">{(t) => <>{t('ClasTecReal')}</>}</Translation>,
        content: (
          <div>
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
            <br /><br />
            <BootstrapTable  
            bootstrap4 
            keyField={'codigo', 'IdDdTiposFirmesTramo'}
            columns={this.columns6} 
            data={this.state.tableData6}
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
          
          <div className="App"> 
          <Tab activeIndex={activeIndex} onChange={this.onChange} tabs={tabs} />       
         


          <Modal isOpen={this.state.modalEliminar}>
            <ModalBody>
               ¿Estás seguro que deseas eliminar la Capa?
            </ModalBody>
            <ModalFooter>
              <button className="btn btn-danger" onClick={()=>this.peticionDelete()}>Sí</button>
              <button className="btn btn-secundary" onClick={()=>this.setState({modalEliminar: false})}>No</button>
            </ModalFooter>
          </Modal>
          
          <Modal isOpen={this.state.modalEditar}>
            <ModalBody>
               ¿Estás seguro que deseas editar la Capa?
               <div className="form-group">
                    <label htmlFor="id">ID</label>
                    <input className="form-control" type="text" name="codigo" id="codigo" readOnly onChange={this.handleChange} value={this.state.form? this.state.form.id: this.state.data.length+1}/>
                    <br />
                    <label htmlFor="nombre">Nombre</label>
                    <input className="form-control" type="text" name="nombre" id="nombre" onChange={this.handleChange} value={this.state.form? this.state.form.nombre: ''}/>
               </div>

            </ModalBody>
            <ModalFooter>
              <button className="btn btn-danger" onClick={()=>this.peticionPut()}>Sí</button>
              <button className="btn btn-secundary" onClick={()=>this.setState({modalEditar: false})}>No</button>
            </ModalFooter>
          </Modal>

          </div>
        )
    }
}


export default VerEditTrams;