import CommentCard from "./CommentCard";
const CommentsList = ({ blogComments }) => {
    return (
        <section className="mt-3 max-w-2xl mx-auto">
            {!blogComments?.length ? (
                <div>
                    {" "}
                    <h3 className="text-center font-semibold text-xl p-5 rounded-md shadow border bg-white">
                        There is no comments for this blog!
                    </h3>{" "}
                </div>
            ) : (
                <div className="flex flex-col gap-1">
                    {blogComments?.map((item) => {
                        return (
                            <CommentCard key={item?._id} commentItem={item} />
                        );
                    })}
                </div>
            )}
        </section>
    );
};

export default CommentsList;
