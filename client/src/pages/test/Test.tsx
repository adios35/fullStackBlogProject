import React from "react";
import useAuth from "../../hooks/useAuth";
import axios from "axios";

const Test = () => {
  const { token, isAuthenticated } = useAuth();
  const [images, setImages] = React.useState(null);

  async function addPost() {
    const formData = new FormData();
    formData.append("images1", images!);
    formData.append("upload_preset", "");
    axios.post(
      "http://localhost:3000/post/addpost/:id/post",
      { images },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );
  }
  // React.useEffect(() => {
  //   const abortController = new AbortController();
  //   const signal = abortController.signal;
  //   axios.get("http://localhost:3000/post/posts", { signal }).then((data) => {
  //     console.log(data.data);
  //   });
  //   return () => abortController.abort();
  // }, []);
  console.log(images && images);

  return (
    <div>
      <input
        onChange={(e) => setImages(e.target.files[0])}
        type="file"
        name=""
        id=""
      />
    </div>
  );
};

export default Test;
