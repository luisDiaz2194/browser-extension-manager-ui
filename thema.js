document.addEventListener('DOMContentLoaded', function() {
	const toggleThemeButton = document.getElementById('toogleThema');
	const themeIcon = document.getElementById('themeIcon');
	
	// Rutas de tus imágenes
	const iconPaths = {
	  light: './assets/images/icon-sun.svg',
	  dark: './assets/images/icon-moon.svg'
	};
  
	// Verificar tema guardado o preferencia del sistema
	const savedTheme = localStorage.getItem('theme');
	const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
	
	// Aplicar tema inicial
	if (savedTheme === 'light' || (!savedTheme && !systemPrefersDark)) {
	  document.documentElement.setAttribute('data-theme', 'light');
	  if (themeIcon) themeIcon.src = iconPaths.dark; // Mostrar luna (para cambiar a oscuro)
	} else {
	  if (themeIcon) themeIcon.src = iconPaths.light; // Mostrar sol (para cambiar a claro)
	}
	
	// Evento del botón
	if (toggleThemeButton) {
	  toggleThemeButton.addEventListener('click', function() {
		const html = document.documentElement;
		const isLight = html.getAttribute('data-theme') === 'light';
		
		if (isLight) {
		  // Cambiar a tema oscuro
		  html.removeAttribute('data-theme');
		  localStorage.setItem('theme', 'dark');
		  if (themeIcon) themeIcon.src = iconPaths.light;
		} else {
		  // Cambiar a tema claro
		  html.setAttribute('data-theme', 'light');
		  localStorage.setItem('theme', 'light');
		  if (themeIcon) themeIcon.src = iconPaths.dark;
		}
	  });
	}
	
	// Escuchar cambios en las preferencias del sistema (opcional)
	window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
	  if (!localStorage.getItem('theme')) {
		if (e.matches) {
		  document.documentElement.removeAttribute('data-theme');
		  if (themeIcon) themeIcon.src = iconPaths.light;
		} else {
		  document.documentElement.setAttribute('data-theme', 'light');
		  if (themeIcon) themeIcon.src = iconPaths.dark;
		}
	  }
	});
  });