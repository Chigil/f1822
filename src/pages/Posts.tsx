import React, {useEffect, useState} from 'react';
import http from "../http";

const Posts = ({ userId = 0 }: { userId?: number }) => {
    const [posts, setPosts] = useState<any[]>([]);
    useEffect(() => {
        getAllPosts();
    },[]);

    const getAllPosts = async () => {
        try {
            const responseData = await http.get(userId === 0 ? '/posts' : `/posts?userId=${userId}`);
            const posts = responseData.data;
            setPosts(posts);
        } catch (err) {
            alert(err);
        }
    };
    return (
        <div>
            {userId === 0 ? <h1>THIS is Posts page!!!</h1> : <h3>User posts:</h3>}
            {posts.map(post =>
                <div key={post.id}>
                    {post.body}
                </div>
            )}
        </div>
    );
};

export default Posts;