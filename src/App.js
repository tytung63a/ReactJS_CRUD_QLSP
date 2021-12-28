import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './components/home/Home'
import Category from './components/categories/Category'
import CategoryProduct from './components/products/CategoryProduct'
import FooterPage from './components/footer/FooterPage'
import Navbar from './components/layouts/Navbar';
import {
  BrowserRouter,
  Route
} from 'react-router-dom';


function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
          <Route path="/" exact component={Home}>
            <Home />
          </Route>
          <Route path="/products" exact component={CategoryProduct}>
          </Route>
          <Route path="/categories" exact component={Category}>
          </Route>
      </BrowserRouter>
      <FooterPage/>
    </div>
  );
}

export default App;