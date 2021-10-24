import React from 'react';
import HomeIcon from '@mui/icons-material/Home';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import CarRepairIcon from '@mui/icons-material/CarRepair';
import StorageIcon from '@mui/icons-material/Storage';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import DescriptionIcon from '@mui/icons-material/Description';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';


export const SidebarData = [
    {
        title: "Home", 
        icon: <HomeIcon />,
        path: '/menu',
    },
    {
        title: "Gestión Tramos", 
        icon: <DirectionsCarIcon />,
        path: '/menu',

        subNav: [
            {
                title: "Importar grafo/tramos",
                path:'/menu'
            },
            {
                title: "Ver/Editar carreteras y tramos",
                path:'/menu'
            },
            {
                title: "Ver/Editar diccionarios de tramos",
                path:'/menu'
            },
            {
                title: "Importar Aforos",
                path:'/menu'
            },
            {
                title: "Ver aforos",
                path:'/menu'
            },
            {
                title: "Importar actuaciones",
                path:'/CargarActuaciones'
            },
            {
                title: "Crear actuación",
                path:'/menu'
            },
            {
                title: "Ver actuaciones",
                path:'/menu'
            },
        ],
    },
    {
        title: "Gestión Auscultación", 
        icon: <CarRepairIcon />,
        path: '/menu'
    },
    {
        title: "Consulta Datos", 
        icon: <StorageIcon />,
        path: '/menu'
    },
    {
        title: "Clasificaciones", 
        icon: <LibraryBooksIcon />,
        path: '/menu'
    },
    {
        title: "M. Evolución", 
        icon: <ShowChartIcon />,
        path: '/menu'
    },
    {
        title: "Administración", 
        icon: <AdminPanelSettingsIcon />,
        path: '/menu'
    },
    {
        title: "Documentación", 
        icon: <DescriptionIcon />,
        path: '/menu'
    },
    {
        title: "Cerrar Sesión", 
        icon: <ExitToAppIcon />,
        path: '/'
    },
];