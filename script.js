// Global variable to store the JSON data
let data = {};

// Fetch the JSON file
fetch('data.json')
  .then(response => response.json())
  .then(jsonData => {
    data = jsonData; // Store the data globally
    updateSearchInputs();
  })
  .catch(err => console.error('Failed to load JSON:', err));

  function showModal(title, message, type) {
    // Create modal
    const modal = document.createElement('div');
    modal.classList.add('modal');
    modal.style.display = 'block';
  
    const modalContent = document.createElement('div');
    modalContent.classList.add('modal-content');
  
    // Add title
    const modalHeader = document.createElement('div');
    modalHeader.classList.add('modal-header');
    modalHeader.textContent = title;
  
    // Add message body
    const modalBody = document.createElement('div');
    modalBody.classList.add('modal-body');
    modalBody.textContent = message;
  
    // Add footer with close button
    const modalFooter = document.createElement('div');
    modalFooter.classList.add('modal-footer');
  
    const closeButton = document.createElement('button');
    closeButton.textContent = 'Close';
    closeButton.addEventListener('click', () => {
      modal.style.display = 'none';
    });
  
    modalFooter.appendChild(closeButton);
    modalContent.appendChild(modalHeader);
    modalContent.appendChild(modalBody);
    modalContent.appendChild(modalFooter);
  
    modal.appendChild(modalContent);
    document.body.appendChild(modal);
  
    // Change modal appearance based on success/error
    if (type === 'error') {
      modalContent.style.backgroundColor = '#f44336'; // Red for error
    } else if (type === 'success') {
      modalContent.style.backgroundColor = '#4CAF50'; // Green for success
    }
  }

