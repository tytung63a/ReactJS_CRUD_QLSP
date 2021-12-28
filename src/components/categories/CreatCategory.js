import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import { useState } from 'react';
function CreateCategory({
    clickedRow,
    formData,
    setFormData,
    setCate,
    cate,
    setClickedRow
    }) {

    const onChangeHandler = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    }

    const onCreateProduct = () => {
        const url = 'https://600fd9856c21e1001704f63c.mockapi.io/todolist/categories/' + formData.id;
        axios({
            method: 'POST',
            url: url,
            data: formData,
        }).then((response) => {
            const { data } = response
            setCate([
                ...cate,
                data,
            ]);
            alert("Thêm thành công")
            clearForm()

        }).catch((error) => {
            console.log(error);
        });
    }

    const onUpdateProduct = function () {
        const updateApiUrl = 'https://600fd9856c21e1001704f63c.mockapi.io/todolist/categories/' + formData.id;

        axios.put(updateApiUrl, formData)
            .then(function (response) {
                const { data } = response;
                console.log(data);

                const lisProductNew = cate.map(function (val, idx) {
                    if (val.id === data.id) {
                        return data;
                    } else {
                        return val;
                    }
                });

                setCate(lisProductNew);
                alert("Cập nhật thành công")
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    const onSubmitHandler = (event) => {
        event.preventDefault();
        if (clickedRow !== -1) {
            // Cập nhật
            onUpdateProduct();
        } else {
            // Tạo mới
            onCreateProduct();

        }
    }

    const formDataInitValue = {
        id: '',
        name: '',
        description: ''
    }
    const clearForm = (e) => {
        console.log(e)
        setFormData(formDataInitValue)
        setClickedRow(-1)
    }

    const [showToggle, setShowToggle] = useState(false)
    const toggleThem = () => {
        setShowToggle(!showToggle)
    }

    let eleMent = <Button
        color="primary"
        variant="contained"
        type="submit"
        onClick={() => toggleThem()}
        style={{ marginTop: '10px', marginBottom: '10px' }}>
        Thêm Danh Mục
        </Button>
    if (showToggle === true) {
        return <div> <Button
            color="primary"
            variant="contained"
            type="submit"
            onClick={() => toggleThem()}
            style={{ marginLeft: "33px", marginTop: '10px' }}>
            Close Form
            </Button>
            <form
                onSubmit={onSubmitHandler}
                autoComplete="off">
                <TextField style={{ backgroundColor: '#cfe8fc', height: '30vh' }}
                    value={formData.id}
                    onChange={onChangeHandler}
                    variant="outlined"
                    name="id"
                    fullWidth
                    disabled
                    style={{ marginTop: '20px' }}
                    label="ID tự động tăng" />
                <TextField
                    value={formData.name}
                    onChange={onChangeHandler}
                    variant="outlined"
                    name="name"
                    fullWidth
                    style={{ marginTop: '20px' }}
                    label="Name" />
                <TextField
                    value={formData.description}
                    onChange={onChangeHandler}
                    variant="outlined"
                    name="description"
                    fullWidth
                    style={{ marginTop: '20px' }}
                    label="Sự Miêu Tả" />
                <Button
                    color="primary"
                    variant="contained"
                    type="submit"
                    style={{ marginTop: '10px', marginLeft: '10px', marginBottom: '10px' }}
                >
                    Submit
            </Button>
                <Button
                    onClick={(e) => clearForm(e)}
                    color="secondary"
                    variant="contained"
                    type="reset"
                    style={{ marginTop: '10px', marginLeft: '10px', marginBottom: '10px' }}>
                    Clear
            </Button>
            </form>
        </div>
    }
    return (
        <Container mb={5}>
            {eleMent}
        </Container>
    );
}

export default CreateCategory;