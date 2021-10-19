import React from 'react';
import Cookies from 'universal-cookie';
import Sidebar from "../components/Sidebar";



function Menu(props){

    //Cookies de inicio de sesión
    const cookies = new Cookies;

    return(
        <div>
            {/*Cargamos el menú lateral*/}
            <Sidebar />
        </div>
    );
}

export default Menu;