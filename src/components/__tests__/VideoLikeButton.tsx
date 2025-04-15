// components/VideoLikeButton.test.tsx
import { render, screen, fireEvent } from '@testing-library/react'
import VideoLikeButton from './VideoLikeButton'

test('chama onLiked ao clicar', async () => {
    const mockOnLiked = jest.fn()

    render(<VideoLikeButton videoId={1} likes={10} onLiked={mockOnLiked} />)

    const button = screen.getByText(/Gostei 10/)
    fireEvent.click(button)

    // Aguarda a execução do fetch
    await screen.findByText(/Gostei 10/)
    expect(mockOnLiked).toHaveBeenCalled()
})
