import React, { Component } from 'react';
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { Form, Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import ReactPaginate from 'react-paginate';
import '../css/Pagination.css';
import CargarExcel from "../components/CargarExcel";
import '../css/Menu.css';
import { Table } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { i18n } from "../config/i18n";
import { Trans } from 'react-i18next';



const url = "https://localhost:44301/actuaciones";
//const { t, i18n } = useTranslation();

class VerActuaciones extends Component{
  
  constructor(props) {
    super(props);
    this.state = {
      offset: 0,
      tableData: [],
      orgtableData: [],
      perPage: 10,
      currentPage: 0,
      modalImportar: false,
      modalEliminar: false,
      form:{
        id: ''
      }
  }
  this.handlePageClick = this.handlePageClick.bind(this);
    
  }

  componentDidMount(){
    this.peticionGet();
  }

  /*PAGINACIÓN*/
  handlePageClick = (e) => {
    const selectedPage = e.selected;
    const offset = selectedPage * this.state.perPage;

    this.setState({
        currentPage: selectedPage,
        offset: offset
    }, () => {
        this.loadMoreData()
    });
};

loadMoreData() {
  const data = this.state.orgtableData;
  
  const slice = data.slice(this.state.offset, this.state.offset + this.state.perPage)
  this.setState({
    pageCount: Math.ceil(data.length / this.state.perPage),
    tableData:slice
  })
}


/*Obtención datos*/
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


/*Eliminar actuación*/
peticionDelete=()=>{
  console.log("ID a eliminar: ", this.state.form.id);
  axios.delete(url+"/"+this.state.form.id).then(response=>{
    console.log("eliminar");
    this.setState({modalEliminar: false});
    this.peticionGet();
  })
}    

    

modalImportar=()=>{
  this.setState({modalImportar: !this.state.modalImportar});
}    

seleccionarActuacion=(actuacion)=>{
  console.log("seleccionarActuacion");
  this.setState({
    tipoModal: 'actualizar',
    form: {
      id: actuacion.id
    }
  })

  console.log("ID a eliminar: ", actuacion.id);
}    

    render(){
        return(
          
            <div className="App"> 
            
            <button className="btn btn-primario" onClick={()=>{this.setState({form: null, tipoModal: 'insertar'}); this.modalImportar()}}><Trans ns= "global">ImpAct</Trans></button>         
          <br /><br />
          <Table responsive="xl">
              <thead>
                <tr>
                  <th><Trans ns= "global">Tipo</Trans></th>
                  <th><Trans ns= "global">Carretera</Trans></th>
                  <th><Trans ns= "global">ClaveObra</Trans></th>
                  <th><Trans ns= "global">Fecha</Trans></th>
                  <th><Trans ns= "global">Sentido</Trans></th>
                  <th><Trans ns= "global">Calzada</Trans></th>
                  <th><Trans ns= "global">Carriles</Trans></th>
                  <th><Trans ns= "global">Gestion</Trans></th>
                  <th><Trans ns= "global">CarreteraAnt</Trans></th>
                  
                  <th><Trans ns= "global">PKIni</Trans></th>
                  <th><Trans ns= "global">PKFin</Trans></th>
                  <th><Trans ns= "global">Importe</Trans></th>
                  <th><Trans ns= "global">Acciones</Trans></th>
                </tr>
              </thead>
              <tbody>
                {this.state.tableData.map(actuacion=>{
                  return(
                    <tr>
                      <td>{actuacion.idDdTipoActuaciones}</td>
                      <td>{actuacion.carretera.nombre}</td>
                      <td>{actuacion.claveObra}</td>
                      <td>{actuacion.fecha}</td>
                      <td>{actuacion.sentido}</td>
                      <td>{actuacion.calzada}</td>
                      <td>{actuacion.carriles}</td>
                      <td>{actuacion.gestion}</td>
                      <td>{actuacion.carreterasAntigua}</td>
                      
                      <td>{actuacion.puntoIni.pk} + {actuacion.puntoIni.m}</td>
                      <td>{actuacion.puntoFin.pk} + {actuacion.puntoFin.m}</td>
                      <td>{new Intl.NumberFormat("es-ES").format(actuacion.importe)}</td>
                      <td>
                        <button className="btn btn-primary"><FontAwesomeIcon icon={faEdit}/></button>
                        {"  "}
                        <button className="btn btn-danger" onClick={()=>{this.seleccionarActuacion(actuacion); this.setState({modalEliminar: true})}}><FontAwesomeIcon icon={faTrashAlt}/></button>
                      </td>
                    </tr>
                  )
                })}

              </tbody>
            </Table>
 
            <ReactPaginate
                    previousLabel={"prev"}
                    nextLabel={"next"}
                    breakLabel={"..."}
                    breakClassName={"break-me"}
                    pageCount={this.state.pageCount}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={this.handlePageClick}
                    containerClassName={"pagination"}
                    subContainerClassName={"pages pagination"}
                    activeClassName={"active"}/>


          <Modal isOpen={this.state.modalImportar}>
                <ModalHeader style={{display: 'block'}}>
                  <span style={{float: 'right'}} onClick={()=>this.modalImportar()}>x</span>
                </ModalHeader>
                <ModalBody>
                  <CargarExcel/>
                </ModalBody>

                <ModalFooter>
                  {/*this.state.tipoModal=='insertar'?
                    <button className="btn btn-success" onClick={()=>this.peticionPost()}>
                    Insertar
                  </button>: <button className="btn btn-primary" onClick={()=>this.peticionPut()}>
                    Actualizar
                  </button>*/
                  }
                    {/*<button className="btn btn-primario" onClick={()=>this.props.insertarArchivos}>Importar</button>*/}
                    <button className="btn btn-success" onClick={()=>this.peticionGet()}>Aceptar</button>
                    {/*<button className="btn btn-danger" onClick={()=>this.modalInsertar()}>Cancelar</button>*/}
                </ModalFooter>
          </Modal>


          <Modal isOpen={this.state.modalEliminar}>
            <ModalBody>
               ¿Estás seguro que deseas eliminar la actuación?
            </ModalBody>
            <ModalFooter>
              <button className="btn btn-danger" onClick={()=>this.peticionDelete()}>Sí</button>
              <button className="btn btn-secundary" onClick={()=>this.setState({modalEliminar: false})}>No</button>
            </ModalFooter>
          </Modal>

          </div>
        )
    }
}


export default VerActuaciones;

