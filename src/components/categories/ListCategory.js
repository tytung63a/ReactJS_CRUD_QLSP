import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import React from 'react';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types'


function ListCategory({
  data,
  setClickedRow,
  setFormData,
  setCate,
  page, limit,
  loading
}) {


  const tblOnClickHandler = function (event, value, index) {
    setClickedRow(index);
    setFormData(value);
  }

  const btnDeleteOnClick = (event, value, index) => {
    const urlApiXoa = 'https://600fd9856c21e1001704f63c.mockapi.io/todolist/categories/' + value.id;
    axios.delete(urlApiXoa)
      .then(function (response) {
        const listNew = data.filter(function (val, idx) {
          if (idx === index) {
            // Loại bỏ phần tử
            return false;
            
          } else {
            // Giữ lại phần tử
            return true;
          }
        });

        setCate(listNew);
        
        alert("Xóa thành công")
      })
      .catch(function (error) {
        console.error('error');
        console.error(error);
      });
  }



  const [searchTerm, setSearchTerm] = useState("")
  useEffect(() => {
    const url = "https://600fd9856c21e1001704f63c.mockapi.io/todolist/categories?page=" + page + "&limit=" + limit + "&search=" + searchTerm;
    axios({
      method: 'GET',
      url: url,
    })
      .then((response) => {
        const { data } = response;
        setCate(data);
      })
      .catch((error) => {
        console.log(error, error.response);
      });
  }, [
    searchTerm, page, limit
  ]);

  function handlerSearchTermChange(e) {
    setSearchTerm(e.target.value)
    console.log(searchTerm)
  }

  return (
    <React.Fragment>
      <label>Tìm Kiếm</label>
      <input value={searchTerm} onChange={handlerSearchTermChange}></input>
      
      <Table size="medium">
        <TableHead>
          <TableRow >
            <TableCell align="center">ID</TableCell>
            <TableCell>Tên Danh Mục</TableCell>
            <TableCell>Sự Miêu Tả</TableCell>
            <TableCell>Hành Động</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            data.map(function (value, index) {
              return (
                <TableRow
                  key={index}>
                  <TableCell  align="center" >{value.id}</TableCell>
                  <TableCell >{value.name}</TableCell>
                  <TableCell>{value.description}</TableCell>
                  <TableCell>
                  <Button
                      onClick={
                        (event) => tblOnClickHandler(event, value, index)
                      }
                      variant="contained"
                      color="secondary"
                      >
                      Sửa
                    </Button>
                    <Button
                      style={{marginLeft : '10px'}}
                      onClick={ (event) => {
                        btnDeleteOnClick(event, value, index)
                      } }
                      variant="contained"
                      color="secondary">
                      Xóa
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })
          }
        </TableBody>
      </Table>
    </React.Fragment>
  );
}

export default ListCategory;