import { useGetSingleProductQuery } from "../store/slices/productSlices.js";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Rating from "../components/Rating.jsx";
import { Row, Col, Image, ListGroup, Button, Card } from "react-bootstrap";
import Loader from "../components/Loader.jsx";
import Message from "../components/Message.jsx";

const ProductScreen = () => {
  const { id: productId } = useParams();

  const {
    data: product,
    isLoading,
    error,
  } = useGetSingleProductQuery(productId);

  if (isLoading) {
    return <Loader />;
  } else if (error) {
    return (
      <Message variant="danger">
        {error?.data?.message || error?.error || "Error fetching product"}
      </Message>
    );
  }

  return (
    <>
      <Link className="btn btn-light my-3" to="/">
        Go Back
      </Link>
      <Row>
        <Col md={5}>
          <Image src={product.image} alt={product.name} fluid />
        </Col>
        <Col md={4}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h3>{product.name}</h3>
            </ListGroup.Item>
            <ListGroup.Item>
              <Rating
                value={product.rating}
                text={`${product.numReviews} reviews`}
              />
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Price:</strong> ${product.price}
            </ListGroup.Item>
            <ListGroup.Item>
              {" "}
              <strong>Description:</strong> {product.description}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={3}>
          <Card>
            <Card.Body>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  Price: <strong>${product.price}</strong>
                </ListGroup.Item>
                <ListGroup.Item>
                  Status:{" "}
                  {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
                </ListGroup.Item>
                {product.countInStock > 0 && (
                  <ListGroup.Item>
                    <Button
                      type="button"
                      disabled={product.countInStock === 0}
                      className="btn btn-block"
                    >
                      Add to Cart
                    </Button>
                  </ListGroup.Item>
                )}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default ProductScreen;
