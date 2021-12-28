import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import React from 'react';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';


function ListProduct({
  data,
  setClickedRow,
  setFormData,
  setProducts,
  danhMucId
}) {

  const useStyles = makeStyles((theme) => ({
    large: {
      width: theme.spacing(7),
      height: theme.spacing(7),
    },
  }));

  const classes = useStyles();

  const tblOnClickHandler = function (event, value, index) {
    setClickedRow(index);
    setFormData(value);
  }

  const btnDeleteOnClick = (event, value, index) => {
    const urlApiXoa = 'https://600fd9856c21e1001704f63c.mockapi.io/todolist/categories/' + danhMucId + '/products/' + value.id;
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

        setProducts(listNew);
        alert("Xóa thành công")
      })
      .catch(function (error) {
        console.error('error');
        console.error(error);
      });
  }

  return (
    <React.Fragment>
      <Table size="medium">
        <TableHead>
          <TableRow >
            <TableCell align="center">ID</TableCell>
            <TableCell >Tên</TableCell>
            <TableCell>Giá</TableCell>
            <TableCell>Hình Ảnh</TableCell>
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
                  <TableCell>{value.price}</TableCell>
                  <Avatar alt="Remy Sharp" src={value.image} className={classes.large} />
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

export default ListProduct;