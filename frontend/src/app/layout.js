import Navbar from './components/Navbar';  // Importamos el Navbar

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />   {/* Colocamos el Navbar */}
        {children}
      </body>
    </html>
  );
}
