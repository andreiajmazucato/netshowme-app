'use client'

import { useRef, useState } from 'react'
import { FaPlay, FaPause, FaSpotify, FaEllipsisH } from 'react-icons/fa'

export default function AudioPlayer({
                                                    src,
                                                    title,
                                                    artist,
                                                    cover,
                                                }: {
    src: string
    title: string
    artist: string
    cover: string
}) {
    const audioRef = useRef<HTMLAudioElement>(null)
    const [isPlaying, setIsPlaying] = useState(false)

    const togglePlay = () => {
        if (!audioRef.current) return

        if (isPlaying) {
            audioRef.current.pause()
        } else {
            audioRef.current.play()
        }

        setIsPlaying(!isPlaying)
    }

    return (
        <div className="bg-[#8c6d7c] text-white rounded-xl p-4 w-full flex items-center gap-4 relative shadow-lg">
            <img src={cover} alt={title} className="w-16 h-16 rounded-lg object-cover" />

            <div className="flex-1">
                <h2 className="font-semibold">{title}</h2>
                <p className="text-sm text-gray-200">{artist}</p>
                <span className="text-xs bg-white text-black px-2 py-0.5 rounded mt-1 inline-block">PREVIEW</span>
            </div>

            <div className="flex flex-col items-center justify-between gap-2 ml-4">
                <FaSpotify className="text-white text-xl ml-8" />

                <div className="flex items-center gap-2 mt-3">
                    <FaEllipsisH className="text-white text-xl mr-4" />
                    <button
                        onClick={togglePlay}
                        className="bg-white text-[#8c6d7c] w-8 h-8 rounded-full flex items-center justify-center text-lg mr-2"
                    >
                        {isPlaying ? <FaPause /> : <FaPlay />}
                    </button>
                    <audio ref={audioRef} src={src} preload="auto" />
                </div>
            </div>

        </div>
    )
}
