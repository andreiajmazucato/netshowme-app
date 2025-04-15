'use client'

import Slider from 'react-slick'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'

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
        <div className="w-full h-[500px] rounded-lg overflow-hidden mb-6">
            <Slider {...settings}>
                {videos.map((video) => (
                    <motion.div
                        key={video.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.9 }}
                        transition={{ duration: 0.5 }}
                        className="relative"
                    >
                        <video
                            src={video.hls_path}
                            className="w-full h-[500px] object-cover"
                            autoPlay
                            muted
                            loop
                        />
                        <div className="absolute top-4 left-4 text-white px-4 py-2 font-nunito w-[90%] md:w-[70%]">
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
