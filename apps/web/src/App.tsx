import { useState, useEffect } from 'react';
import Splash from './Splash';
import Home from './Home';
import Collection from './Collection';
import Ongkir from './Ongkir';
import Kontak from './Kontak';
import ProductDetail from './ProductDetail';
import Admin from './admin/Admin';

export default function App() {
  const [route, setRoute] = useState(window.location.hash);

  useEffect(() => {
    const handleHashChange = () => setRoute(window.location.hash);
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const basePath = route.split('?')[0];

  if (basePath === '#/home') {
    return <Home />;
  } else if (basePath === '#/koleksi') {
    return <Collection />;
  } else if (basePath === '#/ongkir') {
    return <Ongkir />;
  } else if (basePath === '#/kontak') {
    return <Kontak />;
  } else if (basePath.startsWith('#/produk/')) {
    return <ProductDetail />;
  } else if (basePath.startsWith('#/admin')) {
    return <Admin />;
  } else {
    return <Splash />;
  }
}
