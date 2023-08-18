document.addEventListener('DOMContentLoaded', () => {
  const uploadForm = document.getElementById('uploadForm');
  const apiResponses = document.getElementById('apiResponses');
  const response1 = document.getElementById('response1');
  const response2 = document.getElementById('response2');
  const response3 = document.getElementById('response3');
  
  uploadForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];
    
    if (file) {
      const formData = new FormData();
      formData.append('fileInput', file);
      
      try {
        const uploadResponse = await fetch('/upload', {
          method: 'POST',
          body: formData
        });

        const uploadData = await uploadResponse.json();

        // Make API call to get responses
        const apiResponse = await fetch('/api/v1/upload', {
          method: 'POST'
        });

        const apiData = await apiResponse.json();

        // Display API responses
        response1.textContent = `Response 1: ${apiData.origialname}`;
        response2.textContent = `Response 2: ${apiData.location}`;
        response3.textContent = `Response 3: ${apiData.shortUrl}`;
        
        apiResponses.classList.remove('hidden');
      } catch (error) {
        console.error('Error:', error);
      }
    }
  });
});
