import ReactPlayer from 'react-player'

export default function VideoPlayer({ url }: { url: string }) {
    return (
        <div className="aspect-video">
        <ReactPlayer url={url} controls width="100%" height="100%" />
        </div>
    )
}