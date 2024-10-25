document.addEventListener('DOMContentLoaded', function() {
  const convertBtn = document.getElementById('convert-btn');
  const resultDiv = document.getElementById('result');

  convertBtn.addEventListener('click', async function(e) {
    e.preventDefault();
    const videoURL = document.getElementById('videoURL').value;
    
    let uniqueID;
    if (videoURL.includes("youtu.be")) {
      uniqueID = (videoURL.match(/youtu\.be\/([^?&]+)/) || [, null])[1];
    } else {
      uniqueID = (videoURL.match(/[?&]v=([^&]*)/) || [, null])[1];
    }

    if (!uniqueID) {
      resultDiv.innerHTML = '<div class="errors"><p>Please enter a valid YouTube URL</p></div>';
      return;
    }

    resultDiv.innerHTML = '<p>Converting... Please wait.</p>';

    try {
      const response = await fetch(`https://youtube-mp36.p.rapidapi.com/dl?id=${uniqueID}`, {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': 'e6b0594a2fmshb75a94081e3d287p1bd64ejsnb9a2c59678c6',
          'X-RapidAPI-Host': 'youtube-mp36.p.rapidapi.com'
        }
      });

      const data = await response.json();

      if (data.status === 'ok') {
        resultDiv.innerHTML = `
          <div class="success">
            <h3><b><p>${data.title}</p></b></h3>
            <b><a href="${data.link}" target="_blank"><button id="download-btn">Download</button></a></b>
          </div>
        `;
      } else {
        resultDiv.innerHTML = `<div class="errors"><p>${data.msg}</p></div>`;
      }
    } catch (error) {
      resultDiv.innerHTML = '<div class="errors"><p>An error occurred. Please try again.</p></div>';
      console.error('Error:', error);
    }
  });
});
