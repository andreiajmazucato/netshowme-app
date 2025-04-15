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
        <div className="relative w-full overflow-hidden">
            <Slider {...settings}>
                {videos.map((video) => (
                    <div key={video.id} className="relative w-screen h-screen">
                        {/* Slide com efeito opaco e animação */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.3 }}
                            transition={{ duration: 0.5 }}
                            className="absolute inset-0 z-0"
                        >
                            <ReactPlayer
                                url={video.hls_path}
                                playing
                                muted
                                loop
                                width="100%"
                                height="100%"
                                className="absolute top-0 left-0 w-full !h-full object-cover"
                            />
                        </motion.div>

                        {/* Conteúdo por cima, 100% visível */}
                        <div className="absolute top-0 left-0 z-10 text-white px-8 py-12 w-full md:w-[70%] drop-shadow-xl">
                            <p className="text-sm md:text-xl font-medium">{video.category.title}</p>
                            <p className="text-2xl md:text-5xl font-bold mt-8">{video.title}</p>
                            <p className="text-sm md:text-base mt-8 font-light">{video.description}</p>

                            <button
                                className="startVideo mt-6 md:mt-12 w-full md:w-auto text-white font-semibold py-2 px-6 rounded transition"
                                onClick={() => router.push(`/video/${video.id}`)}
                            >
                                ▶ Reproduzir agora
                            </button>
                        </div>
                    </div>
                ))}
            </Slider>
        </div>
    )
}
