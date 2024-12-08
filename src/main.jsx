import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';

// Importa el archivo de configuración de i18n
import i18n from './i18n';
import { I18nextProvider } from 'react-i18next';

// Importa el proveedor de Google OAuth
import { GoogleOAuthProvider } from '@react-oauth/google';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId="785282538969-nhq7ursh8lkblr90a9rvi0qlg2ejjqmk.apps.googleusercontent.com"> {/* Reemplaza con tu Client ID */}
      <I18nextProvider i18n={i18n}>
        <App />
      </I18nextProvider>
    </GoogleOAuthProvider>
  </StrictMode>
);
