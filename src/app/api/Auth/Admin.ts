import { apiSlice } from "../../api/EntryApi";

export interface Admin {
  id: number;
  fullName: string;
  email: string;
  role: string;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateAdminRequest {
  fullName: string;
  email: string;
  password: string;
  role: "ADMIN" | "SUPER_ADMIN";
}

export interface UpdateAdminRequest extends Partial<CreateAdminRequest> {
  id: number;
}

export interface MessageResponse {
  message: string;
}

export interface ApiResponse<T> {
  data: T;
}

export const adminApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

 getAllAdmins: builder.query<Admin[], void>({
  query: () => "admin",
  transformResponse: (response: ApiResponse<Admin[]>) => {
    console.log("🔍 Raw admins response:", response); //  remove after confirming
    return Array.isArray(response) ? response : response?.data ?? [];
  },
  providesTags: ["Admin"],
}),

    getAdminById: builder.query<Admin, number>({
      query: (id) => `admin/${id}`,
      providesTags: (_result, _error, id) => [{ type: "Admin", id }],
    }),

    createAdmin: builder.mutation<Admin, CreateAdminRequest>({
      query: (data) => ({
        url: "admin",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Admin"],
    }),

    updateAdmin: builder.mutation<Admin, UpdateAdminRequest>({
      query: ({ id, ...data }) => ({
        url: `admin/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: "Admin", id },
        "Admin",
      ],
    }),

    deleteAdmin: builder.mutation<MessageResponse, number>({
      query: (id) => ({
        url: `admin/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Admin"],
    }),

    activateAdmin: builder.mutation<MessageResponse, number>({
      query: (id) => ({
        url: `admin/activate/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["Admin"],
    }),

    deactivateAdmin: builder.mutation<MessageResponse, number>({
      query: (id) => ({
        url: `admin/deactivate/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["Admin"],
    }),

  }),
});

export const {
  useGetAllAdminsQuery,
  useGetAdminByIdQuery,
  useCreateAdminMutation,
  useUpdateAdminMutation,
  useDeleteAdminMutation,
  useActivateAdminMutation,
  useDeactivateAdminMutation,
} = adminApi;