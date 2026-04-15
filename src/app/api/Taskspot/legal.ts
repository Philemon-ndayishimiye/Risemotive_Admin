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

export const legalApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllLegalRequests: builder.query<ServiceRequestsResponse, void>({
      query: () => "legal",
      providesTags: ["ServiceRequest"],
    }),

    getLegalRequestById: builder.query<ServiceRequest, number | string>({
      query: (id) => `legal/${id}`,
      providesTags: (_result, _error, id) => [{ type: "ServiceRequest", id }],
    }),

    createLegalRequest: builder.mutation<ServiceRequest, FormData>({
      query: (data) => ({
        url: "legal",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["ServiceRequest"],
    }),

    /* UPDATE STATUS */
    updateLegalRequest: builder.mutation<
      ServiceRequest,
      UpdateServiceRequestRequest
    >({
      query: ({ id, status }) => ({
        url: `legal/${id}/status`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: "ServiceRequest", id },
        "ServiceRequest",
      ],
    }),

    deleteLegalRequest: builder.mutation<MessageResponse, number | string>({
      query: (id) => ({
        url: `legal/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["ServiceRequest"],
    }),
  }),
});

export const {
  useGetAllLegalRequestsQuery,
  useGetLegalRequestByIdQuery,
  useCreateLegalRequestMutation,
  useUpdateLegalRequestMutation,
  useDeleteLegalRequestMutation,
} = legalApi;
