// tests/VideoCard.test.tsx
import { render, screen } from '@testing-library/react'
import VideoCard from '../components/VideoCard'

test('renders video title', () => {
    render(<VideoCard video={{ id: 1, title: 'Teste', thumbnail: 'test.jpg' }} />)
    expect(screen.getByText('Teste')).toBeInTheDocument()
})