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
            setVideo(response.data) // Atualiza o estado do vídeo com os novos likes
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

            <div className="w-[80%] mt-8 mx-auto">
                <div >
                    <h1 className="text-2xl font-bold mb-4">{video.title}</h1>
                </div>

                <div className="flex items-center justify-between px-4">
                    <div className="flex items-center gap-2">
                        <span className="text-sm font-light text-gray-300 mb-4 px-4 rounded-full bg-[#222] p-2">{video.category.title}</span>
                        <span className="text-md font-light text-gray-300 mb-4 ml-2">{format(new Date(video.created_at), 'dd/MM/yyyy')}</span>
                        <span className="text-md font-semibold mb-4 ml-4 flex items-center"><MdOutlineBookmarkAdd className="icon text-2xl mr-2" />Adicionar a minha lista</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-sm font-light text-gray-400 mb-4 mr-4 opacity-70">{video.views} visualizações</span>
                        <button
                            onClick={handleLike}
                            className="text-md font-light mb-4 rounded bg-[#222] px-4 py-2 flex items-center mr-3">
                            <IoMdThumbsUp className="icon text-2xl mr-2" /> Gostei {video.likes}
                        </button>
                        <span className="text-md font-light mb-4 ml-2 flex items-center"><MdOutlineThumbDownAlt className="icon text-2xl mr-2" /> Não é pra mim</span>
                        <span className="text-md font-bold mb-4 ml-4 flex items-center"><IoShareSocialOutline className="icon text-2xl mr-2" /> Compartilhar</span>
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
                        <audio controls>
                            <source src="https://www.exemplo.com/audio.mp3" type="audio/mpeg" width="100%" />
                            Seu navegador não suporta o elemento de áudio.
                        </audio>

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
