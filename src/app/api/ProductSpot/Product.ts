import { apiSlice } from "../../api/EntryApi";

export interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  category: string;
  imageUrl: string;
  inStock: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface ProductsResponse {
  items: Product[];
  total: number;
}

export interface UpdateProductRequest {
  id: number;
  name?: string;
  description?: string;
  price?: string;
  category?: string;
  imageUrl?: string;
  inStock?: boolean;
}

export interface MessageResponse {
  message: string;
}

export const productApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllProducts: builder.query<ProductsResponse, void>({
      query: () => "products",
      providesTags: ["Product"],
    }),

    getProductById: builder.query<Product, number>({
      query: (id) => `products/${id}`,
      providesTags: (_result, _error, id) => [{ type: "Product", id }],
    }),

    //  Accepts FormData — image goes to Cloudinary via server.ts POST /products
    createProduct: builder.mutation<Product, FormData>({
      query: (data) => ({
        url: "products",
        method: "POST",
        body: data,
        //  Do NOT set Content-Type — browser sets it with boundary automatically
        formData: true,
      }),
      invalidatesTags: ["Product"],
    }),

    //  JSON update (no file upload on edit)
    updateProduct: builder.mutation<Product, UpdateProductRequest>({
      query: ({ id, ...data }) => ({
        url: `products/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: "Product", id },
        "Product",
      ],
    }),

    deleteProduct: builder.mutation<MessageResponse, number>({
      query: (id) => ({
        url: `products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Product"],
    }),
  }),
});

export const {
  useGetAllProductsQuery,
  useGetProductByIdQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productApi;
