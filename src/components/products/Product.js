import Container from '@material-ui/core/Container';
import CreateProduct from './CreatProduct';
import ListProduct from './ListProduct';
import Grid from '@material-ui/core/Grid';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useState, useEffect } from 'react';
import axios from 'axios';

function Product({
  danhMucId
}) {

  const formDataInitValue = {
    id: '',
    categoryId : '',
    name: '',
    price: '',
    image: ''
  }

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState(formDataInitValue);
  const [clickedRow, setClickedRow] = useState(-1);
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(1);

  useEffect(() => {
    setLoading(true);
    const url = "https://600fd9856c21e1001704f63c.mockapi.io/todolist/categories/" +
    danhMucId + "/products?limit=" + limit + "&page=" + page;
    axios({
      method: 'GET',
      url: url,
    })
      .then((response) => {
        setLoading(false);
        const { data } = response;
        console.log(response)
        setProducts(data);
      })
      .catch((error) => {
        console.log(error, error.response);
        setLoading(false);
      });
  }, [
    page,
    danhMucId, limit
  ]);

  const trangTruoc = function () {
    if (page === 1) {
      return;
    }
    setPage(page - 1);
  }

  const trangSau = function () {
    setPage(page + 1);
  }

  

  return (
    <div>
      
      <Container width="">
        <Backdrop
          style={{ zIndex: '10000', }}
          open={loading}
        >
          <CircularProgress />
        </Backdrop>

        <Grid container>
        
          <CreateProduct
            setFormData={setFormData}
            setProducts={setProducts}
            products={products}
            formData={formData}
            clickedRow={clickedRow}
            setClickedRow={setClickedRow}
            danhMucId={danhMucId}
          />
        </Grid>
        <Grid item style={{ backgroundColor: '#cfe8fc' }}>
          <ListProduct
            setProducts={setProducts}
            setFormData={setFormData}
            setClickedRow={setClickedRow}
            danhMucId={danhMucId}
            data={products} />
        </Grid>
        <Grid>
          <ul className="pagination mt-4">
            <li
              onClick={trangTruoc}
              className="page-item">
              <a className="page-link">Trang trước</a>
            </li>

            <li className="page-item">
              <a className="page-link">{page}</a>
            </li>

            <li
              onClick={trangSau}
              className="page-item">
              <a className="page-link">Trang sau</a>
            </li>
          </ul>
        </Grid>

      </Container>

    </div>
  );
}

export default Product;