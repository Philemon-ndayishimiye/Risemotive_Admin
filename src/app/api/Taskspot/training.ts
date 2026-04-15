import { apiSlice } from "../../api/EntryApi";

export interface TrainingRequest {
  id: number | string;
  fullName: string;
  phone: string;
  email: string;
  selectedCourse: string;
  preferredSchedule: string;
  experienceLevel: string;
  status?: string;
  trackingCode?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface TrainingRequestsResponse {
  items: TrainingRequest[];
  total: number;
}

export interface CreateTrainingRequest {
  fullName: string;
  phone: string;
  email: string;
  selectedCourse: string;
  preferredSchedule: string;
  experienceLevel: string;
}

export interface UpdateTrainingRequest extends Partial<CreateTrainingRequest> {
  id: number | string;
}

export interface MessageResponse {
  message: string;
}

export const trainingApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllTrainingRequests: builder.query<TrainingRequestsResponse, void>({
      query: () => "training",
      providesTags: ["ServiceRequest"],
    }),

    getTrainingRequestById: builder.query<TrainingRequest, number | string>({
      query: (id) => `training/${id}`,
      providesTags: (_result, _error, id) => [{ type: "ServiceRequest", id }],
    }),

    createTrainingRequest: builder.mutation<
      TrainingRequest,
      CreateTrainingRequest
    >({
      query: (data) => ({
        url: "training",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["ServiceRequest"],
    }),

    updateTrainingRequest: builder.mutation<
      TrainingRequest,
      UpdateTrainingRequest
    >({
      query: ({ id, ...data }) => ({
        url: `training/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: "ServiceRequest", id },
        "ServiceRequest",
      ],
    }),

    deleteTrainingRequest: builder.mutation<MessageResponse, number | string>({
      query: (id) => ({
        url: `training/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["ServiceRequest"],
    }),
  }),
});

export const {
  useGetAllTrainingRequestsQuery,
  useGetTrainingRequestByIdQuery,
  useCreateTrainingRequestMutation,
  useUpdateTrainingRequestMutation,
  useDeleteTrainingRequestMutation,
} = trainingApi;
