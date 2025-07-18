function fetchGitHubFile(url) {
    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.text();
      })
      .then(data => {
        console.log('File content:', data);
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
      });
  }
  
  fetchGitHubFile('https://raw.githubusercontent.com/pBielli/bookmarklet/includes/logo.txt');