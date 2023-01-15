import React from 'react';
import HomeView from './HomeView';
import CadastroView from '../Cadastro/CadastroView';
import App from '../../../App';
import { registerRootComponent } from 'expo';

const HomeController = () => {    
    return (
       // <HomeView />
       <CadastroView />
    );
};

