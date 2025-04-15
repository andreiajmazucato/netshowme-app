// components/VideoLikeike.tsx
'use client'

import { motion } from 'framer-motion'
import React from 'react'

const Banner: React.FC<{ video: {
            thumbnail: string;
            title: string;
            category: {
                id: number
                title: string
            }
        }
    }> = ({ video }) => {

    return (
        <motion.div
            className="w-full h-[600px] relative rounded-lg overflow-hidden mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
        >
            <img
                src={video.thumbnail}
                alt={video.title}
                className="w-full h-full object-cover"
            />
            <div className="text-white text-2xl font-semibold ">
                {video.category.title}
            </div>

            <div className="left-4 text-white text-2xl font-semibold bg-black/50 px-4 py-2 rounded">
                {video.title}
            </div>
        </motion.div>
    )
}

export default Banner
