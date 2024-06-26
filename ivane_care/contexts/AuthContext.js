import React, { createContext, useState, useContext } from 'react';

// Crear un contexto para la autenticación
const AuthContext = createContext();

// Crear un proveedor de autenticación
// El proveedor envuelve a los componentes hijos (children) y les provee acceso al estado y la función para actualizarlo.
const AuthProvider = ({ children }) => {
  //  isLoggedIn para manejar si el usuario está logueado, y setIsLoggedIn para actualizar ese estado. 
  // Estado para manejar si el usuario está logueado
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    // Proveer el estado y la función para actualizar el estado a los componentes hijos
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook personalizado para usar el contexto de autenticación
const useAuth = () => {
  // Obtener el contexto de autenticación
  const context = useContext(AuthContext);

  // Si el contexto no está definido, lanzar un error
  if (context === undefined) {

    // Esta línea de código lanza un error con el mensaje 'useAuth must be used within an AuthProvider'
    // si el context no está definido. Esto significa que el hook useAuth debe ser utilizado dentro de un
    // componente que esté envuelto por AuthProvider. Si intentas usar useAuth fuera de ese contexto,
    // no tendrá acceso a los valores del contexto de autenticación, lo que causará este error.
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};

export { AuthProvider, useAuth };


//  Los Hooks son funciones que te permiten “enganchar”
// el estado de React y el ciclo de vida desde componentes de función.