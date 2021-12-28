import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useState, useEffect } from 'react';
import axios from 'axios';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';

function HomeContent({
  danhMucId
}) {



  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [limit, setLimit] = useState(6);
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
        setProducts(data);
      })
      .catch((error) => {
        console.log(error, error.response);
        setLoading(false);
      });
  }, [
    /*
     * Khi những phần tử trong mảng thay đổi giá trị,
     * useEffect sẽ chạy lại hàm callback
     */
    page,
    danhMucId,
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

  const useStyles = makeStyles((theme) => ({
    icon: {
      marginRight: theme.spacing(2)
    },
    cardGrid: {
      paddingTop: theme.spacing(8),
      paddingBottom: theme.spacing(8),
    },
    card: {
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
    },
    cardMedia: {
      paddingTop: '56.25%', // 16:9
    },
    cardContent: {
      flexGrow: 1,
    },}
  ));

  const classes = useStyles();
  return (
    <div>
      <Backdrop style={{ zIndex: '10000', }} open={loading}>
          <CircularProgress />
        </Backdrop>
      <main>
      <Container className={classes.cardGrid} maxWidth="md">
        <Grid container spacing={4} >
          {products.map((value, index) => (
            <Grid item key={index} xs={12} sm={6} md={4}>
              <Card className={classes.card}>
                <CardMedia
                  className={classes.cardMedia}
                  image={value.image}
                  title="Image title"
                />
                <CardContent className={classes.cardContent}>
                  <Typography gutterBottom variant="h5" component="h2">
                    {value.name}
                  </Typography>
                  <Typography>
                    <MonetizationOnIcon /> {value.price}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" color="primary">
                    <AddShoppingCartIcon />
                  Giỏ hàng
                </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
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
      </Container>
    </main></div>

  );
}

export default HomeContent;