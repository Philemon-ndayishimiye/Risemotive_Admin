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

export interface ServiceRequestsResponse {
  items: ServiceRequest[];
  total: number;
}

export interface UpdateServiceRequestRequest {
  id: number | string;
  status: string;
}

export interface MessageResponse {
  message: string;
}

export const webApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllWebRequests: builder.query<ServiceRequestsResponse, void>({
      query: () => "web-digital",
      providesTags: ["ServiceRequest"],
    }),

    getWebRequestById: builder.query<ServiceRequest, number | string>({
      query: (id) => `web-digital/${id}`,
      providesTags: (_result, _error, id) => [{ type: "ServiceRequest", id }],
    }),

    createWebRequest: builder.mutation<ServiceRequest, FormData>({
      query: (data) => ({
        url: "web-digital",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["ServiceRequest"],
    }),

    /* UPDATE STATUS */
    updateWebRequest: builder.mutation<
      ServiceRequest,
      UpdateServiceRequestRequest
    >({
      query: ({ id, status }) => ({
        url: `web-digital/${id}/status`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: "ServiceRequest", id },
        "ServiceRequest",
      ],
    }),

    deleteWebRequest: builder.mutation<MessageResponse, number | string>({
      query: (id) => ({
        url: `web-digital/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["ServiceRequest"],
    }),
  }),
});

export const {
  useGetAllWebRequestsQuery,
  useGetWebRequestByIdQuery,
  useCreateWebRequestMutation,
  useUpdateWebRequestMutation,
  useDeleteWebRequestMutation,
} = webApi;
