import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import TextExpander from '../TextExpander.jsx';

describe('Componente TextExpander', () => {
  const textContent = 'Café intenso y concentrado, extraído a alta presión durante 25 segundos con notas de chocolate negro.';

  it('debe renderizar el texto colapsado por defecto', () => {
    render(
      <TextExpander collapsedNumWords={5} collapseButtonText="Mostrar mas">
        {textContent}
      </TextExpander>
    );

    // Debe mostrar solo las primeras 5 palabras
    const collapsedText = 'Café intenso y concentrado, extraído';
    expect(screen.getByText(new RegExp(collapsedText, 'i'))).toBeInTheDocument();
    
    // El texto completo no debe mostrarse de manera contigua si está recortado
    expect(screen.queryByText(textContent)).not.toBeInTheDocument();
    
    // El botón debe decir "Mostrar mas"
    expect(screen.getByRole('button', { name: /mostrar mas/i })).toBeInTheDocument();
  });

  it('debe mostrar el texto completo al hacer clic en "Mostrar mas"', async () => {
    render(
      <TextExpander collapsedNumWords={5} collapseButtonText="Mostrar mas" expandButtonText="Mostrar menos">
        {textContent}
      </TextExpander>
    );

    const button = screen.getByRole('button', { name: /mostrar mas/i });
    fireEvent.click(button);

    // Ahora debe mostrar el texto completo
    expect(screen.getByText(textContent)).toBeInTheDocument();
    
    // El botón debe cambiar su etiqueta a "Mostrar menos"
    expect(screen.getByRole('button', { name: /mostrar menos/i })).toBeInTheDocument();
  });

  it('debe volver a colapsar el texto al hacer clic en "Mostrar menos"', () => {
    render(
      <TextExpander collapsedNumWords={5} collapseButtonText="Mostrar mas" expandButtonText="Mostrar menos" expanded={true}>
        {textContent}
      </TextExpander>
    );

    // Como inicia expandido (expanded={true}), se muestra el texto completo
    expect(screen.getByText(textContent)).toBeInTheDocument();
    
    const button = screen.getByRole('button', { name: /mostrar menos/i });
    fireEvent.click(button);

    // Debe volver a colapsar
    const collapsedText = 'Café intenso y concentrado, extraído';
    expect(screen.getByText(new RegExp(collapsedText, 'i'))).toBeInTheDocument();
    expect(screen.queryByText(textContent)).not.toBeInTheDocument();
  });
});
