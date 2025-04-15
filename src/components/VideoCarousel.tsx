'use client'

import React, { useRef } from 'react'
import VideoCard from './VideoCard'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'

interface Video {
    id: number
    title: string
    thumbnail: string
}

interface VideoCarouselProps {
    categoryTitle: string
    videos: Video[]
}

const VideoCarousel: React.FC<VideoCarouselProps> = ({ categoryTitle, videos }) => {
    const scrollRef = useRef<HTMLDivElement>(null)

    const scroll = (direction: 'left' | 'right') => {
        if (scrollRef.current) {
            const { scrollLeft, clientWidth } = scrollRef.current
            scrollRef.current.scrollTo({
                left: direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth,
                behavior: 'smooth',
            })
        }
    }

    return (
        <section className="mb-16">
            {/* Título + Botões */}
            <div className="flex justify-between items-center mb-4 mt-12 px-4">
                <h2 className="text-2xl font-bold text-white font-nunito">{categoryTitle}</h2>
                <div className="flex items-center gap-2 text-white">
                    <span className="cursor-pointer hover:none text-md font-semibold font-nunito mr-3">Veja mais</span>
                    <button onClick={() => scroll('left')} className="hover:text-gray-300 mr-3">
                        <FaChevronLeft />
                    </button>
                    <button onClick={() => scroll('right')} className="hover:text-gray-300">
                        <FaChevronRight />
                    </button>
                </div>
            </div>

            {/* Lista de vídeos */}
            <div
                ref={scrollRef}
                className="flex overflow-x-auto scrollbar-hide space-x-4 px-4"
            >
                {videos.map((video, index) => (
                    <VideoCard key={video.id}
                               video={video}
                               categoryTitle={categoryTitle}
                               index={index}
                    />
                ))}
            </div>
        </section>
    )
}

export default VideoCarousel
