import axios from 'axios';
import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Product from './Product';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
function CategoryProduct() {
  const apiListCategory = 'https://600fd9856c21e1001704f63c.mockapi.io/todolist/categories';
  const [listDanhMuc, setListDanhMuc] = useState([]);
  const [id, setId] = useState(-1);

  useEffect(() => {
    // async/await - ES7
    axios.get(apiListCategory)
      .then(function (response) {
        const { data } = response;
        setListDanhMuc(data);
      })
      .catch(function (error) {
        console.log(error);
      });

  }, [
    
  ]);

  const onClickDanhMuc = function (event, danhMuc) {
    setId(danhMuc.id);
  }

  const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));
  const classes = useStyles();
  const [tenDanhMuc, setTenDanhMuc] = useState('');
  const handleChange = (event) => {
    setTenDanhMuc(event.target.value);
  };
  return (
    <div className="row">
      <div className="col-4">
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-label">Danh Mục</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={tenDanhMuc}
          onChange={handleChange}
        >
          {listDanhMuc.map((danhMuc, index) => {
            return <MenuItem onClick={
              (event) => {
                onClickDanhMuc(event, danhMuc);
              }
            } key={index} value={danhMuc.name}>{danhMuc.name}</MenuItem>
          })}
        </Select>
        </FormControl>
      </div>
      <div className="col-8">
        <Product
          danhMucId={id} />
      </div>
    </div>
  );
}

export default CategoryProduct;