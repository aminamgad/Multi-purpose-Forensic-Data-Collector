// Global variable to store the JSON data
let data = {};

// Fetch the JSON file
fetch('data.json')
  .then(response => response.json())
  .then(jsonData => {
    data = jsonData; // Store the data globally
    updateSearchInputs(); // Generate input fields after data is loaded
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
      { key: 'denomination', label: 'Denomination of Currency', type: 'dropdown' },
      { key: 'releaseDate', label: 'Release Date', type: 'dropdown' },
      { key: 'serialNumber', label: 'Serial Number', type: 'text' } // Text input for manual entry
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
  else if (category === 'rivets') {
    const searchKeys = [
      { key: 'rivetPoison', label: 'Rivet Poison', type: 'dropdown' },
      { key: 'lethalDose', label: 'Lethal Dose (mg/kg)', type: 'dropdown' },
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
        const uniqueValues = [...new Set(data.rivets.map(rivet => rivet[item.key]))];
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
      const lethalDose = parseFloat(document.getElementById('lethalDose').value);
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
  else if (category === 'rivetMaterial') {
    const searchKeys = [
      { key: 'pillType', label: 'Pill Type (Pill or Capsule)', type: 'dropdown' },
      { key: 'shape', label: 'Shape', type: 'dropdown' },
      { key: 'color', label: 'Color', type: 'dropdown' },
      { key: 'size', label: 'Size', type: 'dropdown' },
      { key: 'printing', label: 'Printing or Shapes on Pill', type: 'dropdown' }
    ];

    searchKeys.forEach(item => {
      const label = document.createElement('label');
      label.htmlFor = item.key;
      label.textContent = item.label;

      const select = document.createElement('select');
      select.id = item.key;
      select.innerHTML = `<option value="">Select ${item.label}</option>`; // Default option

      // Populate dropdown options from JSON database
      const uniqueValues = [...new Set(data.rivetMaterials.map(material => material[item.key]))];
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
      { key: 'Type', label: 'Type', type: 'dropdown' },
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

// Perform search based on selected input
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
  } else if (category === 'rivets') {
    result = data.rivets.filter(rivet => {
      return Object.keys(searchParams).every(key => {
        return !searchParams[key] || rivet[key] === searchParams[key];
      });
    });
  } else if (category === 'rivetMaterial') {
    result = data.rivetMaterials.filter(material => {
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
  displayResults(result);
}

// Function to display the search results in a beautiful format
function displayResults(results) {
  const resultContent = document.getElementById('result-content');
  resultContent.innerHTML = ''; // Clear previous results

  if (results.length === 0) {
    resultContent.innerHTML = `<div class="no-results">No results found</div>`;
    return;
  }

  // Loop through each result and display it in a card-like structure
  results.forEach(result => {
    const resultDiv = document.createElement('div');
    resultDiv.classList.add('search-result');

    for (let key in result) {
      if (result.hasOwnProperty(key)) {
        const fieldDiv = document.createElement('div');
        fieldDiv.innerHTML = `<span class="label">${key}:</span> ${result[key]}`;
        resultDiv.appendChild(fieldDiv);
      }
    }

    resultContent.appendChild(resultDiv);
  });
}