// Update the search inputs dynamically based on the selected category
function updateSearchInputs() {
  const category = document.getElementById('category').value;
  const dynamicInputs = document.getElementById('dynamic-inputs');
  
  dynamicInputs.innerHTML = ''; // Clear previous inputs

  if (category === 'currencies') {
    const searchKeys = [
      { key: 'Date of release', label: 'Release Date', type: 'dropdown' },
      { key: 'Serial Number', label: 'Serial Number', type: 'text' } // Text input for manual entry
    ];

    searchKeys.forEach(item => {
      const label = document.createElement('label');
      label.htmlFor = item.key;
      label.textContent = item.label;

      let input;

      if (item.type === 'dropdown') {
        input = document.createElement('select');
        input.id = item.key;
        input.innerHTML = `<option value="">Select ${item.label}</option>`; // Default option

        // Populate dropdown options from JSON database
        const uniqueValues = [...new Set(data.currencies.map(currency => currency[item.key]))];
        uniqueValues.forEach(value => {
          const option = document.createElement('option');
          option.value = value;
          option.textContent = value;
          input.appendChild(option);
        });
      } else if (item.type === 'text') {
        input = document.createElement('input');
        input.type = 'text';
        input.id = item.key;
        input.placeholder = `Enter ${item.label}`;
      }

      dynamicInputs.appendChild(label);
      dynamicInputs.appendChild(input);
    });
  }

  // Handle 'rivets' category
  else if (category === 'lethaldose') {
    const searchKeys = [
      { key: 'Drug/Poison Name', label: 'Drug/Poison Name', type: 'dropdown' },
      { key: 'ld', label: 'ld', type: 'dropdown' },
      { key: 'personWeight', label: "Person's Weight (kg)", type: 'text' }, // Text input for weight
      { key: 'doseTaken', label: 'Dose Taken (mg)', type: 'text' } // Text input for dose
    ];
  
    searchKeys.forEach(item => {
      const label = document.createElement('label');
      label.htmlFor = item.key;
      label.textContent = item.label;
  
      let input;
  
      if (item.type === 'dropdown') {
        input = document.createElement('select');
        input.id = item.key;
        input.innerHTML = `<option value="">Select ${item.label}</option>`; // Default option
  
        // Populate dropdown options from JSON database
        const uniqueValues = [...new Set(data.lethaldose.map(rivet => rivet[item.key]))];
        uniqueValues.forEach(value => {
          const option = document.createElement('option');
          option.value = value;
          option.textContent = value;
          input.appendChild(option);
        });
      } else if (item.type === 'text') {
        input = document.createElement('input');
        input.type = 'number';
        input.id = item.key;
        input.placeholder = `Enter ${item.label}`;
      }
  
      dynamicInputs.appendChild(label);
      dynamicInputs.appendChild(input);
    });
  
    // Add a button to calculate lethal dose
    const calcButton = document.createElement('button');
    calcButton.textContent = 'Check if Dose is Lethal';
    calcButton.addEventListener('click', () => {
      const lethalDose = parseFloat(document.getElementById('ld').value);
      const personWeight = parseFloat(document.getElementById('personWeight').value);
      const doseTaken = parseFloat(document.getElementById('doseTaken').value);
  
      if (isNaN(lethalDose) || isNaN(personWeight) || isNaN(doseTaken)) {
        showModal('Error', 'Please enter valid values for all fields.', 'error');
        return;
      }
  
      // Calculate lethal dose threshold
      const lethalThreshold = lethalDose * personWeight;
  
      // Check if the dose taken is lethal
      const isLethal = doseTaken >= lethalThreshold;
  
      // Display result in modal
      const resultText = isLethal
        ? 'The dose taken is lethal!'
        : 'The dose taken is not lethal.';
  
      showModal('Lethal Dose Check', resultText, isLethal ? 'error' : 'success');
    });
  
    dynamicInputs.appendChild(calcButton);
  }
      
  // Handle 'rivetMaterial' category
  else if (category === 'drugidentification') {
    const searchKeys = [
      { key: 'Name', label: 'Name', type: 'dropdown' },
      { key: 'Colour', label: 'Colour', type: 'dropdown' },
      { key: 'Type', label: 'Type', type: 'dropdown' },
      { key: 'Size', label: 'Size', type: 'dropdown' },
      { key: 'Imprint', label: 'Imprint', type: 'dropdown' }
    ];

    searchKeys.forEach(item => {
      const label = document.createElement('label');
      label.htmlFor = item.key;
      label.textContent = item.label;

      const select = document.createElement('select');
      select.id = item.key;
      select.innerHTML = `<option value="">Select ${item.label}</option>`; // Default option

      // Populate dropdown options from JSON database
      const uniqueValues = [...new Set(data.drugidentification.map(material => material[item.key]))];
      uniqueValues.forEach(value => {
        const option = document.createElement('option');
        option.value = value;
        option.textContent = value;
        select.appendChild(option);
      });

      dynamicInputs.appendChild(label);
      dynamicInputs.appendChild(select);
    });
  }
  else if (category === 'Weapons') {
    const searchKeys = [
      { key: 'Weapon Name', label: 'Weapon Name', type: 'dropdown' },
    ];

    searchKeys.forEach(item => {
      const label = document.createElement('label');
      label.htmlFor = item.key;
      label.textContent = item.label;

      const select = document.createElement('select');
      select.id = item.key;
      select.innerHTML = `<option value="">Select ${item.label}</option>`; // Default option

      // Populate dropdown options from JSON database
      const uniqueValues = [...new Set(data.Weapons.map(material => material[item.key]))];
      uniqueValues.forEach(value => {
        const option = document.createElement('option');
        option.value = value;
        option.textContent = value;
        select.appendChild(option);
      });

      dynamicInputs.appendChild(label);
      dynamicInputs.appendChild(select);
    });
  }
  else if (category === 'pens') {
    const searchKeys = [
      { key: 'Identification Reaction', label: 'Identification Reaction', type: 'dropdown' },
    ];

    searchKeys.forEach(item => {
      const label = document.createElement('label');
      label.htmlFor = item.key;
      label.textContent = item.label;

      const select = document.createElement('select');
      select.id = item.key;
      select.innerHTML = `<option value="">Select ${item.label}</option>`; // Default option

      // Populate dropdown options from JSON database
      const uniqueValues = [...new Set(data.pens.map(material => material[item.key]))];
      uniqueValues.forEach(value => {
        const option = document.createElement('option');
        option.value = value;
        option.textContent = value;
        select.appendChild(option);
      });

      dynamicInputs.appendChild(label);
      dynamicInputs.appendChild(select);
    });
  }
}

