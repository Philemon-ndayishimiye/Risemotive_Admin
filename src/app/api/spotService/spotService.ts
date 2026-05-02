import { apiSlice } from "../../api/EntryApi";

// ── Types ──────────────────────────────────────────────────────────────────

export interface ServiceItem {
  id: number;
  name: string;
  price: string;
}

export interface ServicesResponse {
  items: ServiceItem[];
  total: number;
}

export interface CreateServiceRequest {
  name: string;
  price: string;
}

export interface UpdateServiceRequest {
  id: number;
  name: string;
  price?: string;
}

export interface MessageResponse {
  message: string;
}

// ── Helper: build endpoints for a given base route ────────────────────────

// type ServiceTagType =
//   | "EGovernmentService"
//   | "WebService"
//   | "AppDocService"
//   | "LegalService"
//   | "CreativeMediaService";

// ── API Slice ──────────────────────────────────────────────────────────────

export const serviceSpotApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // ── E-Government ──────────────────────────────────────────────────────

    getAllEGovernmentServices: builder.query<ServicesResponse, void>({
      query: () => "services/e-government",
      providesTags: ["EGovernmentService"],
    }),

    getEGovernmentServiceById: builder.query<ServiceItem, number>({
      query: (id) => `services/e-government/${id}`,
      providesTags: (_result, _error, id) => [
        { type: "EGovernmentService", id },
      ],
    }),

    createEGovernmentService: builder.mutation<
      ServiceItem,
      CreateServiceRequest
    >({
      query: (body) => ({
        url: "services/e-government",
        method: "POST",
        body,
      }),
      invalidatesTags: ["EGovernmentService"],
    }),

    updateEGovernmentService: builder.mutation<
      ServiceItem,
      UpdateServiceRequest
    >({
      query: ({ id, ...body }) => ({
        url: `services/e-government/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: "EGovernmentService", id },
        "EGovernmentService",
      ],
    }),

    deleteEGovernmentService: builder.mutation<MessageResponse, number>({
      query: (id) => ({
        url: `services/e-government/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["EGovernmentService"],
    }),

    // ── Web Services ──────────────────────────────────────────────────────

    getAllWebServices: builder.query<ServicesResponse, void>({
      query: () => "services/web",
      providesTags: ["WebService"],
    }),

    getWebServiceById: builder.query<ServiceItem, number>({
      query: (id) => `services/web/${id}`,
      providesTags: (_result, _error, id) => [{ type: "WebService", id }],
    }),

    createWebService: builder.mutation<ServiceItem, CreateServiceRequest>({
      query: (body) => ({
        url: "services/web",
        method: "POST",
        body,
      }),
      invalidatesTags: ["WebService"],
    }),

    updateWebService: builder.mutation<ServiceItem, UpdateServiceRequest>({
      query: ({ id, ...body }) => ({
        url: `services/web/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: "WebService", id },
        "WebService",
      ],
    }),

    deleteWebService: builder.mutation<MessageResponse, number>({
      query: (id) => ({
        url: `services/web/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["WebService"],
    }),

    // ── Application & Documentation Services ──────────────────────────────

    getAllAppDocServices: builder.query<ServicesResponse, void>({
      query: () => "services/app-doc",
      providesTags: ["AppDocService"],
    }),

    getAppDocServiceById: builder.query<ServiceItem, number>({
      query: (id) => `services/app-doc/${id}`,
      providesTags: (_result, _error, id) => [{ type: "AppDocService", id }],
    }),

    createAppDocService: builder.mutation<ServiceItem, CreateServiceRequest>({
      query: (body) => ({
        url: "services/app-doc",
        method: "POST",
        body,
      }),
      invalidatesTags: ["AppDocService"],
    }),

    updateAppDocService: builder.mutation<ServiceItem, UpdateServiceRequest>({
      query: ({ id, ...body }) => ({
        url: `services/app-doc/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: "AppDocService", id },
        "AppDocService",
      ],
    }),

    deleteAppDocService: builder.mutation<MessageResponse, number>({
      query: (id) => ({
        url: `services/app-doc/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["AppDocService"],
    }),

    // ── Legal Services ────────────────────────────────────────────────────

    getAllLegalServices: builder.query<ServicesResponse, void>({
      query: () => "services/legal",
      providesTags: ["LegalService"],
    }),

    getLegalServiceById: builder.query<ServiceItem, number>({
      query: (id) => `services/legal/${id}`,
      providesTags: (_result, _error, id) => [{ type: "LegalService", id }],
    }),

    createLegalService: builder.mutation<ServiceItem, CreateServiceRequest>({
      query: (body) => ({
        url: "services/legal",
        method: "POST",
        body,
      }),
      invalidatesTags: ["LegalService"],
    }),

    updateLegalService: builder.mutation<ServiceItem, UpdateServiceRequest>({
      query: ({ id, ...body }) => ({
        url: `services/legal/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: "LegalService", id },
        "LegalService",
      ],
    }),

    deleteLegalService: builder.mutation<MessageResponse, number>({
      query: (id) => ({
        url: `services/legal/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["LegalService"],
    }),

    // ── Creative & Media Services ─────────────────────────────────────────

    getAllCreativeMediaServices: builder.query<ServicesResponse, void>({
      query: () => "services/creative-media",
      providesTags: ["CreativeMediaService"],
    }),

    getCreativeMediaServiceById: builder.query<ServiceItem, number>({
      query: (id) => `services/creative-media/${id}`,
      providesTags: (_result, _error, id) => [
        { type: "CreativeMediaService", id },
      ],
    }),

    createCreativeMediaService: builder.mutation<
      ServiceItem,
      CreateServiceRequest
    >({
      query: (body) => ({
        url: "services/creative-media",
        method: "POST",
        body,
      }),
      invalidatesTags: ["CreativeMediaService"],
    }),

    updateCreativeMediaService: builder.mutation<
      ServiceItem,
      UpdateServiceRequest
    >({
      query: ({ id, ...body }) => ({
        url: `services/creative-media/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: "CreativeMediaService", id },
        "CreativeMediaService",
      ],
    }),

    deleteCreativeMediaService: builder.mutation<MessageResponse, number>({
      query: (id) => ({
        url: `services/creative-media/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["CreativeMediaService"],
    }),
  }),
});

export const {
  // E-Government
  useGetAllEGovernmentServicesQuery,
  useGetEGovernmentServiceByIdQuery,
  useCreateEGovernmentServiceMutation,
  useUpdateEGovernmentServiceMutation,
  useDeleteEGovernmentServiceMutation,

  // Web
  useGetAllWebServicesQuery,
  useGetWebServiceByIdQuery,
  useCreateWebServiceMutation,
  useUpdateWebServiceMutation,
  useDeleteWebServiceMutation,

  // App & Doc
  useGetAllAppDocServicesQuery,
  useGetAppDocServiceByIdQuery,
  useCreateAppDocServiceMutation,
  useUpdateAppDocServiceMutation,
  useDeleteAppDocServiceMutation,

  // Legal
  useGetAllLegalServicesQuery,
  useGetLegalServiceByIdQuery,
  useCreateLegalServiceMutation,
  useUpdateLegalServiceMutation,
  useDeleteLegalServiceMutation,

  // Creative & Media
  useGetAllCreativeMediaServicesQuery,
  useGetCreativeMediaServiceByIdQuery,
  useCreateCreativeMediaServiceMutation,
  useUpdateCreativeMediaServiceMutation,
  useDeleteCreativeMediaServiceMutation,
} = serviceSpotApi;
