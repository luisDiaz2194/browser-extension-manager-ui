document.addEventListener('DOMContentLoaded', async () =>{
	try {
		//Cargar datos del JSON
		const response = await fetch('/data/data.json');
		if(!response.ok) throw new Error ('Error al cargar la data de las extensiones');
		const data = await response.json();

		//Obtener las referencias de los divs por su ID
		const extensionsContainer = document.getElementById('extensionsContainer');
		const filterButtons = document.querySelectorAll('.filter-btn');
		const extensions = data;

		//Renderizar Extensiones
		function renderExtensions(filter = 'all'){
			extensionsContainer.innerHTML = '';
			const filtered = extensions.filter(ext => {
				if (filter === 'all') return true;
				return filter === 'active' ? ext.active : !ext.active;
			  });
			 
			  if (filtered.length === 0) {
				extensionsContainer.innerHTML = '<p class="no-results">No hay extensiones para mostrar.</p>';
				return;
			  }

			  filtered.forEach(ext => {
				const extCard = document.createElement('div');
				extCard.className = `ext-card ${ext.active ? '' : 'inactive'}`;
				extCard.innerHTML = `
					<img src="${ext.logo}" alt="${ext.name}" class="extension-icon">
					<div class="extension-info">
						<div class="extension-name">${ext.name}</div>
						<div class="extension-description">${ext.description}</div>
					</div>
					<label class="toggle-switch">
						<input type="checkbox" ${ext.active ? 'checked' : ''} data-id="${ext.name}">
						<span class="toggle-slider"></span>
					</label>	
				`;
				extensionsContainer.appendChild(extCard);
			  });
		}
		
		// Render inicial
		renderExtensions();
	} catch (error) {
		console.error('Error:', error);

	}
})