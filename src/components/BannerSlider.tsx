'use client'

import Slider from 'react-slick'
import { motion } from 'framer-motion'
import {useRouter} from "next/navigation";

type Video = {
    id: number
    thumbnail: string
    title: string
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
                        <div className="absolute top-4 left-4 text-white px-4 py-2 font-nunito w-[70%]">
                            <p className="text-xl font-medium mt-10">{video.category.title}</p>
                            <p className="text-5xl mt-8">{video.title}</p>
                            <p className="mt-8 font-light">{video.description}</p>
                            <button className="startVideo mt-12"
                                    onClick={() => {
                                        console.log('Indo para o vídeo', video.id)
                                        router.push(`/video/${video.id}`)
                                    }}
                            >Reproduzir agora</button>
                        </div>
                    </motion.div>
                ))}
            </Slider>
        </div>
    )
}
