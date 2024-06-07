import { Container } from "@mui/material";
import OrderDetails from "./OrderDetails";
import getOrderbyId from "@/actions/getOrderById";
import NullData from "@/app/components/NullData";

interface IPrams {
  orderId?: string;
}

const Order = async ({ params }: { params: IPrams }) => {
  const order = await getOrderbyId(params);

  if (!order) return <NullData title="No order"></NullData>;

  return (
    <div className="p-8">
      <Container>
        <OrderDetails order={order} />
      </Container>
    </div>
  );
};

export default Order;
