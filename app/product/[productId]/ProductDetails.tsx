"use client";

import Button from "@/app/components/Button";
import ProductImage from "@/app/components/products/ProductImage";
import SetColor from "@/app/components/products/SetColor";
import SetQuatity from "@/app/components/products/SetQuantity";
import { useCart } from "@/hooks/useCart";
import { Rating } from "@mui/material";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { MdCheckCircle } from "react-icons/md";

interface ProductDetailsProps {
  product: any;
}

export type CartProductType = {
  id: string;
  name: string;
  description: string;
  category: string;
  brand: string;
  selectedImg: SelectedImgType;
  qty: number;
  price: number;
};

export type SelectedImgType = {
  color: string;
  colorCode: string;
  image: string;
};

const Horizontal = () => {
  return <hr className="w-[30%] my-2"></hr>;
};

const ProductDetails: React.FC<ProductDetailsProps> = ({ product }) => {
  const { handleAddProductToCart, cartProducts } = useCart();
  const [isProductInCart, setIsProductInCart] = useState(false);
  const { cartTotalQty } = useCart();

  const [CartProduct, setCartProduct] = useState<CartProductType>({
    id: product.id,
    name: product.name,
    description: product.description,
    category: product.category,
    brand: product.brand,
    selectedImg: { ...product.images[0] },
    qty: 1,
    price: product.price,
  });

  const router = useRouter()

  console.log(cartProducts);

  useEffect(() => {
    setIsProductInCart(false);

    if (cartProducts) {
      const existingIndex = cartProducts.findIndex(
        (item) => item.id === product.id
      );

      if (existingIndex > -1) {
        setIsProductInCart(true);
      }
    }
  }, [cartProducts]);

  const productRating =
    product.reviews.reduce((acc: number, item: any) => item.rating + acc, 0) /
    product.reviews.length;

  const handleColorSelect = useCallback(
    (value: SelectedImgType) => {
      setCartProduct((prev) => {
        return { ...prev, selectedImg: value };
      });
    },
    [CartProduct.selectedImg]
  );

  const handleQtyIncrease = useCallback(() => {
    setCartProduct((prev) => {
      const newQty = prev.qty + 1;
      if (newQty <= 99) {
        return { ...prev, qty: newQty };
      } else {
        return prev;
      }
    });
  }, [CartProduct]);

  const handleQtyDecrease = useCallback(() => {
    setCartProduct((prev) => {
      const newQty = prev.qty - 1;
      if (newQty >= 1) {
        return { ...prev, qty: newQty };
      } else {
        return prev;
      }
    });
  }, [CartProduct]);

  return (
    <div
      className="
      grid grid-cols-1
      md:grid-cols-2 gap-12"
    >
      <ProductImage
        cartProduct={CartProduct}
        product={product}
        handleColorSelect={handleColorSelect}
      />
      <div className="flex flex-col gap-1 text-slate-500 text-sm">
        <h2 className="text-3xl font-medium text-slate-700">{product.name}</h2>
        <div className="flex items-center gap-2">
          <Rating value={productRating} readOnly />
          <div>{product.reviews.length} reviews</div>
        </div>
        <Horizontal />
        <div className="text-justify">{product.description}</div>
        <Horizontal />
        <div>
          <span className="font-semibold">Categoria: </span>
          {product.category}
        </div>
        <div>
          <span className="font-semibold">brand: </span>
          {product.brand}
        </div>
        <div className={product.inStock ? "text-teal-400" : "text-rose-400"}>
          {product.inStock ? "in Stock" : "Out of Stock"}
        </div>
        <Horizontal />
        {isProductInCart ? (
          <>
            <p className="mb-2 text-slate-500 flex items-center gap-1">
              <span className="text-teal-400">
              <MdCheckCircle size={20}/>
              </span>
              <span>Produto adicionado ao carrinho</span>
            </p>
            <div>
              <Button label="View Cart" outline onClick={() => router.push('/cart')}></Button>
            </div>
          </>
        ) : (
          <>
            <SetColor
              cartProduct={CartProduct}
              images={product.images}
              handleColorSelect={handleColorSelect}
            />

            <Horizontal />
            <SetQuatity
              cartProduct={CartProduct}
              handleQtyIncrease={handleQtyIncrease}
              handleQtyDecrease={handleQtyDecrease}
            />
            <Horizontal />
            <div className="max-w-[300px]">
              <Button
                label="Add To Cart"
                onClick={() => handleAddProductToCart(CartProduct)}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
