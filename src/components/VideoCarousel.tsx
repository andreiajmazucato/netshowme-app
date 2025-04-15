// components/VideoCarousel.tsx
import React from 'react';
import VideoCard from './VideoCard';

interface Video {
    id: number;
    title: string;
    thumbnail: string;
}

interface VideoCarouselProps {
    categoryTitle: string;
    videos: Video[];
}

const VideoCarousel: React.FC<VideoCarouselProps> = ({ categoryTitle, videos }) => (
    <section className="mb-8">
    <h2 className="text-xl font-semibold mb-4">{categoryTitle}</h2>
        <div className="flex overflow-x-auto">
    {videos.map((video) => (
        <VideoCard key={video.id} video={video} />
    ))}
    </div>
    </section>
);

export default VideoCarousel;
