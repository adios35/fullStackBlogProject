import axios from "axios";
import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useUser } from "../auth/user/currentUser";
import { toast } from "react-hot-toast";
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
  const navigate = useNavigate();
  const { user } = useUser();
  const [isloading, setIsloading] = React.useState(false);
  const [post, setPost] = React.useState<Post | null>(null);
  const { id } = useParams();
  React.useEffect(() => {
    setIsloading(true);
    axios.get(`http://localhost:3000/post/posts/${id}`).then((data) => {
      setPost(data.data);
      setIsloading(false);
      // console.log(data.data);
    });
    return () => {
      // cleanup code
    };
  }, [id]);

  async function deletePost() {
    const response = axios.delete(`http://localhost:3000/post/posts/${id}`);
    const res = await toast
      .promise(
        response,
        {
          loading: "processing...",
          success: (data) => `post deleted`,
          error: (err) => `${err.response.data.msg}`,
        },
        {
          style: {
            minWidth: "250px",
          },
          success: {
            duration: 1000,
            // icon: "👍",
          },
        }
      )
      .then(() => navigate("/"));
  }
  return (
    <div className="container max-w-5xl mx-auto  w-full">
      <div className=" mx-auto px-32">
        {isloading && <h1>Loading...</h1>}
        <Link className="active:scale-95 block duration-300" to={"/"}>
          &#8592; go back
        </Link>{" "}
        <br /> <br />
        {post && (
          <>
            <time className="text-gray-600">published at {post.createdAt}</time>
            {post.image && <img src={post?.image} alt="" />}
            <div className="row flex justify-between">
              <h1 className="text-3xl font-semibold text-gray-700 my-8">
                {post.title}
              </h1>
              {post.authorId == user?.id && (
                <div className="cta flex items-center">
                  <button
                    onClick={() => navigate(`/post/edit/${id}`)}
                    className="btn btn-link"
                  >
                    edit
                  </button>

                  <button
                    // onClick={() => navigate(`/post/edit/${id}`)}
                    onClick={deletePost}
                    className="text-red-500 btn-link"
                  >
                    DELETE
                  </button>
                </div>
              )}
            </div>
            <span>author: {post.author.email.split("@")[0]}</span>
            <p className="mt-3">{post.content}</p>
          </>
        )}
      </div>
    </div>
  );
};

export default Post;
