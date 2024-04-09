import Container from "@/app/components/Container";
import FormWrap from "@/app/components/FormWrap";
import AddProductForm from "./AddProductForm";
import { getCurrentUser } from "@/actions/getCurrentUser";
import NullData from "@/app/components/NullData";

const AddProducts = async () => {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser || currentUser.role !== "ADMIN") {
      return <NullData title="Acesso negado meu camarada" />;
    }

    return (
      <div className="p-8">
        <Container>
          <FormWrap>
            <AddProductForm />
          </FormWrap>
        </Container>
      </div>
    );
  } catch (error) {
    return null;
  }
};

export default AddProducts;
