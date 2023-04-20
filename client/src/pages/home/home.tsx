import React from "react";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useUser } from "../auth/user/currentUser";
interface Post {
  posts: {
    id: string;
    title: string;
    content: string;
    createdAt: string;
    updatedAt: string;
    authorId: string;
    image: string;
  }[];
}
interface FetchDataProps {
  loading: boolean;
  data: Post | null;
  error: Error | null;
}
const Home = () => {
  // const { token, isAuthenticated } = useAuth();
  const { user } = useUser();
  console.log(user);
  const navigate = useNavigate();
  const [fetchData, setFetchData] = React.useState<FetchDataProps>({
    loading: true,
    data: null,
    error: null,
  });

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
    <div className="p-3 px-20">
      <header>
        <h1 className="text-5xl my-5">simple blog website</h1>
      </header>
      <div className="h-full justify-between  gap-5 flex">
        <div className="post-container w-full mx-auto flex  gap-5  justify-around  flex-wrap p-3">
          {fetchData.data?.posts.map((post) => (
            <div
              key={post.id}
              className="post border-2 cursor-pointer w-[300px] rounded-md min-h-52  flex flex-col gap-2 justify-between p-3"
            >
              {post.image && (
                <img
                  src={post.image}
                  className="max-h-[200px] object-cover rounded-md"
                  alt=""
                />
              )}
              <h3 className="text-lg ">{post.title}</h3>
              <button
                onClick={() => navigate(`/post/${post.id}`)}
                className="btn hover:text-white btn-outline btn-info btn-sm  border-[2px]"
              >
                baca artikel
              </button>
            </div>
          ))}
        </div>
        <div className="right w-2/5">
          <div className="max-w-xs flex flex-col items-center justify-center rounded-md space-x-3">
            <div className="cta flex justify-between w-full px-2 my-2">
              <button onClick={() => navigate("/post/create")} className="btn">
                new article
              </button>
              <button className="btn-outline btn">join forums</button>
            </div>
            <div className="subscribe p-3 w-full border-2  rounded-xl">
              <h2 className="text-2xl ">get wisdom in your inbox</h2>
              <p className="text-gray-500">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime
                mollitia voluptatibus atque itaque ut, earum officiis
                reiciendis! At hic, sed, illo qui eos necessitatibus obcaecati,
                modi aspernatur ab laborum earum.
              </p>

              <button className="p-3 w-full btn-outline btn-info hover:text-white">
                SUBSCRIBE
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
