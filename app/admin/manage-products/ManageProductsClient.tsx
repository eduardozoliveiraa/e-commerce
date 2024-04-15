"use client";

import ActionBtn from "@/app/components/ActionBtn";
import Heading from "@/app/components/Heading";
import Status from "@/app/components/Status";
import firebaseApp from "@/libs/firebase";
import { formatPrice } from "@/utils/formatPrice";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Product } from "@prisma/client";
import axios from "axios";
import { deleteObject, getStorage, ref } from "firebase/storage";
import { Check, Clock4, Eye, RefreshCcw, Trash2, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import toast from "react-hot-toast";


interface ManageProductsClientProps {
  products: Product[];
}

const ManageProductsClient: React.FC<ManageProductsClientProps> = ({
  products,
}) => {
  const router = useRouter();
  const storage = getStorage(firebaseApp);
  let rows: any = [];

  if (products) {
    rows = products.map((product) => {
      return {
        id: product.id,
        name: product.name,
        price: formatPrice(product.price),
        category: product.category,
        brand: product.brand,
        inStock: product.inStock,
        images: product.images,
      };
    });
  }

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 220 },
    { field: "name", headerName: "Name", width: 220 },
    {
      field: "price",
      headerName: "Price(BRL)",
      width: 100,
      renderCell: (params) => {
        return (
          <div className="font-bold text-slate-800">{params.row.price}</div>
        );
      },
    },
    { field: "category", headerName: "Category", width: 100 },
    { field: "brand", headerName: "Brand", width: 100 },
    {
      field: "inStock",
      headerName: "inStock",
      width: 140,
      renderCell: (params) => {
        return (
          <div>
            {params.row.inStock == true ? (
              <Status
                text="in Stock"
                 icon={<Check />}
                bg="bg-teal-200"
                color="text-teal-700"
              />
            ) : (
              <Status
                text="Out of stock"
                 icon={<X />}
                bg="bg-rose-200"
                color="text-rose-700"
              />
            )}
          </div>
        );
      },
    },
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="flex justify-between pt-2.5 gap-4 w-full">
            <ActionBtn
               icon={<RefreshCcw />}
              onClick={() => {
                handleToogleStock(params.row.id, params.row.inStock);
              }}
            />
            <ActionBtn
               icon={<Trash2 />}
              onClick={() => {
                handleDelete(params.row.id, params.row.images);
              }}
            />
            <ActionBtn
               icon={<Eye />}
              onClick={() => {
                router.push(`product/${params.row.id}`);
              }}
            />
          </div>
        );
      },
    },
  ];

  const handleToogleStock = useCallback((id: string, inStock: boolean) => {
    axios
      .put("/api/product", {
        id,
        inStock: !inStock,
      })
      .then((res) => {
        toast.success("Status do produto modificado");
        router.refresh();
      })
      .catch((err) => {
        toast.error("Algo deu errado");
      });
  }, []);

  const handleDelete = useCallback(async (id: string, images: [any]) => {
    toast("Deletando produto, por favor aguarde");

    const handleImageDelete = async () => {
      try {
        for (const item of images) {
          if (item.image) {
            const ImageRef = ref(storage, item.image);
            await deleteObject(ImageRef);
          }
        }
      } catch (error) {}
    };

    await handleImageDelete();

    axios
      .delete(`/api/product/${id}`)
      .then((res) => {
        toast.success("Produto deletado");
        router.refresh();
      })
      .catch((err) => {
        toast.error("Falha ao deletar o produto");
      });
  }, []);

  return (
    <div className="max-w-[1150px] m-auto text-xl">
      <div className="mb-4 mt-8">
        <Heading title="Manage products" center />
      </div>
      <div style={{ height: 600, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 9 },
            },
          }}
          pageSizeOptions={[9, 20]}
          checkboxSelection
          disableRowSelectionOnClick
        />
      </div>
    </div>
  );
};

export default ManageProductsClient;
