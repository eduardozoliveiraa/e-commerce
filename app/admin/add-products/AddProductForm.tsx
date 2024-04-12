"use client";

import Button from "@/app/components/Button";
import Heading from "@/app/components/Heading";
import CategoryInput from "@/app/components/inputs/CategoryInput";
import CustomCheckBox from "@/app/components/inputs/CustomCheckBox";
import Input from "@/app/components/inputs/Input";
import SelectColor from "@/app/components/inputs/SelectColor";
import TextArea from "@/app/components/inputs/TextArea";
import firebaseApp from "@/libs/firebase";
import { categories } from "@/utils/Categories";
import { colors } from "@/utils/Colors";
import { useCallback, useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { error } from "console";
import axios from "axios";
import { useRouter } from "next/navigation";

export type ImageType = {
  color: string;
  colorCode: string;
  image: File | null;
};

export type UploadedImageType = {
  color: string;
  colorCode: string;
  image: string;
};

const AddProductForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState<ImageType[] | null>();
  const [isProdudctCreated, setIsProductCreated] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      description: "",
      brand: "",
      category: "",
      inStock: false,
      images: [],
      price: "",
    },
  });

  useEffect(() => {
    setCustomValue("images", images);
  }, [images]);

  useEffect(() => {
    if (isProdudctCreated) {
      reset;
      setImages(null);
      setIsProductCreated(false);
    }
  }, [isProdudctCreated]);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);
    let uploadedImages: UploadedImageType[] = [];

    if (!data.category) {
      setIsLoading(false);
      return toast.error("Categoria nao selecionada");
    }
    if (!data.images || data.images.length == 0) {
      setIsLoading(false);
      return toast.error("Nenhuma imagem selecionada");
    }
    const handleImageUploads = async () => {
      toast("Criando produto, aguarde...");
      try {
        for (const item of data.images) {
          if (item.image) {
            const fileName = new Date().getTime() + "" + item.image.name;
            const storage = getStorage(firebaseApp);
            const storageRef = ref(storage, `products/${fileName}`);
            const uploadTask = uploadBytesResumable(storageRef, item.image);

            await new Promise<void>((resolve, reject) => {
              uploadTask.on(
                "state_changed",
                (snapshot) => {
                  (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

                  switch (snapshot.state) {
                    case "paused":
                      break;
                    case "running":
                      break;
                  }
                },
                (error) => {
                  reject(error);
                },
                () => {
                  getDownloadURL(uploadTask.snapshot.ref)
                    .then((downloadURL) => {
                      uploadedImages.push({ ...item, image: downloadURL });
                      resolve();
                    })
                    .catch((error) => {
                      reject(error);
                    });
                }
              );
            });
          }
        }
      } catch (error) {
        setIsLoading(false);
        return toast.error("Erro ao carregar imagens");
      }
    };

    await handleImageUploads();
    const productData = { ...data, images: uploadedImages };

    axios
      .post("/api/product", productData)
      .then(() => {
        toast.success("Produto criado");
        setIsProductCreated(true);
        router.refresh();
      })
      .catch((error) => {
        toast.error("Algo deu errado ao criar");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const category = watch("category");

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  const addImageToState = useCallback((value: ImageType) => {
    setImages((prev) => {
      if (!prev) {
        return [value];
      }
      return [...prev, value];
    });
  }, []);
  const removeImageToState = useCallback((value: ImageType) => {
    setImages((prev) => {
      if (prev) {
        const filteredImages = prev.filter((item) => item.color != item.color);
        return filteredImages;
      }
      return prev;
    });
  }, []);

  return (
    <>
      <Heading title="Adicione um produto" center />
      <Input
        id="name"
        label="Name"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="price"
        label="Price"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="brand"
        label="Brand"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <TextArea
        id="description"
        label="Description"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <CustomCheckBox
        id="inStock"
        register={register}
        label="Este produto esta no estoque"
      />
      <div className="w-full font-medium">
        <div className="mb-2 font-semibold">Selecione uma categoria</div>
        <div className="grid grid-cols-2 md:grid-cols-3 max-h[50vh] overflow-y-auto">
          {categories.map((item) => {
            if (item.label === "All") {
              return null;
            }
            return (
              <div key={item.label} className="col-span">
                <CategoryInput
                  onClick={(category) => setCustomValue("category", category)}
                  selected={category == item.label}
                  label={item.label}
                  // Icon={item.icon}
                />
              </div>
            );
          })}
        </div>
      </div>
      <div className="w-full flex flex-col flex-wrap">
        <div>
          <div className="font-bold">
            Select the available products colors and upload their images
          </div>
          <div className="text-sm">
            You must select an image for each of the color selected
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {colors.map((item, index) => {
            return (
              <SelectColor
                key={index}
                item={item}
                addImageToState={addImageToState}
                removeImageFromState={removeImageToState}
                isProductCreated={isProdudctCreated}
              />
            );
          })}
        </div>
      </div>
      <Button
        label={isLoading ? "Loading" : "Add product"}
        onClick={handleSubmit(onSubmit)}
      />
    </>
  );
};

export default AddProductForm;
