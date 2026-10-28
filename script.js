// Lógica de Modo Oscuro / Claro
const themeToggleBtn = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');

const savedTheme = localStorage.getItem('theme');
const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

// Función de aleatoriedad simple para los versículos random
const randomIndex = Math.floor(Math.random() * rhemaVerses.length);
const selectedVerse = rhemaVerses[randomIndex];

document.getElementById('rhema-text').textContent = selectedVerse.text;
document.getElementById('rhema-ref').textContent = selectedVerse.ref;

if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
    document.body.classList.add('dark-mode');
    themeIcon.textContent = '☀️';
} else {
    document.body.classList.remove('dark-mode');
    themeIcon.textContent = '🌙';
}

themeToggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    themeIcon.textContent = isDark ? '☀️' : '🌙';
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
});

// Envío del Formulario con Formspree (reemplaza TU_FORM_ID por tu código de Formspree)
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/maeeenpv';

const contactForm = document.getElementById('contacto-form');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = new FormData(contactForm);

        try {
            const response = await fetch(FORMSPREE_ENDPOINT, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                contactForm.innerHTML = `
                    <div style="text-align: center; padding: 25px 15px; background: var(--bg-rhema); border-radius: 8px; border-left: 4px solid var(--blue);">
                        <h3 style="color: var(--blue); margin-top: 0; font-size: 1.3rem;">¡Registro Exitoso!</h3>
                        <p style="margin-bottom: 0; font-size: 1rem;">Tus datos se han guardado correctamente. Estaremos en contacto contigo muy pronto.</p>
                    </div>
                `;
            } else {
                const data = await response.json();
                throw new Error(data.error || 'Error al procesar el formulario');
            }
        } catch (error) {
            alert('Ocurrió un error al enviar la información. Revisa que el ID de Formspree sea correcto.');
            console.error('Error enviando a Formspree:', error);
        }
    });
}
