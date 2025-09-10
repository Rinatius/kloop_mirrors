function convertUrl() {
    const urlInput = document.getElementById('urlInput');
    const resultDiv = document.getElementById('result');
    const errorDiv = document.getElementById('error');
    const mirrorLink = document.getElementById('mirrorLink');
    const errorMessage = document.getElementById('errorMessage');
    
    // Hide previous results
    resultDiv.style.display = 'none';
    errorDiv.style.display = 'none';
    
    const inputUrl = urlInput.value.trim();
    
    // Validate input
    if (!inputUrl) {
        showError('Пожалуйста, введите URL');
        return;
    }
    
    // Check if it's a valid kloop URL
    if (!inputUrl.includes('kloop.kg') && !inputUrl.includes('ky.kloop.asia')) {
        showError('URL должен быть с сайта kloop.kg или ky.kloop.asia');
        return;
    }
    
    try {
        const url = new URL(inputUrl);
        
        // Validate domain
        if (url.hostname !== 'kloop.kg' && url.hostname !== 'ky.kloop.asia') {
            showError('URL должен быть с домена kloop.kg или ky.kloop.asia');
            return;
        }
        
        // Convert URL to mirror format
        const mirrorUrl = convertToMirror(inputUrl);
        
        if (mirrorUrl) {
            showResult(mirrorUrl, inputUrl);
            // Clear input field for next use
            urlInput.value = '';
        } else {
            showError('Не удалось преобразовать URL');
        }
        
    } catch (e) {
        showError('Неверный формат URL');
    }
}

function convertToMirror(originalUrl) {
    try {
        // Remove protocol (https://)
        let path = originalUrl.replace(/^https?:\/\//, '');
        
        // Split into domain and path parts
        let parts = path.split('/');
        let domain = parts[0]; // 'kloop.kg'
        let pathParts = parts.slice(1); // ['blog', '2025', '08', '28', '...']
        
        // Join path parts with hyphens, keeping domain separate
        let mirrorPath = domain + '/' + pathParts.join('-');
        
        // Remove any trailing hyphen and add .html
        mirrorPath = mirrorPath.replace(/-$/, '') + '.html';
        
        // Construct mirror URL
        const mirrorUrl = 'https://storage.googleapis.com/qurium/' + mirrorPath;
        
        return mirrorUrl;
    } catch (e) {
        return null;
    }
}

function showResult(mirrorUrl, originalUrl) {
    const resultDiv = document.getElementById('result');
    const mirrorLink = document.getElementById('mirrorLink');
    const originalUrlDiv = document.getElementById('originalUrl');
    
    mirrorLink.href = mirrorUrl;
    mirrorLink.textContent = mirrorUrl;
    originalUrlDiv.textContent = 'Исходная ссылка: ' + originalUrl;
    resultDiv.style.display = 'block';
}

function showError(message) {
    const errorDiv = document.getElementById('error');
    const errorMessage = document.getElementById('errorMessage');
    
    errorMessage.textContent = message;
    errorDiv.style.display = 'block';
}

// Allow Enter key to trigger conversion
document.getElementById('urlInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        convertUrl();
    }
});

// Clear results when input changes
document.getElementById('urlInput').addEventListener('input', function() {
    document.getElementById('result').style.display = 'none';
    document.getElementById('error').style.display = 'none';
});

// Copy to clipboard function
function copyToClipboard() {
    const mirrorLink = document.getElementById('mirrorLink');
    const copyBtn = document.getElementById('copyBtn');
    
    if (mirrorLink && mirrorLink.href) {
        // Use modern clipboard API
        navigator.clipboard.writeText(mirrorLink.href).then(function() {
            // Show success feedback
            copyBtn.classList.add('copied');
            copyBtn.innerHTML = '<svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.061L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z"/></svg>';
            
            // Reset after 2 seconds
            setTimeout(function() {
                copyBtn.classList.remove('copied');
                copyBtn.innerHTML = '<svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z"/><path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z"/></svg>';
            }, 2000);
        }).catch(function(err) {
            // Fallback for older browsers
            console.error('Failed to copy: ', err);
        });
    }
}