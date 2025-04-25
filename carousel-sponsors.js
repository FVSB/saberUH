document.addEventListener('DOMContentLoaded', async function() {
    const API_URL = 'http://10.6.143.1'; 
    const carouselInner = document.querySelector('#carouselSponsors .carousel-inner');
    const IMAGES_BASE_PATH = API_URL+'/api/uploads/';
    const MAX_PER_SLIDE = 5;
  
    try {
      const response = await fetch('http://10.6.143.1/api/sponsors'); 
      //if (!response.ok) throw new Error(`Respuesta de red no OK ${response.status}`, response.status);
      console.log(`El estatus es ${response.status}`)
      
      const sponsors = await response.json();
  
      for (let i = 0; i < sponsors.length; i += MAX_PER_SLIDE) {
        const slideSponsors = sponsors.slice(i, i + MAX_PER_SLIDE);
  
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('carousel-item');
        if (i === 0) itemDiv.classList.add('active');
  
        const rowDiv = document.createElement('div');
        rowDiv.classList.add('row', 'justify-content-center', 'align-items-center');
  
        slideSponsors.forEach(sponsor => {
          const colDiv = document.createElement('div');
          colDiv.classList.add('col', 'text-center');
          colDiv.style.maxWidth = '180px';
  
          const img = document.createElement('img');
          img.src = IMAGES_BASE_PATH + sponsor.image;
          img.alt = sponsor.name;
          img.title = sponsor.name;
          img.classList.add('img-fluid', 'mb-3');
          img.style.maxHeight = '100px';
  
          colDiv.appendChild(img);
          rowDiv.appendChild(colDiv);
        });
  
        itemDiv.appendChild(rowDiv);
        carouselInner.appendChild(itemDiv);
      }
    } catch (error) {
      console.error('Error cargando los auspiciadores:', error);
      carouselInner.innerHTML = '<div class="text-danger">No se pudieron cargar los auspiciadores.</div>';
    }
  });
  