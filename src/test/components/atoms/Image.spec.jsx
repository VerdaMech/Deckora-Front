import React from 'react';
import { render, screen } from '@testing-library/react';
import Image from '../../../components/atoms/Image'; 



describe('Image Component', () => {
    const mockProps = {
        src: 'test-image.jpg',
        alt: 'Descripción de prueba',
        className: 'img-custom-class'
    };

    it('renderiza el elemento de imagen', () => {
        render(<Image {...mockProps} />);

        const imageElement = screen.getByRole('img', { name: mockProps.alt });

        expect(imageElement).toBeTruthy();
    });

    it('aplica las props src, alt y className al elemento <img>', () => {
        render(<Image {...mockProps} />);

        const imageElement = screen.getByRole('img');


        expect(imageElement.getAttribute('src')).toBe(mockProps.src);

        expect(imageElement.getAttribute('alt')).toBe(mockProps.alt);

        expect(imageElement.classList.contains(mockProps.className)).toBe(true); 
    });
});
