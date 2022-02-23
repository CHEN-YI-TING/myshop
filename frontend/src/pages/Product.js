import React, { useState, useEffect } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import CreateIcon from "@mui/icons-material/Create";
import "./product.css";

//edit

function Product() {
  /* const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [price, setPrice] = useState(""); */

  const [productList, setProductList] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [createProduct, setCreateProduct] = useState(
    {
      title: "",
      description: "",
      price: "",
      imgUrl: "",
    } || {
      title: createProduct.title,
      description: createProduct.description,
      price: createProduct.price,
      imgUrl: createProduct.imgUrl,
    }
  );
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
      credentials: "include",
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
      credentials: "include",
    })
      .then((res) => {
        return res.json();
      })
      .then((products) => {
        setProductList(products);
        setEditMode(false);
      })
      .catch((err) => console.log(err));
  };

  const addProduct = (e) => {
    e.preventDefault();
    fetch("http://localhost:5000/products/new", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(createProduct),
      credentials: "include",
    })
      .then((res) => res.json())
      .then((products) => {
        setProductList(products);
        setCreateProduct({
          title: "",
          description: "",
          price: "",
          imgUrl: "",
        });
      })
      .catch((err) => console.log("Error: " + err.message));
  };

  return (
    <div className="product_container">
      <div className="product_title">產品管理介面</div>

      {editMode ? (
        <form className="product_form" onSubmit={updateProduct}>
          <div className="form_container">
            <div className="form_content">
              <label>產品名稱</label>
              <input
                required
                type="text"
                value={editProduct.title}
                onChange={(e) =>
                  setEditProduct({ ...editProduct, title: e.target.value })
                }
              ></input>
            </div>
            <div className="form_content">
              <label>產品描述</label>
              <input
                required
                type="text"
                value={editProduct.description}
                onChange={(e) =>
                  setEditProduct({
                    ...editProduct,
                    description: e.target.value,
                  })
                }
              ></input>
            </div>
            <div className="form_content">
              <label>產品圖片URL</label>
              <input
                required
                type="text"
                value={editProduct.imgUrl}
                onChange={(e) =>
                  setEditProduct({ ...editProduct, imgUrl: e.target.value })
                }
              ></input>
            </div>
            <div className="form_content">
              <label>產品價格</label>
              <input
                required
                type="text"
                value={editProduct.price}
                onChange={(e) =>
                  setEditProduct({ ...editProduct, price: e.target.value })
                }
              ></input>
            </div>
            <div className="form_btn">
              <button type="submit">更新</button>
            </div>
          </div>
        </form>
      ) : (
        <form className="product_form" onSubmit={addProduct}>
          <div className="form_container">
            <div className="form_content">
              <label>產品名稱</label>
              <input
                required
                type="text"
                value={createProduct.title}
                onChange={(e) =>
                  setCreateProduct({ ...createProduct, title: e.target.value })
                }
              ></input>
            </div>
            <div className="form_content">
              <label>產品描述</label>
              <input
                required
                type="text"
                value={createProduct.description}
                onChange={(e) =>
                  setCreateProduct({
                    ...createProduct,
                    description: e.target.value,
                  })
                }
              ></input>
            </div>
            <div className="form_content">
              <label>產品圖片</label>
              <input
                required
                type="text"
                value={createProduct.imgUrl}
                onChange={(e) =>
                  setCreateProduct({ ...createProduct, imgUrl: e.target.value })
                }
              ></input>
            </div>
            <div className="form_content">
              <label>產品價格</label>
              <input
                required
                type="text"
                value={createProduct.price}
                onChange={(e) =>
                  setCreateProduct({ ...createProduct, price: e.target.value })
                }
              ></input>
            </div>
            <div className="form_btn">
              <button type="submit">建立</button>
            </div>
          </div>
        </form>
      )}
      <div className="product_table">
        <table>
          <thead>
            <tr>
              <th>id</th>
              <th>產品名稱</th>
              <th>產品描述</th>
              <th>產品價格</th>
              <th>圖片網址</th>
              <th>刪除產品</th>
              <th>修改產品</th>
            </tr>
          </thead>
          <tbody>
            {productList.map((product) => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.title}</td>
                <td>{product.description}</td>
                <td>{product.price}</td>
                <td>{product.imgUrl}</td>
                <td>
                  {
                    <DeleteIcon
                      className="edit"
                      onClick={() => {
                        deleteProduct(product.id);
                      }}
                    >
                      刪除
                    </DeleteIcon>
                  }
                </td>
                <td>
                  {
                    <CreateIcon
                      className="edit"
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
                    </CreateIcon>
                  }
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Product;
