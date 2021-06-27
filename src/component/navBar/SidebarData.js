import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';


export const SidebarData = [
    {
        title: 'Accueil',
        path: '/',
        icon: <AiIcons.AiFillHome />,
        cName: 'nav-text'
      },
       {
    title: 'Liste des clients',
    path: '/clients',
    icon: <FaIcons.FaList />,
    cName: 'nav-text'
  }
  
];