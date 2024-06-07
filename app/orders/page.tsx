import Container from "@/app/components/Container";
import OrderClient from "./OrderClient";
import { getCurrentUser } from "@/actions/getCurrentUser";
import NullData from "@/app/components/NullData";
import getOrderByUserId from "@/actions/getOrdersByUserId";

const ManageProducts = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser || currentUser.role != "ADMIN") {
    return <NullData title="Acesso negado" />;
  }

  const orders = await getOrderByUserId(currentUser.id);

  if (!orders) {
    return <NullData title="Acesso negado" />;
  }

  return (
    <div className="pt-8">
      <Container>
        <OrderClient orders={orders} />
      </Container>
    </div>
  );
};

export default ManageProducts;
