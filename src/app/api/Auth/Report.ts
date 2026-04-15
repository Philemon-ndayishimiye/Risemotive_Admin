import { apiSlice } from "../../api/EntryApi";

export interface Report {
  id: number;
  title: string;
  summary: string;
  totalServices: number;
  totalTasks: number;
  totalOrders: number;
  totalUsers: number;
  createdAt: string;
}

export interface ReportsResponse {
  items: Report[];
  total: number;
}

export interface MessageResponse {
  message: string;
}

export const reportApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

    generateReport: builder.mutation<Report, void>({
      query: () => ({
        url: "reports/generate",
        method: "POST",
      }),
      invalidatesTags: ["Report"],
    }),

    getAllReports: builder.query<ReportsResponse, void>({
      query: () => "reports",
      providesTags: ["Report"],
    }),

    getReportById: builder.query<Report, number>({
      query: (id) => `reports/${id}`,
      providesTags: (_result, _error, id) => [{ type: "Report", id }],
    }),

    updateReport: builder.mutation<Report, { id: number; data: Partial<Report> }>({
      query: ({ id, data }) => ({
        url: `reports/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: "Report", id },
        "Report",
      ],
    }),

    deleteReport: builder.mutation<MessageResponse, number>({
      query: (id) => ({
        url: `reports/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Report"],
    }),

  }),
});

export const {
  useGenerateReportMutation,
  useGetAllReportsQuery,
  useGetReportByIdQuery,
  useUpdateReportMutation,
  useDeleteReportMutation,
} = reportApi;