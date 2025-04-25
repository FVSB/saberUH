document.addEventListener('DOMContentLoaded', async function() {
  // Inyecta CSS para grid y logos uniformes
  const style = document.createElement('style');
  style.textContent = `
    .sponsors-grid {
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      gap: 1.5rem;
      padding: 1rem 0;
    }
    @media (max-width: 1200px) {
      .sponsors-grid { grid-template-columns: repeat(4, 1fr); }
    }
    @media (max-width: 900px) {
      .sponsors-grid { grid-template-columns: repeat(3, 1fr); }
    }
    @media (max-width: 600px) {
      .sponsors-grid { grid-template-columns: repeat(2, 1fr); }
    }
    .sponsor-cell {
      background: #fff;
      border-radius: 12px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.04);
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 120px;
      height: 120px;
      padding: 12px;
      transition: box-shadow 0.2s;
    }
    .sponsor-cell:hover {
      box-shadow: 0 4px 16px rgba(0,0,0,0.10);
    }
    .sponsor-cell img {
      max-width: 100%;
      max-height: 80px;
      object-fit: contain;
      display: block;
      margin: 0 auto;
      background: transparent;
    }
  `;
  document.head.appendChild(style);

  const API_URL = 'http://10.6.143.1';
  const carouselInner = document.querySelector('#carouselSponsors .carousel-inner');
  const IMAGES_BASE_PATH = API_URL + '/api/uploads/';

  // Limpia el contenido anterior
  carouselInner.innerHTML = '';

  try {
    const response = await fetch(`${API_URL}/api/sponsors`);
    const sponsors = await response.json();

    // Crea el grid
    const grid = document.createElement('div');
    grid.className = 'sponsors-grid';

    sponsors.forEach(sponsor => {
      const cell = document.createElement('div');
      cell.className = 'sponsor-cell';

      const img = document.createElement('img');
      img.src = IMAGES_BASE_PATH + sponsor.image;
      img.alt = sponsor.name;
      img.title = sponsor.name;

      cell.appendChild(img);
      grid.appendChild(cell);
    });

    carouselInner.appendChild(grid);
  } catch (error) {
    console.error('Error cargando los auspiciadores:', error);
    carouselInner.innerHTML = '<div class="text-danger">No se pudieron cargar los auspiciadores.</div>';
  }
});
