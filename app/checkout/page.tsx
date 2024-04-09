import Container from "../components/Container";
import FormWrap from "../components/FormWrap";
import CheckouClient from "./CheckoutClient";

const Checkout = () => {
  return (
    <div className="p-8">
      <Container>
        <FormWrap>
          <CheckouClient />
        </FormWrap>
      </Container>
    </div>
  );
};

export default Checkout;
