import { getVideoMovies } from "../../shared/API";
import { useEffect, useState } from "react";
import classes from "./MovieList.module.css";
import { useParams } from "react-router-dom";
import YouTube from "react-youtube";
import axios from "axios";

const VideoItem = () => {
  const [video, setVideo] = useState(null);

  const params = useParams();
  const { movieId } = params;

  useEffect(() => {
    const cancelToken = axios.CancelToken.source();
    getVideoMovies(movieId, { cancelToken: cancelToken.token })
      .then((res) => {
        if (res.data) {
          setVideo(res.data);
        }
      })
      .catch((error) => {
        if (axios.isCancel(error)) {
          console.log("canceled!");
        } else {
          console.log("Error", error.message);
        }
        console.log(error.config);
      });
  }, [movieId]);

  const renderTrailer = () => {
    const trailer =
      video.results.length !== 0
        ? video.results.find((vid) => vid.name === "Official Trailer")
          ? video.results.find((vid) => vid.name === "Official Trailer")
          : video.results[0]
        : null;

    return video.results.length !== 0 ? (
      <YouTube
        videoId={trailer.key}
        className={"iframeContainer"}
        opts={{
          playerVars: {
            autoplay: 1,
          },
        }}
      />
    ) : (
      <span>No video awailable</span>
    );
  };

  return (
    <div className={classes.iframeContainer}>
      {video ? renderTrailer() : <span>No video awailable</span>}
    </div>
  );
};

export default VideoItem;
