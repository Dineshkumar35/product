import React, { useState, useEffect } from 'react';
import { Col, Row,Navbar,NavDropdown,Nav } from "react-bootstrap";
import ButtonComponent from "../Component/ButtonComponent";
import ModalComponent from "../Component/ModalComponent";
import LabelComponent from "../Component/LabelComponent";
import InputComponent from "../Component/InputComponent";
import ProductList from "../Component/ProductList";
import axios from "axios";
import { useSelector,useStore } from 'react-redux';
function Product() {
  const [showStatus, setshowStatus] = useState(false);
  const [productName, setproductName] = useState();
  const [productRate, setproductRate] = useState();
  const [url, seturl] = useState();
  const [description, setdescription] = useState();
  const [ProductId, setProductId] = useState();
  const [Process, setProcess] = useState();
  const [ProductStatus, setProductStatus] = useState();
  const [Status, setStatus] = useState("")
  const store = useStore();
  const handleNameChange = (data) => {
    setproductName(data);
  }
  const handleRateChange = (data) => {
    setproductRate(data);
  }
  const handleUrlChange = (data) => {
    seturl(data);
  }
  const handleDescriptionChange = (data) => {
    setdescription(data);
  }
  const handleClick = () => {
    setshowStatus(true);
    setproductName("");
    setproductRate("");
    seturl("");
    setdescription("");
    setProcess("Add");
    setProductStatus("Hide")
    store.dispatch({type: 'PRODUCT_DATA', ProductData: ""});
  }
  const handleClose = () => {
    setshowStatus(false);
    setStatus("");
  }
  const handleSave = () => {
     let productDetails = {
          productName,
          productRate,
          url,
          description,
          ProductId,
          ProductStatus
     };
     if(Status !== "Delete"){
      axios.post(Process === "Add" ? "/addProduct":"/editProduct",productDetails)
      .then(function (response) {
        console.log(response)
              store.dispatch({type: 'PRODUCT_DATA', ProductData: response.data});
              if(response.data && response.data.success){
                getdetails();
                setshowStatus(false);
                setStatus("");
              }
        })
      .catch(err=>{
        alert("Please enter all the details")
       });
     }else{
      axios.delete("/deleteProduct",{data:{ProductId:ProductId}})
      .then(function (response) {
        console.log(response)
              store.dispatch({type: 'PRODUCT_DATA', ProductData: response.data});
              if(response.data && response.data.success){
                getdetails();
                setshowStatus(false);
                setStatus("");
              }
              
        })
      .catch(err=>{
        console.log(err);
      });
     }
     
  }
  useEffect(() => {
    getdetails()
  },[])
  const getdetails =()=>{
    axios.get("/getProduct")
      .then(function (response) {
        console.log(response)
        if(response && response.data && response.data.success){
          store.dispatch({type: 'PRODUCT_LIST', ProductList: response.data});
        }
        })
      .catch(err=>{
        console.log(err);
      });
      return true;
  }
  const handleCheckClick =(status,data)=>{

  } 
  const changeClick =(status,data)=>{
    if(status === "Edit"){
      setshowStatus(true);
      setproductName(data.productName);
      setproductRate(data.productRate);
      seturl(data.url);
      setdescription(data.description);
      setProcess("Edit");
      setProductId(data._id);
      setProductStatus(data.status)
      setStatus(status);
    }else if(status === "Delete"){
      setshowStatus(true);
      setStatus(status);
      setProductId(data._id);
    }

  }

  let productStatus = useSelector(state => state && state.ProductData ? state.ProductData :"");
  let Products = useSelector(state => state && state.ProductList ? state.ProductList.ProductList :"");

 
  let failureStatus = productStatus && productStatus.failure && productStatus.failure.productNameFailure ? "invalidBr":"";
  return (
    <div>
      <Navbar bg="light" expand="lg">
  <Navbar.Brand href=""><img className="img_size"  src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDIzLjAuMywgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IgoJIHdpZHRoPSIxMDk3LjdweCIgaGVpZ2h0PSIzMzMuMXB4IiB2aWV3Qm94PSIwIDAgMTA5Ny43IDMzMy4xIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCAxMDk3LjcgMzMzLjE7IgoJIHhtbDpzcGFjZT0icHJlc2VydmUiPgo8c3R5bGUgdHlwZT0idGV4dC9jc3MiPgoJLnN0MHtmaWxsOiNGRkZGRkY7fQoJLnN0MXtmaWxsOiNGRjZDMzc7fQo8L3N0eWxlPgo8dGl0bGU+aG9yLXdoaXRlLWxvZ288L3RpdGxlPgo8Zz4KCTxnIGlkPSJMYXllcl8yLTIiPgoJCTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik0xODYuNyw5LjNDOTkuNy0xLjksMjAuMSw1OS42LDksMTQ2LjZzNTAuMywxNjYuNiwxMzcuMywxNzcuN0MyMzMuMywzMzUuNSwzMTIuOSwyNzQsMzI0LDE4NwoJCQljMC0wLjEsMC0wLjIsMC0wLjJDMzM1LjEsOTkuOCwyNzMuNiwyMC40LDE4Ni43LDkuM3oiLz4KCQk8cGF0aCBjbGFzcz0ic3QwIiBkPSJNNDE5LjIsMTEzLjdoLTI3LjFjLTEuMy0wLjEtMi42LDAuNC0zLjUsMS4yYy0wLjksMC43LTEuNCwxLjgtMS40LDN2OTZjMCwxLjMsMC44LDIuNiwyLDMuMgoJCQljMi42LDEuNiw1LjksMS42LDguNSwwYzEuMy0wLjYsMi4xLTEuOCwyLjEtMy4ydi0zNy4yaDE4LjZjOC4xLDAuNCwxNi4xLTIuMywyMi40LTcuNWM2LjEtNi4zLDkuMi0xNC45LDguNS0yMy42di0xLjMKCQkJYzAuOC04LjUtMi4xLTE3LTcuOS0yMy4zQzQzNS4xLDExNS44LDQyNy4yLDExMy4yLDQxOS4yLDExMy43eiBNNDM3LjgsMTQ2LjdjMC40LDUuNS0xLjQsMTEtNC45LDE1LjJjLTMuOSwzLjgtOS4xLDUuNy0xNC41LDUuNAoJCQloLTE4LjZ2LTQyLjhoMTguNmM1LjItMC4zLDEwLjMsMS42LDE0LDUuMWMzLjYsNC4yLDUuNCw5LjcsNC45LDE1LjJMNDM3LjgsMTQ2Ljd6Ii8+CgkJPHBhdGggY2xhc3M9InN0MCIgZD0iTTUwMCwxMjAuOGMtNi4xLDYuMy05LjEsMTUtOC40LDIzLjd2NDMuMWMtMC44LDguOCwyLjMsMTcuNCw4LjQsMjMuOGMxMy4zLDEwLjEsMzEuNywxMC4xLDQ1LDAKCQkJYzYuMi02LjMsOS4zLTE1LDguNS0yMy44di00Mi44YzAuOS04LjktMi4yLTE3LjctOC41LTI0LjFDNTMxLjcsMTEwLjcsNTEzLjMsMTEwLjcsNTAwLDEyMC44eiBNNTQxLjQsMTg3LjcKCQkJYzAuNSw1LjYtMS4zLDExLjEtNC45LDE1LjNjLTMuNywzLjYtOC44LDUuNC0xMy45LDUuMWMtMTIuNiwwLTE4LjYtNi45LTE4LjYtMjAuNXYtNDIuOGMwLTEzLjYsNi4yLTIwLjQsMTguNi0yMC40CgkJCWM1LjItMC4zLDEwLjIsMS41LDEzLjksNS4xYzMuNiw0LjIsNS40LDkuNyw0LjksMTUuMlYxODcuN3oiLz4KCQk8cGF0aCBjbGFzcz0ic3QwIiBkPSJNNjQxLjUsMTYyYy00LjctMi4xLTkuMy00LTEzLjktNS43Yy00LjMtMS40LTguNC0zLjYtMTEuOS02LjVjLTMuMi0yLjYtNC45LTYuNy00LjYtMTAuOAoJCQljLTAuNC00LjUsMS43LTguOCw1LjQtMTEuM2M0LjItMi41LDkuMS0zLjcsMTMuOS0zLjRjNC42LTAuMSw5LjIsMC44LDEzLjQsMi43YzIuMSwxLDQuMiwxLjksNi40LDIuNmMxLjYsMCwzLTAuOSwzLjctMi4zCgkJCWMwLjgtMS4zLDEuNC0yLjgsMS41LTQuM2MwLTIuOS0yLjgtNS4zLTguMi03LjFjLTUuNS0xLjctMTEuMi0yLjYtMTctMi41Yy0zLjcsMC03LjQsMC40LTExLDEuM2MtMy41LDAuOS02LjksMi4yLTEwLDQuMQoJCQljLTMuMywyLTUuOSw0LjktNy42LDguNGMtMiw0LjEtMyw4LjYtMi45LDEzLjJjLTAuMiw1LjYsMS41LDExLjIsNC44LDE1LjdjMy4xLDQsNy4yLDcuMiwxMS45LDkuM2M0LjcsMiw5LjMsMy44LDEzLjksNS41CgkJCWM0LjQsMS42LDguNSw0LjIsMTEuOCw3LjVjMy4zLDMuNSw1LDguMSw0LjgsMTIuOGMwLjQsNS0xLjYsOS45LTUuMywxMy4zYy00LjIsMy4zLTkuNCw0LjgtMTQuNyw0LjVjLTMuNiwwLjEtNy4xLTAuNS0xMC40LTEuOAoJCQljLTIuNS0wLjgtNC44LTIuMi02LjgtNGwtNC41LTQuM2MtMC45LTAuOS0yLjEtMS42LTMuMy0xLjhjLTEuNCwwLjEtMi43LDAuOS0zLjQsMi4xYy0xLDEuMy0xLjYsMi44LTEuNyw0LjVjMCwzLjQsMyw3LDkuMywxMC41CgkJCWM2LjUsMy44LDE0LDUuNywyMS42LDUuNGM4LjMsMC40LDE2LjQtMi4zLDIyLjgtNy41YzYuMS01LjgsOS4yLTE0LDguNi0yMi4zQzY1OC43LDE3OCw2NTIuMiwxNjcsNjQxLjUsMTYyTDY0MS41LDE2MnoiLz4KCQk8cGF0aCBjbGFzcz0ic3QwIiBkPSJNNzU2LjYsMTEzLjdoLTU4LjRjLTEuMywwLTIuNCwwLjYtMy4yLDEuNmMtMS42LDIuMy0xLjYsNS40LDAsNy43YzAuNywxLDEuOSwxLjYsMy4yLDEuNmgyMy4ydjg5LjMKCQkJYzAsMS4zLDAuNywyLjUsMS44LDMuMmMyLjYsMS42LDUuOSwxLjYsOC41LDBjMS4yLTAuNiwxLjktMS44LDEuOS0zLjJ2LTg5LjNoMjIuOWMxLjMsMC4xLDIuNS0wLjYsMy4yLTEuNwoJCQljMC44LTEuMSwxLjItMi41LDEuMS0zLjljMC0xLjMtMC4zLTIuNi0xLjEtMy43Qzc1OC45LDExNC4zLDc1Ny44LDExMy43LDc1Ni42LDExMy43eiIvPgoJCTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik04NzIuMywxMTMuN2MtMy42LDAtNi44LDIuNS05LjMsNy42bC0yMi43LDQzLjFsLTIyLjUtNDMuMWMtMi42LTUuMS01LjgtNy42LTkuMy03LjZIODA2CgkJCWMtMi44LDAuNS00LjcsMy4yLTQuMyw2djk0LjFjMCwxLjQsMC43LDIuNywyLDMuM2MxLjMsMC44LDIuOCwxLjIsNC4zLDEuMWMxLjQsMCwyLjgtMC41LDQtMS4zYzEuMi0wLjYsMS45LTEuOCwxLjktMy4ydi03NS42CgkJCWwyMS43LDQxLjRjMC42LDIsMi4zLDMuNCw0LjQsMy41YzIuMi0wLjEsNC0xLjUsNC43LTMuNWwyMS43LTQwLjd2NzQuOWMwLDEuMywwLjcsMi41LDEuOCwzLjJjMi42LDEuNSw1LjgsMS41LDguNSwwCgkJCWMxLjItMC42LDEuOS0xLjgsMS45LTMuMnYtOTQuM2MwLjEtMC41LDAuMS0xLDAtMS41bDAsMEM4NzcuOSwxMTUuMiw4NzUuMiwxMTMuMiw4NzIuMywxMTMuN3oiLz4KCQk8cGF0aCBjbGFzcz0ic3QwIiBkPSJNOTU2LjUsMTEzLjhjLTQuMSwwLTYuNSwxLjQtNy4zLDQuMWwtMjkuNCw5NC41Yy0wLjEsMC40LTAuMSwwLjcsMCwxLjFjMCwxLjYsMC45LDMuMSwyLjMsMy44CgkJCWMxLjUsMC45LDMuMiwxLjQsNC45LDEuNGMxLjksMC4zLDMuOC0wLjksNC40LTIuOGw2LjItMjAuOWgzNy4ybDYuMiwyMC45YzAuNiwxLjgsMi41LDMsNC40LDIuN2MxLjgsMC4xLDMuNy0wLjQsNS4yLTEuNAoJCQljMS40LTAuNiwyLjMtMS45LDIuMy0zLjQgTTk5MywyMTMuNHYtMC41bC0yOS40LTk1Yy0wLjctMi43LTMuMS00LjEtNy4yLTQuMUw5OTMsMjEzLjR6IE05NDAuNCwxODQuOGwxNi01My42bDE2LjEsNTMuNgoJCQlMOTQwLjQsMTg0LjhMOTQwLjQsMTg0Ljh6Ii8+CgkJPHBhdGggY2xhc3M9InN0MCIgZD0iTTEwOTYsMTE0LjdjLTIuNi0xLjUtNS44LTEuNS04LjUsMGMtMS4xLDAuNi0xLjgsMS44LTEuOSwzLjF2NzMuNWwtMzUuNy02OS45Yy0wLjktMi4yLTIuMy00LjItNC01LjkKCQkJYy0xLjQtMS4yLTMuMi0xLjgtNS4xLTEuOGMtNC4xLDAtNiwxLjQtNiw0LjJ2OTZjLTAuMSwxLjMsMC42LDIuNSwxLjgsMy4yYzIuNiwxLjYsNS45LDEuNiw4LjUsMGMxLjEtMC42LDEuOC0xLjksMS44LTMuMlYxNDEKCQkJbDM3LjIsNzIuMWMxLjIsMy4yLDQuMiw1LjMsNy41LDUuNWMxLjUsMCwzLTAuNCw0LjMtMS4yYzEuMS0wLjcsMS44LTEuOSwxLjgtMy4ydi05Ni40QzEwOTcuNywxMTYuNSwxMDk3LjEsMTE1LjQsMTA5NiwxMTQuN3oiLz4KCQk8cGF0aCBjbGFzcz0ic3QxIiBkPSJNMjYxLjgsODMuN2MtMC45LDAuNC0xLjQsMS41LTEsMi40YzAsMC4xLDAuMSwwLjEsMC4xLDAuMmMxLDIsMC44LDQuNS0wLjcsNi4yYy0wLjcsMC43LTAuOCwxLjktMC4xLDIuNgoJCQljMCwwLDAsMCwwLjEsMC4xYzAuNCwwLjEsMC45LDAuMSwxLjMsMGMwLjUsMCwxLjEtMC4zLDEuNC0wLjdjMi41LTIuOSwzLTcsMS4yLTEwLjRDMjYzLjYsODMuNCwyNjIuNiw4My4yLDI2MS44LDgzLjd6Ii8+CgkJPHBhdGggY2xhc3M9InN0MSIgZD0iTTE4Ny43LDEuNEM5Ni41LTEwLjQsMTMuMSw1NC4xLDEuNCwxNDUuM1M1NC4xLDMyMCwxNDUuMywzMzEuN1MzMTkuOSwyNzksMzMxLjcsMTg3LjgKCQkJQzM0My40LDk2LjYsMjc5LDEzLjEsMTg3LjcsMS40QzE4Ny44LDEuNCwxODcuOCwxLjQsMTg3LjcsMS40eiBNMjIyLDEwNS4yYy0zLjEsMC4xLTYsMS4zLTguMiwzLjVMMTUyLDE3MC41bC0xMy4yLTEzLjIKCQkJQzE5OS42LDk2LjYsMjEwLjcsOTYsMjIyLDEwNS4yeiBNMTU0LjUsMTcyLjdsNjEuNi02MS4yYzMuNC0zLjMsOC44LTMuMywxMi4yLDBjMS43LDEuNywyLjYsNCwyLjUsNi4zYy0wLjEsMi40LTEuMSw0LjYtMi45LDYuMgoJCQlsLTY1LjEsNTcuNEwxNTQuNSwxNzIuN3ogTTE1OS4xLDE4MmwtMTUuMywzLjljLTAuMywwLjItMC42LDAuMi0wLjksMGMtMC4yLTAuMy0wLjItMC43LDAtMWw5LjMtOS4zTDE1OS4xLDE4MnogTTEyMC4xLDE3NS42CgkJCWwxNi4zLTE2LjNsMTIuMywxMi42bC0yNy45LDZjLTAuNiwwLjEtMS4yLTAuMy0xLjMtMC45Yy0wLjEtMC40LDAtMC43LDAuMy0xTDEyMC4xLDE3NS42eiBNNjkuNiwyNjAuM2MtMC40LTAuMS0wLjgtMC40LTAuOS0wLjcKCQkJYy0wLjEtMC40LTAuMS0wLjgsMC0xLjFsMTMuMS0xMy4ybDE3LDE2LjlMNjkuNiwyNjAuM3ogTTEwMy4yLDI0Mi44TDEwMy4yLDI0Mi44Yy0xLjMsMC43LTIsMi4xLTEuNywzLjVsMi44LDEyCgkJCWMwLjIsMC44LTAuMiwxLjYtMC44LDJjLTAuNiwwLjUtMS41LDAuNS0yLDBsLTE3LTE3LjVsNTIuMi01Mi4zbDI1LjMtNS40bDEyLjEsMTIuMWMtMjEuNiwxOC00NS40LDMzLjMtNzAuOCw0NS40djAuMkgxMDMuMnoKCQkJIE0xNzYuNiwxOTUuMkwxNjUsMTgzLjZsNjUuMS01Ny4zYzAuNi0wLjUsMS4yLTEuMSwxLjctMS44QzIyOS43LDE0My4xLDIwMy41LDE2OS41LDE3Ni42LDE5NS4yeiBNMjI3LjQsMTA1LjUKCQkJYy05LjctMTAuMS05LjMtMjYuMSwwLjgtMzUuOGM5LjItOC44LDIzLjQtOS40LDMzLjMtMS40bC0yMi40LDIyLjNjLTAuNiwwLjctMC42LDEuNywwLDIuNGwxNy40LDE3LjNjLTkuOCw0LjgtMjEuNiwyLjgtMjkuMi01CgkJCUwyMjcuNCwxMDUuNXogTTI2My4xLDEwNS41Yy0xLjIsMS4xLTIuNCwyLjItMy44LDMuMWwtMTYuNy0xNi43bDIxLjMtMjEuM0MyNzMuMSw4MC41LDI3Mi44LDk1LjksMjYzLjEsMTA1LjV6Ii8+Cgk8L2c+CjwvZz4KPC9zdmc+Cg=="/></Navbar.Brand>
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="mr-auto">
      <Nav.Link href="#home">Home</Nav.Link>
      <Nav.Link href="#link">Link</Nav.Link>
      <NavDropdown title="Dropdown" id="basic-nav-dropdown">
        <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
      </NavDropdown>
    </Nav>
  </Navbar.Collapse>
</Navbar>
    <div className="container">
      <Row>
        <Col lg={1} sm={1} md={1} xs={12} />
        <Col lg={10} sm={10} md={10} xs={10} className="App padside0">
        <Row className="marg0 padtop20 borderBtm">
        <Col lg={7} sm={7} md={7} xs={12} className="textRight">
           <h2 className="padbtm20">Products</h2>
           </Col>
           <Col lg={5} sm={5} md={5} xs={12} className="textRight">
            <a  onClick={handleClick}><i className="fa fa-plus-circle" aria-hidden="true"></i></a>
            </Col>
        </Row>
          <Row className="marg0 padtop20 padbtm20">
            <Col lg={6} sm={6} md={6} xs={12}>
              <h4>Product Rented Out</h4>
            </Col>
          </Row>
          <ProductList List={Products} status={true} handleCheckClick={handleCheckClick} changeClick={changeClick}/>
          <ModalComponent handleClose={handleClose} handleSave={handleSave} modalTitle={"Product"} modalBody={
            Status !== "Delete" ? (<div className="">
            <div className="pad15">
              <LabelComponent className="" textName={"Product Name"} />
              <InputComponent className={"form-control "+failureStatus} type="text" placeholder="Enter product name" value={productName} handleChange={handleNameChange} />
              {productStatus && productStatus.failure && productStatus.failure.productNameFailure ?(<LabelComponent className ="invalid" textName={productStatus && productStatus.failure && productStatus.failure.productNameFailure}/>):""}
            </div>
            <div className="pad15">
              <LabelComponent className="" textName={"Sale Amount"} />
              <InputComponent className="form-control" type="text" placeholder="Enter amount" value={productRate} handleChange={handleRateChange} />
            </div>
            <div className="pad15">
              <LabelComponent className="" textName={"Image url"} />
              <InputComponent className="form-control" type="text" placeholder="Enter product image url" value={url} handleChange={handleUrlChange} />
            </div>
            <div className="pad15">
              <LabelComponent className="" textName={"Specifications"} />
              <InputComponent className="form-control" type="text" placeholder="Enter specifications" value={description} handleChange={handleDescriptionChange} />
            </div>
          </div>):<div>Are you sure want delete this product?</div>
          } showStatus={showStatus} saveBtn={Status === "Delete"  ? "Yes" :"Save"} closeBtn={Status === "Delete"  ? "No" :"Close"}/>
        </Col>
         
      </Row>
      </div>
    </div>
  );
}

export default Product;
