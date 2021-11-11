import React, { useState } from 'react';
import '../css/Sidebar.css';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';


 
var len ='';
let idimoSel='1';



const Idioma = () => {

    const [Form, IdiomaSel] = useState({
        idioma: idimoSel
    });


    //Maneja la edición e inserción en los forms
    const handleChange = e =>{

        console.log("Target Value:", e.target.value);

         IdiomaSel({ [Form.idioma]: e.target.value });

         len = e.target.value;

         idimoSel=len;

        console.log("Idioma:", len);

        switch(len) {

            case "1": i18n.changeLanguage("ca");
            break;
    
            case "2": i18n.changeLanguage("es");
            break;
    
            default:  i18n.changeLanguage("ca");
            break;
    
        }

    }

    const { t, i18n } = useTranslation();
    
    console.log("F.Idioma:", Form.idioma);
    console.log("idimoSel:", idimoSel);

    return (
        <IdiomaNav>
        <div>
       {/* Comentamos la info del idioma. Se deja comentado por si se quiere incluir
        <p>Idioma : { i18n.language }</p> */}
        <span style={{float: 'right'}}>

            <select name="id" id="id" onChange={handleChange} defaultValue={idimoSel} styles={colourStyles} >
                <option value="1">CAT</option>
                <option value="2">ESP</option>
              </select>
            </span>
        </div>
        </IdiomaNav>
    );
  };

  const IdiomaNav = styled.nav`
  width: 100px;
  height: 30vh;
  display: flex;
  justify-content: right;
  position: fixed;
  top: 0;
  right: 0;
  transition: 350ms;
  z-index: 10;
`;


const colourStyles = {
    menuList: styles => ({
        ...styles,
        background: 'papayawhip'
    }),
    option: (styles, {isFocused, isSelected}) => ({
        ...styles,
        background: isFocused
            ? 'hsla(291, 64%, 42%, 0.5)'
            : isSelected
                ? 'hsla(291, 64%, 42%, 1)'
                : undefined,
        zIndex: 1
    }),
    menu: base => ({
        ...base,
        zIndex: 100
    })
    }

export default Idioma

