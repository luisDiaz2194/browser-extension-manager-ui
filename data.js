document.addEventListener('DOMContentLoaded', async () => {
    try {
        // Cargar datos del JSON
        const response = await fetch('/data/data.json');
        if(!response.ok) throw new Error('Error al cargar la data de las extensiones');
        const extensions = await response.json(); // Cambiado de 'data' a 'extensions'

        // Obtener las referencias
        const extensionsContainer = document.getElementById('extensionsContainer');
        const filterButtons = document.querySelectorAll('.filter-btn');

        // Función para actualizar estado
        function updateExtensionState(name, isActive) {
            console.log(`Extensión ${name} actualizada a ${isActive ? 'activa' : 'inactiva'}`);
        }

        // Función para manejar los toggles
        function setupToggleButtons() {
            document.querySelectorAll('.toggle-switch input').forEach(toggle => {
                toggle.addEventListener('change', function() {
                    const extName = this.dataset.id; 
                    const extCard = this.closest('.ext-card');
                    
                    // Actualizar estado visual
                    const isActive = this.checked;
                    extCard.classList.toggle('inactive', !isActive);
                    
                    // Actualizar texto del status
                    const statusElement = extCard.querySelector('.extension-status');
                    statusElement.textContent = isActive ? 'Remove' : 'Add';
                    
                    // Actualizar en datos (necesitarías encontrar la extensión en el array)
                    const extension = extensions.find(ext => ext.name === extName);
                    if (extension) {
                        extension.isActive = isActive;
                        updateExtensionState(extName, isActive);
                    }
                });
            });
        }

        // Renderizar Extensiones
        function renderExtensions(filter = 'all') {
            extensionsContainer.innerHTML = '';
            
            const filtered = extensions.filter(ext => {
                if (filter === 'all') return true;
                return filter === 'active' ? ext.isActive : !ext.isActive;
            });
            
            if (filtered.length === 0) {
                extensionsContainer.innerHTML = '<p class="no-results">No hay extensiones para mostrar.</p>';
                return;
            }

            filtered.forEach(ext => {
                const extCard = document.createElement('div');
                extCard.className = `ext-card ${ext.isActive ? '' : 'inactive'}`;
                extCard.innerHTML = `
                    <img src="${ext.logo}" alt="${ext.name}" class="extension-icon">
                    <div class="extension-info">
                        <div class="extension-name">${ext.name}</div>
                        <div class="extension-description">${ext.description}</div>
                    </div>
                    <span class="extension-status">${ext.isActive ? 'Remove' : 'Add'}</span>
                    <label class="toggle-switch">
                        <input type="checkbox" ${ext.isActive ? 'checked' : ''} data-id="${ext.name}">
                        <span class="toggle-slider"></span>
                    </label>  
                `;
                extensionsContainer.appendChild(extCard);
            });

            setupToggleButtons(); // Configurar los eventos después de renderizar
        }

        // Eventos para los filtros
        filterButtons.forEach(buttonFilter => {
            buttonFilter.addEventListener('click', () => {
                filterButtons.forEach(b => b.classList.remove('active'));
                buttonFilter.classList.add('active');
                renderExtensions(buttonFilter.dataset.filter);
            });
        });

        // Render inicial
        renderExtensions();

    } catch (error) {
        console.error('Error:', error);
        extensionsContainer.innerHTML = '<p class="error">Error al cargar las extensiones</p>';
    }
});