import React, { useState, useEffect } from "react";
import axios from "axios";
import CommentCreate from "./CommentCreate";
import CommentList from "./CommentList";

const PostList = () => {
    const [posts, setPosts] = useState({});

    const fetchPosts = async () => {
        // Retrieve the posts created
        const response = await axios.get('http://localhost:4000/posts');

        // Updating the post list state
        setPosts(response.data);
    };

    // To run code in a specific point in time in our Component Lifecycle
    // For example, when it's created. [] -> tells react to run it 1 time
    useEffect(() => {
        fetchPosts();
    }, []);

    // {} <- Default value of setPosts
    // {"kefjds": {...}} <- After retrieving the posts
    // console.log(posts);

    /**
     * Returns a JSX for each post contained in the posts list.
     */
    const renderedPosts = Object.values(posts).map(post => {
        return (
            <div 
            className="card" 
            style={{width: '30%', marginBottom: '20px'}}
            key={post.id}
            >
                <div className="card-body">
                    <h3>{post.title}</h3>
                    <CommentList postId={post.id} />
                    <hr />
                    <CommentCreate postId={post.id}/>
                </div>
            </div>
        );
    });

    return <div className="d-flex flex-row flex-wrap justify-content-between">
        {renderedPosts}
    </div>;
};

export default PostList;