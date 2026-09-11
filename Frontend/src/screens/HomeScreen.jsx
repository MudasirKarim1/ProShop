import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";
import { useGetProductsQuery } from "../store/slices/productSlices";
import Loader from "../components/Loader.jsx";
import Message from "../components/Message.jsx";

const HomeScreen = () => {
  const { data: products, isLoading, error } = useGetProductsQuery();

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
      <h1>Latest Products</h1>
      <Row>
        {products?.map((product) => (
          <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
            <Product product={product} />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default HomeScreen;
