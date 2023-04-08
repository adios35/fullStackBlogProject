import axios from "axios";
import React from "react";
import { useParams } from "react-router-dom";
interface author {
  id: string;
  email: string;
}

interface Post {
  authorId: string;
  content: string;
  createdAt: string;
  id: string;
  title: string;
  updatedAt: string;
  author: author;
  image?: string;
}

const Post = () => {
  const [isloading, setIsloading] = React.useState(false);

  const [post, setPost] = React.useState<Post | null>(null);

  const { id } = useParams();
  React.useEffect(() => {
    setIsloading(true);
    axios.get(`http://localhost:3000/post/posts/${id}`).then((data) => {
      setPost(data.data);
      setIsloading(false);
      console.log(data.data);
    });
    return () => {
      // cleanup code
    };
  }, [id]);
  return (
    <div className="pt-20">
      {isloading && <h1>Loading...</h1>}
      {post && (
        <>
          {post.image && <img src={post?.image} alt="" />}
          <h1 className="text-xl">{post.title}</h1>
          <span>author: {post.author.email.split("@")[0]}</span>
          <p>{post.content}</p>
        </>
      )}
    </div>
  );
};

export default Post;
