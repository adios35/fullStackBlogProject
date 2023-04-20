import axios from "axios";
import React, { TextareaHTMLAttributes } from "react";
import { FcGallery, FcAddImage } from "react-icons/fc";
import { useUser } from "../auth/user/currentUser";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

interface postType {
  title: string;
  content: string;
}

const NewArticle = () => {
  const navigate = useNavigate();
  const { token } = useAuth();
  const [postData, setPostData] = React.useState({} as postType);
  const [error, setError] = React.useState("");
  const { user } = useUser();

  const [image, setImage] = React.useState<File | null>(null);
  function handelImage(e: React.ChangeEvent<HTMLInputElement>) {
    const img = [...e.target.files!];
    console.log(img);
    setImage(e.target.files![0]);
    // setImage()
  }

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

  async function handlePost(event: React.FormEvent<HTMLButtonElement>) {
    event.preventDefault();
    if (!postData.content || !postData.title)
      return setError("input shouldnt empty");
    try {
      const formdata = new FormData();
      formdata.append("title", postData?.title);
      formdata.append("content", postData?.content);
      if (image) {
        formdata.append("image", image);
      }
      const response = axios.post(
        `http://localhost:3000/post/addpost/${user?.id}/post`,
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
            loading: "publising...",
            success: (data) => `article published`,
            error: (err) => `${err.response.data.message}`,
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
        .then(() => {
          navigate("/");
        });

      // const res;
    } catch (error) {
      alert("error");
      console.log(error);
    }
  }
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
            value={postData.title}
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
            value={postData.content}
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
                image
                  ? URL.createObjectURL(image)
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

export default NewArticle;
