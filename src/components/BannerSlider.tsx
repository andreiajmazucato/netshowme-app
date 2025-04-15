'use client'

import Slider from 'react-slick'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import ReactPlayer from 'react-player'

type Video = {
    id: number
    hls_path: string
    thumbnail: string
    title: string
    description: string
    category: {
        title: string
    }
}

export default function BannerSlider({ videos }: { videos: Video[] }) {
    const settings = {
        dots: true,
        infinite: true,
        speed: 600,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        arrows: false,
        pauseOnHover: true,
    }

    const router = useRouter()

    return (
        <div className="w-full min-h-[600px] rounded-lg overflow-hidden mb-6">
            <Slider {...settings}>
                {videos.map((video) => (
                    <motion.div
                        key={video.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.9 }}
                        transition={{ duration: 0.5 }}
                        className="relative w-full min-h-[600px]"
                    >
                        {/* Vídeo de fundo */}
                        <div className="absolute inset-0 z-0 w-screen left-1/2 -translate-x-1/2">
                            <ReactPlayer
                                url={video.hls_path}
                                playing
                                muted
                                loop
                                width="100%"
                                height="100%"
                                className="absolute top-0 left-0 w-full !h-full object-cover"
                            />
                        </div>

                        {/* Conteúdo por cima */}
                        <div className="absolute top-4 left-4 z-10 text-white px-4 py-2 font-nunito w-[90%] md:w-[70%]">
                            <p className="text-sm md:text-xl font-medium mt-6 md:mt-10">{video.category.title}</p>
                            <p className="text-2xl md:text-5xl font-bold mt-4 md:mt-8">{video.title}</p>
                            <p className="text-sm md:text-base mt-4 md:mt-8 font-light">{video.description}</p>

                            <button
                                className="startVideo mt-6 md:mt-12 w-full md:w-auto bg-pink-600 hover:bg-pink-700 text-white font-semibold py-2 px-6 rounded transition"
                                onClick={() => router.push(`/video/${video.id}`)}
                            >
                                ▶ Reproduzir agora
                            </button>
                        </div>
                    </motion.div>
                ))}
            </Slider>
        </div>
    )
}
