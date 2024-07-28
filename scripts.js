document.addEventListener('DOMContentLoaded', function() {
    const registerForm = document.getElementById('register-form');
    const loginForm = document.getElementById('login-form');
    const dataForm = document.getElementById('data-form');
    const logoutButton = document.getElementById('logout-button');
    const messageDiv = document.getElementById('message');
    const authSection = document.getElementById('auth-section');
    const formSection = document.getElementById('form-section');
  
    registerForm.addEventListener('submit', async function(event) {
      event.preventDefault();
      const username = document.getElementById('register-username').value;
      const password = document.getElementById('register-password').value;
      try {
        const response = await fetch('/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, password })
        });
        if (response.ok) {
          messageDiv.textContent = 'Registration successful. Please log in.';
        } else {
          messageDiv.textContent = 'Registration failed.';
        }
      } catch (error) {
        messageDiv.textContent = 'Error: ' + error.message;
      }
    });
  
    loginForm.addEventListener('submit', async function(event) {
      event.preventDefault();
      const username = document.getElementById('login-username').value;
      const password = document.getElementById('login-password').value;
      try {
        const response = await fetch('/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, password })
        });
        if (response.ok) {
          authSection.style.display = 'none';
          formSection.style.display = 'block';
          messageDiv.textContent = 'Login successful.';
        } else {
          messageDiv.textContent = 'Login failed.';
        }
      } catch (error) {
        messageDiv.textContent = 'Error: ' + error.message;
      }
    });
  
    dataForm.addEventListener('submit', async function(event) {
      event.preventDefault();
      const formData = document.getElementById('form-data').value;
      try {
        const response = await fetch('/form', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ formData })
        });
        if (response.ok) {
          messageDiv.textContent = 'Form data saved.';
        } else {
          messageDiv.textContent = 'Failed to save form data.';
        }
      } catch (error) {
        messageDiv.textContent = 'Error: ' + error.message;
      }
    });
  
    logoutButton.addEventListener('click', async function() {
      try {
        const response = await fetch('/logout');
        if (response.ok) {
          authSection.style.display = 'block';
          formSection.style.display = 'none';
          messageDiv.textContent = 'Logged out.';
        } else {
          messageDiv.textContent = 'Failed to log out.';
        }
      } catch (error) {
        messageDiv.textContent = 'Error: ' + error.message;
      }
    });
  });
  