import clsx from 'clsx'
import { Loader } from './components'
import { ErrorModule } from './components'
import './player.css'

const Player = ({ video, onEnded, onTimeUpdate, vidEl, isLoading, error }) => {
  const hasVideo = video && Object.keys(video).length !== 0

  return (
    <div className={clsx('player', !hasVideo && 'empty')}>
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
      {isLoading && <Loader className="overlay" />}
      {error.hasError && <ErrorModule className="overlay" message={error.message} />}
    </div>
  )
}

export default Player
