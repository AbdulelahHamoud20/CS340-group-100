document.addEventListener('DOMContentLoaded', function() {
    // Initialize or load any necessary data
});

function showAddForm() {
    document.getElementById('formContainer').style.display = 'block';
    document.getElementById('formTitle').innerText = 'Add Service';
    document.getElementById('serviceID').value = '';
    document.getElementById('serviceName').value = '';
    document.getElementById('serviceDescription').value = '';
}

function showEditForm(button) {
    var row = button.parentNode.parentNode;
    var cells = row.getElementsByTagName('td');
    
    document.getElementById('formContainer').style.display = 'block';
    document.getElementById('formTitle').innerText = 'Edit Service';
    document.getElementById('serviceID').value = cells[1].innerText;
    document.getElementById('serviceName').value = cells[2].innerText;
    document.getElementById('serviceDescription').value = cells[3].innerText;
}

function hideForm() {
    document.getElementById('formContainer').style.display = 'none';
}

function submitForm(event) {
    event.preventDefault();
    var serviceID = document.getElementById('serviceID').value;
    var serviceName = document.getElementById('serviceName').value;
    var serviceDescription = document.getElementById('serviceDescription').value;

    if (serviceID === '') {
        // Add new service
        var newRow = document.createElement('tr');
        var rowCount = document.getElementById('streamingServicesTable').rows.length;
        newRow.innerHTML = `
            <td>
                <button class="edit-btn" onclick="showEditForm(this)">Edit</button>
                <button class="delete-btn" onclick="deleteRow(this)">Delete</button>
            </td>
            <td>${rowCount}</td>
            <td>${serviceName}</td>
            <td>${serviceDescription}</td>
        `;
        document.getElementById('streamingServicesTable').appendChild(newRow);
    } else {
        // Edit existing service
        var rows = document.getElementById('streamingServicesTable').rows;
        for (var i = 1; i < rows.length; i++) {
            var cells = rows[i].getElementsByTagName('td');
            if (cells[1].innerText === serviceID) {
                cells[2].innerText = serviceName;
                cells[3].innerText = serviceDescription;
                break;
            }
        }
    }
    hideForm();
}

function deleteRow(button) {
    if (confirm('Are you sure you want to delete this service?')) {
        var row = button.parentNode.parentNode;
        row.parentNode.removeChild(row);
    }
}

function searchService() {
    var input = document.getElementById('searchInput').value.toLowerCase();
    var rows = document.getElementById('streamingServicesTable').rows;

    for (var i = 1; i < rows.length; i++) {
        var cells = rows[i].getElementsByTagName('td');
        var match = false;

        for (var j = 1; j < cells.length; j++) {
            if (cells[j].innerText.toLowerCase().includes(input)) {
                match = true;
                break;
            }
        }

        rows[i].style.display = match ? '' : 'none';
    }
}
