import React, { useState, useEffect } from "react";
import "../styles/VideosList.css";
import SingleVideo from "./SingleVideo";
import AddVideo from "./AddVideo";

function VideosList() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    fetch("https://full-stack-project-assessment-gb1q.onrender.com/")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setVideos(data.videos);
      })
      .catch((error) => console.log(error));
  }, [videos]);

  //delete video
  const handleDeleteVideo = async (id) => {
    fetch(`https://full-stack-project-assessment-gb1q.onrender.com/${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (res.ok) {
          const updatedVideos = videos.filter((video) => video.id !== id);
          setVideos(updatedVideos);
        } else {
          throw new Error("Failed to delete video");
        }
      })
      .catch((error) => console.log(error));
  };

  //Add new video
  const handleAddVideo = async (video) => {
    fetch("https://full-stack-project-assessment-gb1q.onrender.com/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(video),
    })
      .then((res) => {
        if (res.ok) {
          setVideos((prevVideos) => [...prevVideos, video]);
        } else {
          throw new Error("Failed to add new video");
        }
      })
      .catch((error) => console.log(error));
  };

  //get video by ID
  //add search function here

  return (
    <div className="videos-list-container">
      <AddVideo onVideoAdd={handleAddVideo} />

      <div className="your-videos-container">
        {/* <h3>Your Videos:</h3> */}
        {videos
          .sort((a, b) => b.rating - a.rating)
          .map((vid) => (
            <div className="single-video-container" key={vid.id}>
              <SingleVideo
                id={vid.id}
                title={vid.title}
                url={`https://www.youtube.com/embed/${vid.url.slice(32)}`}
                rating={vid.rating}
                onDeleteVideo={() => handleDeleteVideo(vid.id)}
              />
            </div>
          ))}
      </div>
    </div>
  );
}

export default VideosList;
