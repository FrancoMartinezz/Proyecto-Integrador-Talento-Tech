document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contact-form');

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const nombre = document.getElementById('nombre').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    if (nombre === '' || email === '' || message === '') {
      console.log('Por favor, complete todos los campos.');
    } else {
      console.log('Todos los campos están completos.');
      form.submit();
    }
  });
});