// components
import CommentCard from "./CommentCard";

const CommentsList = ({blogComments}) => {
    return (!blogComments?.length ? (
            <h3 className="text-center p-5 my-auto">
                There are no comments for this blog!
            </h3>
        ) : (
            <div className="flex flex-col gap-2 mt-7 pt-3 border-t border-darkBgSec/10">
                {blogComments?.map((item) => {
                    return (
                        <CommentCard key={item?._id} commentItem={item}/>
                    );
                })}
            </div>
        )
    );
};

export default CommentsList;
