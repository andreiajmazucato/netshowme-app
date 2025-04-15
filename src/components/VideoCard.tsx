// components/VideoCard.tsx
import React from 'react';

interface VideoCardProps {
    video: {
        id: number;
        title: string;
        thumbnail: string;
    };
}

const VideoCard: React.FC<VideoCardProps> = ({ video }) => (
    <div className="w-64 mr-4">
    <img
        src={video.thumbnail}
        alt={video.title}
        className="w-full h-36 object-cover rounded"
        />
    <h3 className="mt-2 text-sm font-medium text-gray-800">{video.title}</h3>
    </div>
);

export default VideoCard;