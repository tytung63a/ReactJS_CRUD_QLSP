import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import HomeContent from './HomeContent'

function Home(danhMucId) {
  const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
      marginLeft: "320px"
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));

  const classes = useStyles();

  const [age, setAge] = useState('');
  const handleChange = (event) => {
    setAge(event.target.value);
  };
  const onClickDanhMuc = function (event, danhMuc) {
    setId(danhMuc.id);
  }

  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const apiListCategory = 'https://600fd9856c21e1001704f63c.mockapi.io/todolist/categories';
  const [listDanhMuc, setListDanhMuc] = useState([]);
  const [id, setId] = useState(-1);
  useEffect(() => {
    axios.get(apiListCategory)
      .then(function (response) {
        const { data } = response;
        setListDanhMuc(data);
      })
      .catch(function (error) {
        console.log(error);
      });

  }, [
    page,
    danhMucId,
    /*
     * Khi các phần tử trong mảng thay đổi giá trị, useEffect sẽ gọi lại callback.
     * Lúc đó, useEffect đóng vai trò như componentDidUpdate.
     * Nếu mảng rỗng -> useEffect đóng vai trò như componentDidMount,
     * chỉ chạy lần đầu khi component được tạo ra.
     */
  ]);



  return (
    <React.Fragment>
      <CssBaseline />
      <Backdrop 
            style={{ zIndex: '1000', }}
            open={loading}
          >
            <CircularProgress />
          </Backdrop>
          <FormControl className={classes.formControl}>
        <InputLabel  id="demo-simple-select-label">Danh Mục</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={age}
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
        <HomeContent danhMucId={id}/>
    </React.Fragment>
  );
}
export default Home