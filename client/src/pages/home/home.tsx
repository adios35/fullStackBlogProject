import React from "react";
import axios from "axios";
import useAuth from "../../hooks/useAuth";

interface Post {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  authorId: string;
}

interface FetchDataProps<T> {
  loading: boolean;
  data: T | null;
  error: Error | null;
}

const Home = () => {
  // const { token, isAuthenticated } = useAuth();
  const [fetchData, setFetchData] = React.useState<FetchDataProps<Post>>({
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
    <div>
      <button className="btn">gettoken</button>
      <div className="container w-full mx-8 bg-gray-200 h-full w-full mx-auto">
        lol
      </div>
    </div>
  );
};

export default Home;
