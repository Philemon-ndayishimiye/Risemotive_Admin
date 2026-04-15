import { apiSlice } from "../../api/EntryApi";

export interface ServiceRequest {
  id: number | string;
  trackingCode: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  service: string;
  description: string;
  documentUrl: string;
  preferredDate: string;
  tasker: string;
  status?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateServiceRequestRequest {
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  service: string;
  description: string;
  documentUrl: string;
  preferredDate: string;
  tasker: string;
}

export interface UpdateServiceRequestRequest {
  id: number | string;
  status: string;
}

export interface ServiceRequestsResponse {
  items: ServiceRequest[];
  total: number;
}

export interface MessageResponse {
  message: string;
}

export const creativeApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllCreativeRequests: builder.query<ServiceRequestsResponse, void>({
      query: () => "creative-media",
      providesTags: ["ServiceRequest"],
    }),

    getCreativeRequestById: builder.query<ServiceRequest, number | string>({
      query: (id) => `creative-media/${id}`,
      providesTags: (_result, _error, id) => [{ type: "ServiceRequest", id }],
    }),

    createCreativeRequest: builder.mutation<ServiceRequest, FormData>({
      query: (data) => ({
        url: "creative-media",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["ServiceRequest"],
    }),

    /* UPDATE STATUS */
    updateCreativeRequest: builder.mutation<
      ServiceRequest,
      UpdateServiceRequestRequest
    >({
      query: ({ id, status }) => ({
        url: `creative-media/${id}/status`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: "ServiceRequest", id },
        "ServiceRequest",
      ],
    }),

    deleteCreativeRequest: builder.mutation<MessageResponse, number | string>({
      query: (id) => ({
        url: `creative-media/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["ServiceRequest"],
    }),
  }),
});

export const {
  useGetAllCreativeRequestsQuery,
  useGetCreativeRequestByIdQuery,
  useCreateCreativeRequestMutation,
  useUpdateCreativeRequestMutation,
  useDeleteCreativeRequestMutation,
} = creativeApi;
