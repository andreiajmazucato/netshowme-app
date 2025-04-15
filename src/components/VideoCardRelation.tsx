import React from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'

import {
    MdOutlinePlayArrow,
    MdLiveTv,
    MdPlaylistPlay,
    MdLibraryAdd,
    MdAccessTime,
} from 'react-icons/md'

interface Video {
    id: number
    title: string
    thumbnail: string
    category: {
        title: string
    }
}

interface VideoCardProps {
    video: Video
    categoryTitle: string
    index: int
}

// Mapeia categoria para ícone
const iconByCategory: Record<string, JSX.Element> = {
    'Ao Vivo': <MdLiveTv size={24} />,
    'Minha Lista': <MdLibraryAdd size={24} />,
    'Playlists': <MdPlaylistPlay size={24} />,
    'Continuar reprodução': <MdOutlinePlayArrow size={24} />,
    'Flow Experience 2025': <MdOutlinePlayArrow size={24} />,
}

const VideoCard: React.FC<VideoCardProps> = ({ video, categoryTitle, index }) => {
    const icon = iconByCategory[categoryTitle] || <MdOutlinePlayArrow size={24} />

    const router = useRouter()

    const handleClick = () => {
        router.push(`/video/${video.id}`)
    }

    return (
        <div className="min-w-[340px] max-w-[340px] flex-shrink-0 cursor-pointer" onClick={handleClick}>
            <div className="relative">
                <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-56 object-cover rounded-lg"
                />

                {categoryTitle == "Ao Vivo" && index == 0 && (
                    <div className="absolute top-2 left-2 text-white text-xs font-bold px-2 py-1 live">
                        Ao Vivo
                    </div>
                )}

                {categoryTitle == "Ao Vivo" && index > 0 && (
                    <div className="absolute top-2 left-2 text-white text-xs font-bold px-2 py-1 notLive">
                        Em breve
                    </div>
                )}

                <div className="absolute top-1 right-2 opacity-70 p-1 text-white">
                    {icon}
                </div>
            </div>

            <p className="text-md text-gray-400 mt-2 font-nunito mt-4">
                {video.category.title}
            </p>
            <h3 className="text-xl font-medium text-white font-nunito mt-4">
                {video.title}
            </h3>
        </div>
    )
}

export default VideoCard
