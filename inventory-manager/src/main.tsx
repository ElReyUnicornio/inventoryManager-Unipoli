import React from 'react';
import { createRoot } from 'react-dom/client';
import { IonApp } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Route, Redirect } from "react-router-dom";
import App from './App';
import AuthPage from './pages/AuthPage';
import { AuthProvider, AuthContext } from './components/authContext';
import LoadingPage from './components/loadingPage';

const container = document.getElementById('root');
const root = createRoot(container!);

function Main() {
  const {isAuthenticated, loading} = React.useContext(AuthContext);

  if (loading) return <LoadingPage/>
  
  return (
    <IonApp>
      <IonReactRouter>
          <Route path="/" component={App} />
          <Redirect from="/" to={isAuthenticated ? '/dashboard/' : '/auth/'} />
          <Route exact path="/auth/" component={AuthPage} />
          {isAuthenticated ? <Redirect from='/auth/' to='/dashboard' /> : null}
      </IonReactRouter>
    </IonApp>
  )
}

root.render(
  <React.StrictMode>
    <AuthProvider>
      <Main />
    </AuthProvider>
  </React.StrictMode>
);