import React, { useState } from 'react';
import '../css/Sidebar.css';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';


const Idioma = () => {


    const { t, i18n } = useTranslation();
  
    return (
        <IdiomaNav>
        <div>
            <p>Idioma : { i18n.language }</p>
            <button onClick={ () => i18n.changeLanguage("ca") }>CAT</button>
            <button onClick={ () => i18n.changeLanguage("es") }>ESP</button>
        </div>
        </IdiomaNav>
    );
  };

  const IdiomaNav = styled.nav`
  width: 100px;
  height: 50vh;
  display: flex;
  justify-content: right;
  position: fixed;
  top: 0;
  right: 0;
  transition: 350ms;
  z-index: 10;
`;

export default Idioma

