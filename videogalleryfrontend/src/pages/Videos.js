import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import VideoGallery from "../components/VideoGallery";
import { UserContext } from "../context/UserContext";

const Videos = () => {
  const { user } = useContext(UserContext);
  const [idError, setIdError] = useState("");
  const [videosData, setVideos] = useState([]);
  const [page, setPage] = useState(0);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`http://localhost:8080/video/showVideos/${user.userId}/${page}`)
      const data = response.json();
      setVideos(data);
    }
    fetchData();
  }, [page])
  

  async function searchYt(dataForm) {
    const regExp =
      /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\\&\\?]*).*/;
    const match = dataForm.link.match(regExp);
    if (match && match[7].length === 11) {
      const apiResponse = await fetch(
        `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2Cplayer&id=${match[7]}&key=AIzaSyDbrFdUjOD3mTqAwwxufNC771nGy4iuCKg`
      );
      const apiData = await apiResponse.json();
      const video = {
        ytId: apiData.items[0].id,
        videoTittle: apiData.items[0].snippet.title,
        videoSource: dataForm.link,
        videoMin: apiData.items[0].snippet.thumbnails.standard.url,
        videoDescription: apiData.items[0].snippet.description,
      };
      const response = await fetch(
        `http://localhost:8080/video/addVideo/${user.userId}`,
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(video),
        }
      );
      const data = await response.text();
      if (data !== "Video already upload") {
      }
      setIdError("");
    } else {
      setIdError("Video not found");
    }
  }

  return (
    <div className="container-xl p-4 align-items-center justify-content-center">
      <form
        className="row m-4 p-4 text-white"
        onSubmit={handleSubmit(searchYt)}
      >
        <div className="col-8">
          <input
            type="text"
            className="form-control border-dark border-4 bg-transparent text-white text-center "
            placeholder="Copy the link here"
            name="link"
            id="link"
            style={{ borderWidth: "2px" }}
            autoComplete="nope"
            {...register("link", {
              required: true,
              pattern:
                /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\\&\\?]*).*/,
            })}
          />
          {errors.link?.type === "required" && (
            <div className="text-danger text-center">
              <small>This link is required.</small>
            </div>
          )}
          {errors.link?.type === "pattern" && (
            <div className="text-danger text-center">
              <small>Link invalid.</small>
            </div>
          )}
          {idError && (
            <div className="text-danger text-center">
              <small>{idError}</small>
            </div>
          )}
        </div>
        <div className="d-grid col-4 mx-auto">
          <button className="btn btn-dark" type="submit">
            Post
          </button>
        </div>
      </form>
      {videosData.length !== "0" ? (
        <div>{videosData.lastIndexOf}</div>
      ) : (
        <div
          className="container-xl d-flex align-items-center justify-content-center"
          style={{ height: "310px" }}
        >
          <h1 className="text-center text-white">Not videos found</h1>
        </div>
      )}
    </div>
  );
};

export default Videos;
