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
                <div className="card my-4" key={post.id}>
                    <div className="card-body">
                        <h4>{post.body}</h4>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Posts;