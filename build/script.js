let data = [];

// Load JSON data
fetch('build/data.json')
    .then(response => response.json())
    .then(jsonData => {
        data = jsonData;
        console.log(data); // Debugging output
    })
    .catch(error => {
        console.error('Error loading JSON data:', error);
    });

function queryDisease() {
    const metabolite = document.getElementById('metabolite').value.trim().toLowerCase();
    const modalResultsDiv = document.getElementById('modal-results');
    const modal = document.getElementById('myModal');

    modalResultsDiv.innerHTML = ''; // Clear previous results

    if (!metabolite) {
        modalResultsDiv.innerHTML = 'Please enter a metabolite.';
        modal.style.display = "block";
        return;
    }

    // Find associated diseases
    const results = data.filter(item => item.metabolite && item.metabolite.toLowerCase() === metabolite);

    if (results.length > 0) {
        const output = results.map(item => `${item.disease} (Score: ${item.score})`).join('<br>');
        modalResultsDiv.innerHTML = 'Diseases:<br>' + output;
    } else {
        modalResultsDiv.innerHTML = 'No diseases found for this metabolite.';
    }
    modal.style.display = "block"; // Show modal
}

function clearInput() {
    document.getElementById('metabolite').value = '';
    closeModal();
}

function closeModal() {
    document.getElementById('myModal').style.display = "none";
}

// Close modal on click
window.onclick = function(event) {
    const modal = document.getElementById('myModal');
    if (event.target == modal) {
        closeModal();
    }
}