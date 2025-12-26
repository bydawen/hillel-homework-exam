import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ConfigProvider, theme, Row, Col } from 'antd';
import RouteProtector from './components/RouteProtector/RouteProtector.jsx';
import ContentLayout from './components/ContentLayout/ContentLayout.jsx';
import EmptyPage from './pages/EmptyPage/EmptyPage.jsx';
import AuthorizationPage from './pages/AuthorizationPage/AuthorizationPage.jsx';
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
        <BrowserRouter>
          <div className="container">
            <Routes>
              <Route path="/login" element={<AuthorizationPage />} />
              <Route path="*" element={<EmptyPage />} />
              <Route element={<ContentLayout />}>
                <Route path="/main" element={<RouteProtector><Main /></RouteProtector>} />
                <Route path="/cars" element={<RouteProtector><CarsCatalog /></RouteProtector>} />
                <Route path="/clients" element={<RouteProtector><ClientsList /></RouteProtector>} />
                <Route path="/orders" element={<RouteProtector><OrdersPage /></RouteProtector>} />
                <Route path="/test-drives" element={<RouteProtector><TestDrives /></RouteProtector>} />
                <Route path="/new-client" element={<RouteProtector><NewClientPage /></RouteProtector>} />
                <Route path="/clients/:clientId" element={<RouteProtector><ClientInfo /></RouteProtector>} />
                <Route path="/new-order" element={<RouteProtector><NewOrderPage /></RouteProtector>} />
                <Route path="/new-test-drive" element={<RouteProtector><NewTestDrivePage /></RouteProtector>} />
              </Route>
            </Routes>
          </div>
        </BrowserRouter>
      </ConfigProvider>
    </>
  )
}

export default App;