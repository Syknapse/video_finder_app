const Player = ({ video, onEnded, vidEl }) => {
  if (!video || Object.keys(video).length === 0) return null

  return (
    <video ref={vidEl} onEnded={onEnded} controls muted autoPlay>
      {video.video_files.map(videoFile => (
        <source key={videoFile.id} src={videoFile.link} type={videoFile.file_type} />
      ))}
      <p>
        Your browser doesn't support HTML5 video. Here is a <a href={video.url}>link to the video</a> instead.
      </p>
    </video>
  )
}

export default Player
