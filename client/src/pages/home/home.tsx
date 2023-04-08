import React from "react";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

interface Post {
  posts: {
    id: string;
    title: string;
    content: string;
    createdAt: string;
    updatedAt: string;
    authorId: string;
  }[];
}

interface FetchDataProps {
  loading: boolean;
  data: Post | null;
  error: Error | null;
}

const Home = () => {
  // const { token, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [fetchData, setFetchData] = React.useState<FetchDataProps>({
    loading: true,
    data: null,
    error: null,
  });
  // console.log(token);

  React.useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    axios
      .get("http://localhost:3000/post/posts", { signal })
      .then((res) => {
        console.log(res.data);
        setFetchData({ loading: false, data: res.data, error: null });
      })
      .catch((err) => {
        if (err.name === "AbortError") {
          console.log("Fetch aborted");
        } else {
          console.log(err);
          setFetchData({ loading: false, data: null, error: err });
        }
      });

    return () => {
      abortController.abort();
    };
  }, []);

  if (fetchData.loading) return <h1>loading...</h1>;
  return (
    <div className="min-h-screen flex">
      <div className="post-container w-3/5 mx-auto flex gap-5 flex-wrap p-3">
        {fetchData.data?.posts.map((post) => (
          <div
            key={post.id}
            className="post cursor-pointer  gap-10 shadow-md w-[300px] rounded-md min-h-52 max-h-56 flex flex-col justify-between p-3"
          >
            <h3 className="text-lg">{post.title}</h3>
            <button
              onClick={() => navigate(`/post/${post.id}`)}
              className="btn btn-outline btn-sm mt-4 border-[2px]"
            >
              baca artikel
            </button>
          </div>
        ))}
      </div>
      <div className="right w-2/5">right</div>
    </div>
  );
};

export default Home;
