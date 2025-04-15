## Netshow.me - Página Videos

Uma aplicação front-end de vídeo interativo desenvolvida com React + Next.js que permite visualizar um vídeo, registrar visualizações e likes, acessar conteúdo relacionado e baixar materiais complementares.


### Objetivo

O objetivo deste projeto é oferecer uma interface completa para exibição de vídeos com recursos como:

- Reprodutor de vídeo via streaming (HLS)

- Registro automático de visualizações ao acessar o vídeo

- Botão "Gostei" para curtir vídeos

- Apresentação de vídeos relacionados

- Download de arquivos complementares

- Player de áudio integrado

- Estilo visual moderno com TailwindCSS


### Tecnologias Utilizadas

- React com use client e Hooks (useState, useEffect)

- Next.js (App Router, useParams)

- TypeScript

- Tailwind CSS para estilização

- SASS (video-gallery.scss)

- React Icons para os ícones interativos

- React Player (para reprodutor de vídeo externo)

- date-fns para formatação de datas

- Axios via arquivo api.ts para requisições HTTP

### Instalação
Siga os passos abaixo para rodar o projeto localmente:

```
# Clone o repositório
git clone https://github.com/andreiajmazucato/netshowme-app

# Acesse a pasta do projeto
cd netshowme-app

# Instale as dependências
npm install

# Rode o projeto em modo de desenvolvimento
npm run dev

```
Para acessar a aplicação rodando, abra a URL:

- http://localhost:3000/


### Estrutura Básica

```
src/
├── app/
│   └── video/[id]/page.tsx       # Página principal de visualização de vídeos
├── components/
│   ├── VideoPlayer.tsx           # Player de vídeo com React Player
│   └── VideoCarouselRelation.tsx # Carrossel de vídeos relacionados
├── styles/
│   └── video-gallery.scss        # Estilos específicos para a galeria
├── utils/
│   └── api.ts     

```


### Informações de instalação do Backend 
- Rodar a api backend que conecta nesta aplicação frontend 

- Projeto está no repositório:
https://github.com/andreiajmazucato/netshowme-api

- Siga as instruções descritas no Readme do repositório para startar o projeto.


### Informações Adicionais
- As visualizações são registradas automaticamente ao abrir a página do vídeo.

- O botão "Gostei" atualiza o número de curtidas via PATCH request na API.

- Os vídeos relacionados são embaralhados e exibidos no carrossel com base em uma lista manual (categoriesManual).

- O layout é responsivo e otimizado para diferentes tamanhos de tela.

- Arquivos e áudio são simulados, substitua os caminhos para produção real.


###### ---


Desenvolvido por Andreia Mazucato.

#### Obrigada! :-)


