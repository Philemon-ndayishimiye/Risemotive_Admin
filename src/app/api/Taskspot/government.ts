import { apiSlice } from "../../api/EntryApi";

export interface ServiceRequest {
  id: number | string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  service: string;
  description: string;
  documentUrl: string;
  preferredDate: string;
  tasker: string;
  status?: string;
  trackingCode?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ServiceRequestsResponse {
  items: ServiceRequest[];
  total: number;
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

export interface MessageResponse {
  message: string;
}

export const serviceRequestApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // GET ALL
    getAllServiceRequests: builder.query<ServiceRequestsResponse, void>({
      query: () => "egov",
      providesTags: ["ServiceRequest"],
    }),

    // GET BY ID
    getServiceRequestById: builder.query<ServiceRequest, number | string>({
      query: (id) => `egov/${id}`,
      providesTags: (_result, _error, id) => [{ type: "ServiceRequest", id }],
    }),

    // CREATE
    createServiceRequest: builder.mutation<ServiceRequest, FormData>({
      query: (data) => ({
        url: "egov",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["ServiceRequest"],
    }),

    // ✅ UPDATE STATUS ONLY (FIXED)
    updateServiceRequest: builder.mutation<
      ServiceRequest,
      UpdateServiceRequestRequest
    >({
      query: ({ id, status }) => ({
        url: `egov/${id}/status`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: "ServiceRequest", id },
        "ServiceRequest",
      ],
    }),

    // DELETE
    deleteServiceRequest: builder.mutation<MessageResponse, number | string>({
      query: (id) => ({
        url: `egov/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["ServiceRequest"],
    }),
  }),
});

export const {
  useGetAllServiceRequestsQuery,
  useGetServiceRequestByIdQuery,
  useCreateServiceRequestMutation,
  useUpdateServiceRequestMutation,
  useDeleteServiceRequestMutation,
} = serviceRequestApi;
