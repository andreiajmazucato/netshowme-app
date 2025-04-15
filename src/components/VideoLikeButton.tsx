// components/VideoLikeButton.tsx
import { IoMdThumbsUp } from "react-icons/io"

interface Props {
    videoId: number
    likes: number
    onLiked: () => void
}

export default function VideoLikeButton({ videoId, likes, onLiked }: Props) {
    const handleLike = async () => {
        await fetch(`/video/${videoId}`, {
            method: 'PATCH',
            body: JSON.stringify({ like: true }),
        })
        onLiked()
    }

    return (
        <button onClick={handleLike}
            className="rounded bg-[#222] px-3 py-1 flex items-center">
            <IoMdThumbsUp className="text-xl mr-1" /> Gostei {likes}
        </button>
    )
}