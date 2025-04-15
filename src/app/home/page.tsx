    'use client'

    import { useEffect, useState } from 'react'
    import api from '@/utils/api'
    import '../../styles/video-gallery.scss'
    import VideoCarousel from '@/components/VideoCarousel';
    import BannerSlider from '@/components/BannerSlider'

    type Video = {
        id: number
        title: string
        description: string
        thumbnail: string
        hls_path: string
        views: number
        likes: number
        category: {
            id: number
            title: string
        }
        site: {
            id: number
            title: string
            domain: string
        }
    }

    const categoriesManual = [
        'Continuar reprodução',
        'Ao Vivo',
        'Minha Lista',
        'Flow Experience 2025',
        'Playlists',
    ]

    export default function HomePage() {
        const [videos, setVideos] = useState<Video[]>([])
        const [loading, setLoading] = useState(true)
        const [menuOpen, setMenuOpen] = useState(false)

        useEffect(() => {
            api.get('/videos')
                .then((response) => {
                    setVideos(response.data)
                })
                .catch((error) => {
                    console.error('Erro ao buscar vídeos:', error)
                })
                .finally(() => {
                    setLoading(false)
                })
        }, [])

        const videosByCategory = videos.reduce<Record<string, Video[]>>((acc, video) => {
            const category = video.category.title
            if (!acc[category]) {
                acc[category] = []
            }
            acc[category].push(video)
            return acc
        }, {})

        function getRandomVideos(videos: Video[], count: number): Video[] {
            const shuffled = [...videos].sort(() => 0.5 - Math.random())
            return shuffled.slice(0, count)
        }

        if (loading) return <p></p>

        return (
            <div className="video-gallery">

                {/* BANNER ROTATIVO */}
                {loading ? (
                    <BannerSkeleton />
                ) : (
                    videos.length > 0 && <BannerSlider videos={getRandomVideos(videos, 3)} />
                )}

                {/* CARROUSEL */}
                {categoriesManual.map((category) => {
                    const videosCategory = getRandomVideos(videos, 6)

                    return (
                        <VideoCarousel
                            key={category}
                            categoryTitle={category}
                            videos={videosCategory}
                        />
                    )
                })}

            </div>
        )
    }