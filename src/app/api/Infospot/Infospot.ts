import { apiSlice } from "../../api/EntryApi";

export interface InfoPost {
  id: number;
  title: string;
  description: string;
  category: string;
  deadline: string;
  location: string;
  applyLink: string;
  contactInfo: string;
  isActive: boolean;
  createdAt?: string;
}

export interface InfoPostsResponse {
  items: InfoPost[];
  total: number;
}

export interface CreateInfoPostRequest {
  title: string;
  description: string;
  category: "JOB" | "SCHOLARSHIP" | "OPPORTUNITY" | string;
  deadline: string;
  location: string;
  applyLink: string;
  contactInfo: string;
  isActive: boolean;
}

export interface UpdateInfoPostRequest extends Partial<CreateInfoPostRequest> {
  id: number;
}

export interface MessageResponse {
  message: string;
}

export const infospotApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

    getAllInfoPosts: builder.query<InfoPostsResponse, void>({
      query: () => "info-posts",
      providesTags: ["InfoPost"],
    }),

    getInfoPostById: builder.query<InfoPost, number>({
      query: (id) => `info-posts/${id}`,
      providesTags: (_result, _error, id) => [{ type: "InfoPost", id }],
    }),

    createInfoPost: builder.mutation<InfoPost, CreateInfoPostRequest>({
      query: (data) => ({
        url: "info-posts",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["InfoPost"],
    }),

    updateInfoPost: builder.mutation<InfoPost, UpdateInfoPostRequest>({
      query: ({ id, ...data }) => ({
        url: `info-posts/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: "InfoPost", id },
        "InfoPost",
      ],
    }),

    deleteInfoPost: builder.mutation<MessageResponse, number>({
      query: (id) => ({
        url: `info-posts/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["InfoPost"],
    }),

    toggleActivateInfoPost: builder.mutation<MessageResponse, number>({
      query: (id) => ({
        url: `info-posts/${id}/toggle-activate`,
        method: "PATCH",
      }),
      invalidatesTags: ["InfoPost"],
    }),

  }),
});

export const {
  useGetAllInfoPostsQuery,
  useGetInfoPostByIdQuery,
  useCreateInfoPostMutation,
  useUpdateInfoPostMutation,
  useDeleteInfoPostMutation,
  useToggleActivateInfoPostMutation,
} = infospotApi;