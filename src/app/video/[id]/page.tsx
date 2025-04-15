'use client'

import { useEffect, useState } from 'react'
import { FaCloudDownloadAlt } from 'react-icons/fa'
import { MdOutlineBookmarkAdd, MdOutlineThumbDownAlt,  } from "react-icons/md";
import { IoMdThumbsUp } from "react-icons/io";
import { IoShareSocialOutline } from "react-icons/io5";

import '../../../styles/video-gallery.scss'
import { useParams } from 'next/navigation'
import api from '@/utils/api'
import VideoPlayer from '@/components/VideoPlayer'
import VideoCarouselRelation from '@/components/VideoCarouselRelation';
import { format } from 'date-fns'
import VideoLikeButton from '@/components/VideoLikeButton'
import AudioPlayer from '@/components/AudioPlayer';

export default function VideoRelationPage() {
    const { id } = useParams()
    const [videos, setVideos] = useState<Video[]>([])
    const [video, setVideo] = useState<any>(null)

    useEffect(() => {
        if (id) {
            api.get(`/video/${id}`)
                .then(res => setVideo(res.data))
                .catch(err => console.error(err))

            // Marca a view (não like)
            api.patch(`/video/${id}`, {
                like: false,
            }).catch(err => console.error('Erro ao registrar visualização:', err))
        }

        api.get('/videos')
            .then((response) => setVideos(response.data))

    }, [id])


    const handleLike = async () => {
        try {
            const response = await api.patch(`/video/${id}`, {
                like: true,
            })
            setVideo(response.data)
        } catch (error) {
            console.error('Erro ao curtir o vídeo:', error)
        }
    }

    const categoriesManual = [
        'Conteúdos relacionados',
    ]

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

    if (!video) return <p></p>

    return (
        <div className="video-gallery">

            <div className="bg-black">
                <div className="p-6 text-white max-w-5xl mx-auto">
                    <VideoPlayer url={video.hls_path} />
                </div>
            </div>

            <div className="w-[95%] md:w-[75%] mt-8 mx-auto">
                <div >
                    <h1 className="text-2xl font-bold mb-4">{video.title}</h1>
                </div>

                <div className="flex flex-wrap items-center justify-between px-4 gap-y-2">
                    <div className="flex flex-wrap items-center gap-x-2 text-xs sm:text-sm">
                        <span className="px-3 py-1 rounded-full bg-[#222] text-gray-300">{video.category.title}</span>
                        <span className="text-gray-300">{format(new Date(video.created_at), 'dd/MM/yyyy')}</span>
                        <span className="font-semibold flex items-center"><MdOutlineBookmarkAdd className="text-xl mr-1" />Adicionar a minha lista</span>
                    </div>
                    <div className="flex flex-wrap items-center gap-x-2 text-xs sm:text-sm">
                        <VideoLikeButton
                            videoId={video.id}
                            likes={video.likes}
                            onLiked={async () => {
                                try {
                                    const response = await api.patch(`/video/${video.id}`, {
                                        like: true,
                                    })
                                    setVideo(response.data)
                                } catch (error) {
                                    console.error('Erro ao curtir o vídeo:', error)
                                }
                            }}
                        />
                        <span className="flex items-center ml-2"><MdOutlineThumbDownAlt className="text-xl mr-1" /> Não é pra mim</span>
                        <span className="font-bold flex items-center ml-2"><IoShareSocialOutline className="text-xl mr-1" /> Compartilhar</span>
                        <span className="text-gray-400 opacity-70 mx-4 my-3">{video.views} visualizações</span>
                    </div>
                </div>


                <div className="mt-8">
                    <h1 className="text-2xl font-bold mb-4 opacity-70">Resumo</h1>
                    <p className="mt-4 text-gray-400">{video.description}</p>
                </div>

                <div className="mt-8">
                    <h1 className="text-2xl font-bold mb-4 opacity-60">Como fazer upload</h1>
                    <p className="mt-4 text-gray-400">Ao acessar, selecione no menu superior a opção Gerenciar vídeos, em seguida Criar vídeo. Para começar o processo de upload, selecione a opção Carregar vídeo. Ao abrir a janela de busca, localize o arquivo e o selecione.</p>
                </div>

                <div className="mt-8">
                    <h1 className="text-xl font-bold mb-4 opacity-70">Arquivos complementares</h1>
                    <div className="mt-4 space-y-2">
                        <p className="block w-fit text-gray-400 flex items-center rounded border border-gray-600 px-3 py-2 gap-2">
                            arquivo-do-curso-aula-3.pdf
                            <FaCloudDownloadAlt className="text-xl" />
                        </p>

                        <p className="block w-fit text-gray-400 flex items-center rounded border border-gray-600 px-3 py-2 gap-2 mt-4">
                            Prototipinho top.pdf
                            <FaCloudDownloadAlt className="text-xl" />
                        </p>
                    </div>
                </div>

                <div className="mt-8">
                    <h1 className="text-xl font-bold mb-4 opacity-70">Audio</h1>
                    <p className="mt-4 text-gray-300 flex items-center gap-2">
                        <AudioPlayer
                            src="https://www.exemplo.com/audio.mp3"
                            title="Sun Sets Alone"
                            artist="aloneintokyo"
                            cover="../imgs/img-audio.png"
                        />
                    </p>
                </div>

                {/* CARROUSEL */}
                {categoriesManual.map((category) => {
                    const videosCategory = getRandomVideos(videos, 6)

                    return (
                        <VideoCarouselRelation
                            key={category}
                            categoryTitle={category}
                            videos={videosCategory}
                        />
                    )
                })}

            </div>
        </div>
    )
}
