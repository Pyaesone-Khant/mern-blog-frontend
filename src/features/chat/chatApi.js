import { baseApi } from "@/core/baseApi";

export const chatApi = baseApi.injectEndpoints({
    endpoints: builder => ({
        getMessages: builder.query({
            query: (conversationId) => ({
                url: `/messages/${conversationId}`,
                method: "GET",
            }),
            providesTags: ["messages"],
        }),

        createMessage: builder.mutation({
            query: (payload) => ({
                url: `/messages`,
                method: "POST",
                body: payload,
            }),
            invalidatesTags: ["messages"],
        }),

        getConversations: builder.query({
            query: () => ({
                url: `/conversations`,
                method: "GET",
            }),
            providesTags: ["conversations"],
        }),

        createNewConversation: builder.mutation({
            query: (conversation) => ({
                url: `/conversations`,
                method: "POST",
                body: conversation,
            }),
            invalidatesTags: ["conversations"],
        })
    })
})

export const {
    useGetMessagesQuery,
    useCreateMessageMutation,
    useGetConversationsQuery,
    useCreateNewConversationMutation
} = chatApi;