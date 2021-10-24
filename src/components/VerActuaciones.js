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


const url = "https://localhost:44301/actuaciones";

class VerActuaciones extends Component{

  constructor(props) {
    super(props);
    this.state = {
      offset: 0,
      tableData: [],
      orgtableData: [],
      perPage: 10,
      currentPage: 0,
      modalInsertat: false
  }
  this.handlePageClick = this.handlePageClick.bind(this);

  }
  /*state={
    data:[]
  }

  state={
    tableData: [],
    offset: 0,
    orgtableData: [],
    perPage: 15,
    currentPage: 0
  }*/

  

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

    peticionGet=()=>{
        axios.get(url).then(response=>{

            console.log(response.data);
            
            //this.setState({data: response.data})

            var data = response.data;
            var slice = data.slice(this.state.offset, this.state.offset + this.state.perPage)

            this.setState({
              pageCount: Math.ceil(data.length / this.state.perPage),
              orgtableData: response.data,
              tableData: slice
            })
        });
    }

    componentDidMount(){
        this.peticionGet();
    }

    modalInsertar=()=>{
      this.setState({modalInsertar: !this.state.modalInsertar});
    }

    render(){
        return(
            <div className="App"> 
            
            <button className="btn btn-primario" onClick={()=>{this.setState({form: null, tipoModal: 'insertar'}); this.modalInsertar()}}>Importar Actuación</button>         
          <br /><br />
          <Table responsive="xl">
              <thead>
                <tr>
                  <th>Tipo</th>
                  <th>Carretera</th>
                  <th>Clave Obra</th>
                  <th>Fecha</th>
                  <th>Sentido</th>
                  <th>Calzada</th>
                  <th>C. Gestión</th>
                  <th>PK Ini</th>
                  <th>PK Fin</th>
                  <th>€</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {this.state.tableData.map(actuacion=>{
                  return(
                    <tr>
                      <td>{actuacion.idDdTipoActuaciones}</td>
                      <td></td>
                      <td>{actuacion.claveObra}</td>
                      <td>{actuacion.fecha.toLocaleDateString}</td>
                      <td>{actuacion.sentido}</td>
                      <td>{actuacion.calzada}</td>
                      <td>{actuacion.gestion}</td>
                      <td></td>
                      <td></td>
                      <td>{new Intl.NumberFormat("es-ES").format(actuacion.importe)}</td>
                      <td>
                        <button className="btn btn-primary"><FontAwesomeIcon icon={faEdit} size="1x"/></button>
                        {"  "}
                        <button className="btn btn-danger"><FontAwesomeIcon icon={faTrashAlt} size="1x"/></button>
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


          <Modal isOpen={this.state.modalInsertar}>
                <ModalHeader style={{display: 'block'}}>
                  <span style={{float: 'right'}} onClick={()=>this.modalInsertar()}>x</span>
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
                    <button className="btn btn-danger" onClick={()=>this.modalInsertar()}>Cancelar</button>
                </ModalFooter>
          </Modal>

          </div>
        )
    }
}


export default VerActuaciones;

