import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import prepareHeader from "./prepareHeaders";
import { BASEURL } from "../../../urls";

const URI = "/api/audio-transcript";

export const AudioTransactiptApi = createApi({
  reducerPath: "AudioTransactiptApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASEURL + URI,
    prepareHeaders: prepareHeader,
  }),
  endpoints: (builder) => ({
    uploadAudio: builder.mutation({
      query: (data) => ({
        url: "upload",
        method: "POST",
        body: data,
      }),
    }),
    getAllAudioData: builder.query({
      query: (data) => ({
        url: "all",
        method: "GET",
        params: data,
      }),
    }),
  }),
});

export const { useUploadAudioMutation, useGetAllAudioDataQuery } = AudioTransactiptApi;