function performSearch() {
  const category = document.getElementById('category').value;
  const inputs = document.querySelectorAll('#dynamic-inputs select, #dynamic-inputs input');
  
  let searchParams = {};

  // Collect the selected values from all the search fields
  inputs.forEach(input => {
    searchParams[input.id] = input.value;
  });

  let result = [];

  // Search through the data based on the selected values
  if (category === 'currencies') {
    result = data.currencies.filter(currency => {
      return Object.keys(searchParams).every(key => {
        return !searchParams[key] || currency[key] === searchParams[key];
      });
    });
  } else if (category === 'lethaldose') {
    result = data.lethaldose.filter(rivet => {
      return Object.keys(searchParams).every(key => {
        return !searchParams[key] || rivet[key] === searchParams[key];
      });
    });
  } else if (category === 'drugidentification') {
    result = data.drugidentification.filter(material => {
      return Object.keys(searchParams).every(key => {
        return !searchParams[key] || material[key] === searchParams[key];
      });
    });
  }
   else if (category === 'Weapons') {
    result = data.Weapons.filter(material => {
      return Object.keys(searchParams).every(key => {
        return !searchParams[key] || material[key] === searchParams[key];
      });
    });
  }
   else if (category === 'pens') {
    result = data.pens.filter(material => {
      return Object.keys(searchParams).every(key => {
        return !searchParams[key] || material[key] === searchParams[key];
      });
    });
  }

  // Display result in the UI
  displayResults(result,category);
}

// Function to display the search results in a beautiful format
function displayResults(results, category) {
  const resultContent = document.getElementById('result-content');
  resultContent.innerHTML = ''; // Clear previous results
  const resultDiv = document.createElement('div');
  resultDiv.classList.add('results-container');

  if (results.length === 0) {
    resultContent.innerHTML = `<div class="no-results">No results found</div>`;
    return;
  }

  if (category === 'currencies') {
    results.forEach(result => {
      const messageDiv = document.createElement('div');
      messageDiv.classList.add('message');

      // If the result has an image, display it
      if (result.img) {
        const imgElement = document.createElement('img');
        imgElement.src = result.img;
        imgElement.alt = result.place || 'Currency Image';
        imgElement.classList.add('result-image');
        messageDiv.appendChild(imgElement);
      }

      // Display message and place
      messageDiv.innerHTML += `<strong>Message:</strong> ${result.msg || 'N/A'}<br>
                                <strong>Place:</strong> ${result.place || 'N/A'}`;
      resultDiv.appendChild(messageDiv);
    });
  } else {
    results.forEach(result => {
      const itemDiv = document.createElement('div');
      itemDiv.classList.add('result-item');

      // If the result has an image, display it
      if (result.img) {
        const imgElement = document.createElement('img');
        imgElement.src = result.img;
        imgElement.alt = result.name || 'Image';
        imgElement.classList.add('result-image');
        itemDiv.appendChild(imgElement);
      }

      // Display other properties of the result
      for (let key in result) {
        if (result.hasOwnProperty(key) && key !== 'img') {
          const fieldDiv = document.createElement('div');
          fieldDiv.innerHTML = `<span class="label">${key}:</span> ${result[key]}`;
          itemDiv.appendChild(fieldDiv);
        }
      }

      resultDiv.appendChild(itemDiv);
    });
  }

  resultContent.appendChild(resultDiv);
}
