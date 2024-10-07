// Function to update user info display
function updateUserInfo(name, email) {
    const userInfoDiv = document.getElementById('userInfo');
    userInfoDiv.textContent = `Welcome, ${name} (${email})`;
}

// Load stored data on page load
const storedData = JSON.parse(localStorage.getItem('userData'));
if (storedData) {
    document.getElementById('name').value = storedData.name;
    document.getElementById('email').value = storedData.email;
    updateUserInfo(storedData.name, storedData.email);
}

// Handle form submission
document.getElementById('userForm').addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;

    // Get the current theme from localStorage
    const currentTheme = localStorage.getItem('theme') || 'light';

    // Save user data and current theme to localStorage
    localStorage.setItem('userData', JSON.stringify({ name, email, theme: currentTheme }));

    // Update the display with user info
    updateUserInfo(name, email);
});

// Back to Home button functionality
document.getElementById('backToHome').addEventListener('click', () => {
    window.location.href = 'index.html'; // Replace with your home page URL
});
