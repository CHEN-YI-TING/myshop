import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";

import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
//form
import TextField from "@mui/material/TextField";

//edit

function Product() {
  let navigate = useNavigate();

  let { id } = useParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [price, setPrice] = useState("");
  const [productList, setProductList] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editProduct, setEditProduct] = useState(
    {
      id: 0,
      title: "",
      description: "",
      price: "",
      imgUrl: "",
    } || {
      id: editProduct.id,
      title: editProduct.title,
      description: editProduct.description,
      price: editProduct.price,
      imgUrl: editProduct.imgUrl,
    }
  );

  useEffect(() => {
    fetch("http://localhost:5000/products", {
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((products) => {
        setProductList(products);
      });
  }, []);

  const deleteProduct = (id) => {
    fetch(`http://localhost:5000/products/${id}`, {
      method: "DELETE",
      body: JSON.stringify({ productId: id }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        return res.json();
      })
      .then((products) => {
        setProductList(products);
      })
      .catch((err) => console.log(err));
  };

  const updateProduct = (e) => {
    e.preventDefault();
    const id = editProduct.id;
    fetch(`http://localhost:5000/products/${id}`, {
      method: "PATCH",
      mode: "cors",
      credentials: "include",
      body: JSON.stringify(editProduct),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        return res.json();
      })
      .then((products) => {
        setProductList(products);
      })
      .catch((err) => console.log(err));
  };

  const addProduct = (e) => {
    e.preventDefault();
    const productObj = {
      title,
      description,
      imgUrl,
      price,
    };

    fetch("http://localhost:5000/products/new", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(productObj),
    })
      .then((res) => {
        return res.json();
      })
      .then((products) => setProductList(products))
      .catch((err) => console.log("Error: " + err.message));
  };
  const t1 = {
    fontSize: "40px",
    margin: "20px",
    padding: "10px",
  };
  const formLabel = {
    fontWeight: 700,
    fontSize: "1.4rem",
    lineHeight: "2.3em",
  };
  const btt = {
    fontSize: 22,
    marginTop: 10,
  };

  return (
    <Container fixed>
      <Typography sx={t1} align="center">
        新增產品
      </Typography>

      {editMode ? (
        <Box mt={5} display="flex" justifyContent="center">
          <Paper
            sx={{ padding: "50px", width: 760 }}
            elevation={3}
            align="left"
          >
            <form noValidate autoComplete="off" onSubmit={updateProduct}>
              <Typography sx={formLabel}>產品名稱</Typography>
              <TextField
                variant="outlined"
                sx={{ fontSize: "30px" }}
                required
                fullWidth
                type="text"
                value={editProduct.title}
                onChange={(e) =>
                  setEditProduct({ ...editProduct, title: e.target.value })
                }
              ></TextField>
              <Typography sx={formLabel}>產品描述</Typography>
              <TextField
                variant="outlined"
                sx={{ fontSize: "30px" }}
                required
                fullWidth
                type="text"
                value={editProduct.description}
                onChange={(e) =>
                  setEditProduct({
                    ...editProduct,
                    description: e.target.value,
                  })
                }
              ></TextField>
              <Typography sx={formLabel}>產品圖片URL</Typography>
              <TextField
                variant="outlined"
                sx={{ fontSize: "30px" }}
                required
                fullWidth
                type="text"
                value={editProduct.imgUrl}
                onChange={(e) =>
                  setEditProduct({ ...editProduct, imgUrl: e.target.value })
                }
              ></TextField>
              <Typography sx={formLabel}>產品價格</Typography>
              <TextField
                variant="outlined"
                sx={{ fontSize: "30px" }}
                required
                fullWidth
                type="text"
                value={editProduct.price}
                onChange={(e) =>
                  setEditProduct({ ...editProduct, price: e.target.value })
                }
              ></TextField>

              <Typography align="right">
                <Button type="submit" variant="contained" sx={btt}>
                  更新
                </Button>
              </Typography>
            </form>
          </Paper>
        </Box>
      ) : (
        <Box mt={5} display="flex" justifyContent="center">
          <Paper
            sx={{ padding: "50px", width: 760 }}
            elevation={3}
            align="left"
          >
            <form noValidate autoComplete="off" onSubmit={addProduct}>
              <Typography sx={formLabel}>產品名稱</Typography>
              <TextField
                variant="outlined"
                sx={{ fontSize: "30px" }}
                required
                fullWidth
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              ></TextField>
              <Typography sx={formLabel}>產品描述</Typography>
              <TextField
                variant="outlined"
                sx={{ fontSize: "30px" }}
                required
                fullWidth
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></TextField>
              <Typography sx={formLabel}>產品圖片URL</Typography>
              <TextField
                variant="outlined"
                sx={{ fontSize: "30px" }}
                required
                fullWidth
                type="text"
                value={imgUrl}
                onChange={(e) => setImgUrl(e.target.value)}
              ></TextField>
              <Typography sx={formLabel}>產品價格</Typography>
              <TextField
                variant="outlined"
                sx={{ fontSize: "30px" }}
                required
                fullWidth
                type="text"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              ></TextField>

              <Typography align="right">
                <Button type="submit" variant="contained" sx={btt}>
                  建立
                </Button>
              </Typography>
            </form>
          </Paper>
        </Box>
      )}

      <Box sx={{ marginTop: "80px" }}>
        <Table>
          <TableHead>
            <TableCell sx={{ fontSize: 25 }}>id</TableCell>
            <TableCell sx={{ fontSize: 25 }}>產品名稱</TableCell>
            <TableCell sx={{ fontSize: 25 }} align="center">
              產品描述
            </TableCell>
            <TableCell sx={{ fontSize: 25 }} align="center">
              產品價格
            </TableCell>
            <TableCell sx={{ fontSize: 25 }} align="center">
              圖片網址
            </TableCell>
            <TableCell sx={{ fontSize: 25 }} align="center">
              刪除產品
            </TableCell>
            <TableCell sx={{ fontSize: 25 }} align="center">
              修改產品
            </TableCell>
          </TableHead>
          <TableBody>
            {productList.map((product) => (
              <TableRow key={product.id}>
                <TableCell sx={{ fontSize: 20 }}>{product.id}</TableCell>
                <TableCell sx={{ fontSize: 20 }}>{product.title}</TableCell>
                <TableCell sx={{ fontSize: 20 }} align="center">
                  {product.description}
                </TableCell>
                <TableCell sx={{ fontSize: 20 }} align="center">
                  {product.price}
                </TableCell>
                <TableCell sx={{ fontSize: 20 }} align="center">
                  {product.imgUrl}
                </TableCell>
                <TableCell sx={{ fontSize: 20 }} align="center">
                  {
                    <Button
                      onClick={() => {
                        deleteProduct(product.id);
                      }}
                    >
                      刪除
                    </Button>
                  }
                </TableCell>
                <TableCell sx={{ fontSize: 20 }} align="center">
                  {
                    <Button
                      onClick={() => {
                        setEditMode(true);
                        setEditProduct({
                          id: product.id,
                          title: product.title,
                          description: product.description,
                          price: product.price,
                          imgUrl: product.imgUrl,
                        });
                      }}
                    >
                      修改
                    </Button>
                  }
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </Container>
  );
}

export default Product;
