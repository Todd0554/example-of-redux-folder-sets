import React, {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { Link, useParams, useNavigate} from 'react-router-dom'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { listProductDetails } from '../actions/productActions'
import {
  Row, 
  Col, 
  Image, 
  ListGroup, 
  Card, 
  Button,
  Form
} from 'react-bootstrap'
import Rating from '../components/Rating'

const ProductScreen = () => {
  const {id} = useParams()
  const navigate = useNavigate()
  const [qty, setQty] = useState(1)
  const dispatch = useDispatch()
  const productDetails = useSelector(state => state.productDetails)
  const {loading, error, product} = productDetails
  
  

  useEffect(() => {
    dispatch(listProductDetails(id))
  }, [dispatch, id])

  // add to cart handler
  const addToCartHandler = () => {
    navigate(`/cart/${id}?qty=${qty}`)
  }


  return (
    <>
      <Link className="btn btn-dark my-3" to="/">Back</Link>
      {loading ? 
      <Loader /> : 
      error ? 
      <Message variant="danger">{error}</Message> :
      (
      <Row>
        <Col md={12} lg={6}><Image src={product.image} alt={product.name} fluid/></Col>
        <Col id="show-group" md={12} lg={3}>
          <ListGroup >
            <ListGroup.Item>
              <h3>{product.name}</h3>
            </ListGroup.Item>
            <ListGroup.Item>
              <Rating value={product.rating} text={`${product.numReviews} reviews`}/>
            </ListGroup.Item>
            <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
            <ListGroup.Item id="product-description">
              Description: ${product.description}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={12} lg={3}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <Row>
                  <Col>Price:</Col>
                  <Col>${product.price}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Storage:</Col>
                  <Col>{product.countInStock > 0 ? product.countInStock : "Out of stock"}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Qty</Col>
                  <Col>
                    <Form.Select 
                    size='sm'
                    value={qty} 
                    onChange={(e) => setQty(e.target.value)}>
                      {[...Array(product.countInStock).keys()].map(i => (<option key={i+1} value={i+1}>{i+1}</option>))}
                    </Form.Select>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Button 
                onClick={addToCartHandler} 
                className='btn-block btn-dark col-12' 
                type="button" 
                disabled={product.countInStock === 0}>Add to cart</Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
      )}
    </>
  )
}

export default ProductScreen