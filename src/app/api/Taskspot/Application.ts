import { apiSlice } from "../../api/EntryApi";

/* ───────────────────────────────
   TYPES
────────────────────────────── */

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

/* ───────────────────────────────
   API SLICE
────────────────────────────── */

export const applicationApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    /* GET ALL */
    getAllApplicationRequests: builder.query<ServiceRequestsResponse, void>({
      query: () => "application-docs",
      providesTags: ["ServiceRequest"],
    }),

    /* GET BY ID */
    getApplicationRequestById: builder.query<ServiceRequest, number | string>({
      query: (id) => `application-docs/${id}`,
      providesTags: (_result, _error, id) => [{ type: "ServiceRequest", id }],
    }),

    /* CREATE */
    createApplicationRequest: builder.mutation<ServiceRequest, FormData>({
      query: (data) => ({
        url: "application-docs",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["ServiceRequest"],
    }),

    /* UPDATE STATUS */
    updateApplicationRequest: builder.mutation<
      ServiceRequest,
      UpdateServiceRequestRequest
    >({
      query: ({ id, status }) => ({
        url: `application-docs/${id}/status`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: "ServiceRequest", id },
        "ServiceRequest",
      ],
    }),

    /* DELETE */
    deleteApplicationRequest: builder.mutation<
      MessageResponse,
      number | string
    >({
      query: (id) => ({
        url: `application-docs/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["ServiceRequest"],
    }),
  }),
});

/* ───────────────────────────────
   EXPORT HOOKS
────────────────────────────── */

export const {
  useGetAllApplicationRequestsQuery,
  useGetApplicationRequestByIdQuery,
  useCreateApplicationRequestMutation,
  useUpdateApplicationRequestMutation,
  useDeleteApplicationRequestMutation,
} = applicationApi;
