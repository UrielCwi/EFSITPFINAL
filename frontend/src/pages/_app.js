import React from 'react';
import { AuthProvider } from '../app/context/AuthContext';

function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default App;
