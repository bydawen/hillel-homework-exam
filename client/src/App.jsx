import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { ConfigProvider, theme } from 'antd';
import Main from './pages/Main/Main.jsx';
import CarsCatalog from './pages/CarsCatalog/CarsCatalog.jsx';
import OrdersPage from './pages/OrdersPage/OrdersPage.jsx';
import ClientsList from './pages/ClientsList/ClientsList.jsx';
import TestDrives from "./pages/TestDrives/TestDrives.jsx";
import NewClientPage from "./pages/NewClientPage/NewClientPage.jsx";
import ClientInfo from "./pages/ClientInfo/ClientInfo.jsx";
import NewOrderPage from "./pages/NewOrderPage/NewOrderPage.jsx";
import NewTestDrivePage from "./pages/NewTestDrivePage/NewTestDrivePage.jsx";

import './App.scss';

function App() {
  return (
    <>
      <ConfigProvider theme={{
        algorithm: theme.darkAlgorithm,
        token: {
          colorPrimary: 'tomato',
        },
        components: {
          Button: {
            defaultHoverColor: 'colorPrimary',
          }
        },
      }}>
        <h1>Vite + React</h1>
        <BrowserRouter>
          <nav>
            <Link to="/">Main</Link>
            <Link to="/cars">Cars Catalog</Link>
            <Link to="/clients">Clients List</Link>
            <Link to="/orders">Orders</Link>
            <Link to="/test-drives">Test Drives</Link>
          </nav>
          <div className="container">
            <Routes>
              <Route path="/" element={<Main />} />
              <Route path="/cars" element={<CarsCatalog />} />
              <Route path="/clients" element={<ClientsList />} />
              <Route path="/orders" element={<OrdersPage />} />
              <Route path="/test-drives" element={<TestDrives />} />
              <Route path="/new-client" element={<NewClientPage />} />
              <Route path="/clients/:clientId" element={<ClientInfo />} />
              <Route path="/new-order" element={<NewOrderPage />} />
              <Route path="/new-test-drive" element={<NewTestDrivePage />} />
            </Routes>
          </div>
        </BrowserRouter>
      </ConfigProvider>
    </>
  )
}

export default App
