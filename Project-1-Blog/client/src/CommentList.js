import React from 'react';

const CommentList = ({ postComments }) => {
    const renderedComments = postComments.map(comment => {
        return (
            <li key={comment.id}>{comment.content}</li>
        );
    });

    return (
        <ul>
            {renderedComments}
        </ul>
    );
};

export default CommentList;