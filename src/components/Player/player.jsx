import './player.css'

const Player = ({ video, onEnded, onTimeUpdate, vidEl, isLoading, errors }) => {
  const hasVideo = video && Object.keys(video).length !== 0

  return (
    <div className="player">
      {hasVideo && (
        <>
          <video
            ref={vidEl}
            onEnded={onEnded}
            onTimeUpdate={onTimeUpdate}
            controls
            muted
            autoPlay
            poster={video.video_pictures[0].picture}
            height="500px"
          >
            {video.video_files.map(videoFile => (
              <source key={videoFile.id} src={videoFile.link} type={videoFile.file_type} />
            ))}
            <p>
              Your browser doesn't support HTML5 video. Here is a <a href={video.url}>link to the video</a> instead.
            </p>
          </video>
          <div className="caption">
            <a href={video.user?.url} target="_blank" rel="noreferrer">
              {video.user?.name}
            </a>
          </div>
        </>
      )}
      {isLoading && (
        <div className="overlay">
          <div className="loader_text">loading ....</div>
          <div className="loader_element"></div>
        </div>
      )}
      {!errors.hasResults && (
        <div className="overlay">Sorry, there are no results for this search term. Try another search</div>
      )}
      {errors.hasFailed && <div className="overlay">{errors.message}</div>}
    </div>
  )
}

export default Player
