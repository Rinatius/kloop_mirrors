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