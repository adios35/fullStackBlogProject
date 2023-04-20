import axios from "axios";
import React, { ButtonHTMLAttributes } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FcAddImage } from "react-icons/fc";
import { useUser } from "../auth/user/currentUser";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-hot-toast";

interface postType {
  title: string;
  content: string;
  image?: string | null | undefined;
}

const Edit = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { token } = useAuth();
  const [postData, setPostData] = React.useState({} as postType);
  const [error, setError] = React.useState("");
  const { user } = useUser();

  const [imagePost, setImagePost] = React.useState<File | null>(null);
  function handelImage(e: React.ChangeEvent<HTMLInputElement>) {
    const img = [...e.target.files!];
    console.log(img);
    setImagePost(e.target.files![0]);
    // setImage()
  }

  React.useEffect(() => {
    axios.get(`http://localhost:3000/post/posts/${id}`).then((data) => {
      setPostData(data.data);
    });

    return () => {
      // cleanup code
    };
  }, []);

  function handleInput(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { value, name } = event.currentTarget;
    setPostData((pre) => {
      return {
        ...pre,
        [name]: value,
      };
    });
  }
  console.log(postData.image);

  async function handlePost(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();

    if (!postData.content || !postData.title)
      return setError("input shouldnt empty");
    try {
      const formdata = new FormData();
      formdata.append("title", postData?.title);
      formdata.append("content", postData?.content);
      if (imagePost) {
        formdata.append("image", imagePost);
      }
      const response = axios.post(
        `http://localhost:3000/post/edit/${id}`,
        formdata,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      await toast
        .promise(
          response,
          {
            loading: "working...",
            success: (data) => `Post Updated`,
            error: (err) => `${err.response.data.message}`,
          },
          {
            style: {
              minWidth: "250px",
              background: "#191D24",
              color: "white",
            },
            success: {
              duration: 1000,
              // icon: "👍",
            },
          }
        )
        .then(() => {
          navigate("/", { replace: true });
        });

      // const res;
    } catch (error) {
      alert("error");
      console.log(error);
    }
  }
  //   console.log(image);
  return (
    <div className="px-32 flex gap-8 w-full ">
      <form className="row space-y-10  transition-all duration-300 w-[70%]">
        <label
          htmlFor=""
          className="p-2 group transition-all duration-300 border-b-2 my-2 "
        >
          <span className=" text-gray-600 top-[31px] -left-[.3px] transition-all duration-300 group-focus-within:top-0 group">
            Title :
          </span>

          <input
            value={postData?.title}
            onChange={handleInput}
            name="title"
            type="text"
            placeholder="Title..."
            className="focus:outline-none w-full group px-2"
          />
        </label>
        <label htmlFor="content" className="mt-5 block w-full">
          <span className="px-2 text-gray-600">Content :</span>
          <textarea
            name="content"
            id=""
            value={postData?.content}
            cols={30}
            rows={10}
            onChange={handleInput}
            placeholder="content..."
            className="w-full outline-none focus:outline-none border-b-2 px-2"
          ></textarea>
        </label>
        <label htmlFor="image" className="cursor-pointer">
          <FcAddImage size={36} />
          <input
            type="file"
            name="image"
            onChange={handelImage}
            id="image"
            className="hidden"
          />
        </label>
        <button onClick={handlePost} className="btn btn-info text-white">
          submit
        </button>
      </form>
      <div className="row w-full">
        <div className="rigth">
          <span className="text-gray-700">Hero image :</span>
          <div className="w-full h-[70vh]">
            <img
              src={
                imagePost
                  ? URL.createObjectURL(imagePost!)
                  : postData.image
                  ? postData.image
                  : "http://via.placeholder.com/640x360"
              }
              className="w-full h-full object-cover"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Edit;
