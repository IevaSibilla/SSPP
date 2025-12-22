import React, { useState, useEffect, createContext, useContext } from 'react';

interface RouterContextType {
  currentPath: string;
  navigate: (path: string) => void;
}

const RouterContext = createContext<RouterContextType | null>(null);

export const useRouter = () => {
  const context = useContext(RouterContext);
  if (!context) {
    throw new Error('useRouter must be used within Router');
  }
  return context;
};

interface RouterProps {
  children: React.ReactNode;
}

export const Router: React.FC<RouterProps> = ({ children }) => {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (path: string) => {
    window.history.pushState({}, '', path);
    setCurrentPath(path);
  };

  return (
    <RouterContext.Provider value={{ currentPath, navigate }}>
      {children}
    </RouterContext.Provider>
  );
};

interface RoutesProps {
  children: React.ReactNode;
}

export const Routes: React.FC<RoutesProps> = ({ children }) => {
  const { currentPath } = useRouter();
  
  const childrenArray = React.Children.toArray(children);
  for (const child of childrenArray) {
    if (React.isValidElement(child)) {
      const route = child as React.ReactElement<RouteProps>;
      const routePath = route.props.path;
      if (routePath === currentPath) {
        return <>{route.props.element}</>;
      }
    }
  }
  
  return null;
};

interface RouteProps {
  path: string;
  element: React.ReactElement;
}

export const Route: React.FC<RouteProps> = () => {
  return null;
};

