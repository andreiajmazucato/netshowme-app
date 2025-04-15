// components/SkeletonLoader.tsx
import React from 'react'
import ContentLoader from 'react-content-loader'

const SkeletonLoader: React.FC = () => (
    <div className="w-full h-[300px] bg-[#222] rounded-lg mb-6 overflow-hidden">
        <ContentLoader
            speed={2}
            width="100%"
            height={300}
            backgroundColor="#333"
            foregroundColor="#444"
            viewBox="0 0 1000 300"
        >
            <rect x="0" y="0" rx="10" ry="10" width="1000" height="300" />
        </ContentLoader>
    </div>
)

export default SkeletonLoader
