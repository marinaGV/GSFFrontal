import React, { Fragment } from 'react';
import Cookies from 'universal-cookie';
import Sidebar from "../components/Sidebar";
import Idioma from "../components/Idioma";
import { useTranslation } from 'react-i18next';


function Menu(props){

    const { t, i18n } = useTranslation();
    //Cookies de inicio de sesión
    const cookies = new Cookies;

    return(
        <div>
            <div>
                {/*Cargamos el menú lateral*/}
                <Sidebar />
            </div>
            <div>
                <Idioma />
            </div>
        </div>
    );
}

export default Menu;