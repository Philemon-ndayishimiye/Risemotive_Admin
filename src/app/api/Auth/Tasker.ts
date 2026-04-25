import { apiSlice } from "../../api/EntryApi";

export interface Tasker {
  id: number;
  name: string;
  phone: string;
  email: string;
  specialties: string;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}
//type ApiResponse<T> = T | { data: T };

export interface CreateTaskerRequest {
  name: string;
  phone: string;
  email: string;
  specialties: string;
  isActive: boolean;
}

export interface UpdateTaskerRequest extends Partial<CreateTaskerRequest> {
  id: number;
}

export interface MessageResponse {
  message: string;
}

export const taskerApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllTaskers: builder.query<Tasker[], void>({
      query: () => "taskers",
      transformResponse: (response: { total: number; items: Tasker[] }) => {
        console.log("Raw taskers response:", response);
        return response.items ?? [];
      },
      providesTags: ["Tasker"],
    }),

    getTaskerById: builder.query<Tasker, number>({
      query: (id) => `taskers/${id}`,
      providesTags: (_result, _error, id) => [{ type: "Tasker", id }],
    }),

    createTasker: builder.mutation<Tasker, CreateTaskerRequest>({
      query: (data) => ({
        url: "taskers",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Tasker"],
    }),

    updateTasker: builder.mutation<Tasker, UpdateTaskerRequest>({
      query: ({ id, ...data }) => ({
        url: `taskers/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: "Tasker", id },
        "Tasker",
      ],
    }),

    deleteTasker: builder.mutation<MessageResponse, number>({
      query: (id) => ({
        url: `taskers/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Tasker"],
    }),

    toggleActivateTasker: builder.mutation<MessageResponse, number>({
      query: (id) => ({
        url: `taskers/${id}/toggle-active`,
        method: "PATCH",
      }),
      invalidatesTags: ["Tasker"],
    }),
  }),
});

export const {
  useGetAllTaskersQuery,
  useGetTaskerByIdQuery,
  useCreateTaskerMutation,
  useUpdateTaskerMutation,
  useDeleteTaskerMutation,
  useToggleActivateTaskerMutation,
} = taskerApi;
