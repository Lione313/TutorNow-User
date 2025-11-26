// Check if user is logged in
function checkAuth() {
    const currentUser = localStorage.getItem('currentUser');
    
    if (!currentUser) {
        // Redirect to login if not authenticated
        window.location.href = 'login.html';
        return null;
    }
    
    return JSON.parse(currentUser);
}

// Load user data on page load
document.addEventListener('DOMContentLoaded', function() {
    const user = checkAuth();
    
    if (user) {
        // Update UI with user data
        const userNameElements = document.querySelectorAll('#userName, #welcomeName, #profileName');
        userNameElements.forEach(el => {
            if (el) el.textContent = user.name;
        });
        
        const userEmailElements = document.querySelectorAll('#profileEmail');
        userEmailElements.forEach(el => {
            if (el) el.textContent = user.email;
        });
        
        // Update credits
        const creditElements = document.querySelectorAll('#creditBalance');
        creditElements.forEach(el => {
            if (el) el.textContent = user.creditos || 50;
        });
        
        // Update profile initials
        const initialsElement = document.getElementById('profileInitials');
        if (initialsElement && user.name) {
            const names = user.name.split(' ');
            const initials = names.map(n => n[0]).join('').substring(0, 2).toUpperCase();
            initialsElement.textContent = initials;
        }
    }
});

// Logout functionality
const logoutBtns = document.querySelectorAll('#logoutBtn');
logoutBtns.forEach(btn => {
    btn.addEventListener('click', function(e) {
        e.preventDefault();
        
        if (confirm('¿Estás seguro que deseas cerrar sesión?')) {
            localStorage.removeItem('currentUser');
            window.location.href = 'login.html';
        }
    });
});

// Profile form submit
const profileForm = document.getElementById('profileForm');
if (profileForm) {
    profileForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const user = JSON.parse(localStorage.getItem('currentUser'));
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        
        // Update user data
        user.name = document.getElementById('fullName').value;
        user.ciclo = document.getElementById('ciclo').value;
        user.area = document.getElementById('areaInteres').value;
        
        // Update in users array
        const userIndex = users.findIndex(u => u.id === user.id);
        if (userIndex !== -1) {
            users[userIndex] = user;
            localStorage.setItem('users', JSON.stringify(users));
        }
        
        // Update current user
        localStorage.setItem('currentUser', JSON.stringify(user));
        
        alert('Perfil actualizado correctamente');
        location.reload();
    });
}