import React from 'react';
import { Col, Row } from "react-bootstrap";
const ProductList=(props)=> {
  let extraClass = !props.status?"cursorpoint":""
  return (
    <div className="">
      <Row className="marg0 productList">
           {props.List ? props.List.map((item,i)=>(
           <Col lg={12} sm={12} md={12} xs={12} className={"lists"+extraClass}onClick={()=>props.handleCheckClick("Add",item)} key={i}>
               <Row>
               <Col lg={2} sm={2} md={2} xs={12}><img src={item.url} width="100%" height="50%"/></Col> 
                <Col lg={10} sm={10} md={10} xs={12}>
                <Row>
                  <Col lg={8} md={8} sm={8} xs={12}>
                     <div className=""><strong>{item.productName}</strong></div>
                  </Col>
                  <Col lg={4} md={4} sm={4} xs={12} className="textRight">
                  {props.status ? (<div><a onClick={()=>{props.changeClick("Edit",item)}}className="pad15">
                    <i class="fa fa-pencil-square" aria-hidden="true"></i></a>
                    <a onClick={()=>{props.changeClick("Delete",item)}} className="pad15">
                      <i class="fa fa-trash" aria-hidden="true"></i></a></div>):""}
                  </Col>
                </Row>
                <div>{"$ "+item.productRate}</div>
                <div>{item.description}</div><br/>
                </Col>
               </Row>
           </Col>)):<Col lg={12} sm={12} md={12} xs={12} className={"marginTop textCenter"}><h3>There is no product</h3></Col>}
      </Row>
    </div>
  );
}

export default ProductList;
