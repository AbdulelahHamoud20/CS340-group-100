
function searchVenue() {
    var searchValue = document.getElementById('searchInput').value.toLowerCase();
    var table = document.getElementById('venuesTable');
    var rows = table.getElementsByTagName('tr');

    for (var i = 1; i < rows.length; i++) {
        var cells = rows[i].getElementsByTagName('td');
        var venueName = cells[2].innerText.toLowerCase();

        if (venueName.includes(searchValue)) {
            rows[i].style.display = '';
        } else {
            rows[i].style.display = 'none';
        }
    }
}

function showAddForm() {
    document.getElementById('formTitle').innerText = 'Add Venue';
    document.getElementById('venueID').value = '';
    document.getElementById('venueName').value = '';
    document.getElementById('venueCountry').value = '';
    document.getElementById('venueState').value = '';
    document.getElementById('venueCity').value = '';
    document.getElementById('venueCapacity').value = '';
    document.getElementById('formContainer').style.display = 'block';
}

function showEditForm(button) {
    var row = button.parentNode.parentNode;
    var cells = row.getElementsByTagName('td');

    document.getElementById('formTitle').innerText = 'Edit Venue';
    document.getElementById('venueID').value = cells[1].innerText;
    document.getElementById('venueName').value = cells[2].innerText;
    document.getElementById('venueCountry').value = cells[3].innerText;
    document.getElementById('venueState').value = cells[4].innerText;
    document.getElementById('venueCity').value = cells[5].innerText;
    document.getElementById('venueCapacity').value = cells[6].innerText;
    document.getElementById('formContainer').style.display = 'block';
}

function submitForm(event) {
    event.preventDefault();
    var venueID = document.getElementById('venueID').value;
    var venueName = document.getElementById('venueName').value;
    var venueCountry = document.getElementById('venueCountry').value;
    var venueState = document.getElementById('venueState').value;
    var venueCity = document.getElementById('venueCity').value;
    var venueCapacity = document.getElementById('venueCapacity').value;

    if (venueID) {
        // Edit existing venue
        var rows = document.getElementById('venuesTable').getElementsByTagName('tr');
        for (var i = 1; i < rows.length; i++) {
            if (rows[i].getElementsByTagName('td')[1].innerText === venueID) {
                rows[i].getElementsByTagName('td')[2].innerText = venueName;
                rows[i].getElementsByTagName('td')[3].innerText = venueCountry;
                rows[i].getElementsByTagName('td')[4].innerText = venueState;
                rows[i].getElementsByTagName('td')[5].innerText = venueCity;
                rows[i].getElementsByTagName('td')[6].innerText = venueCapacity;
                break;
            }
        }
    } else {
        // Add new venue
        var newRow = document.createElement('tr');
        var rowCount = document.getElementById('venuesTable').rows.length;
        newRow.innerHTML = `
            <td>
                <button class="edit-btn" onclick="showEditForm(this)">Edit</button>
                <button class="delete-btn" onclick="deleteRow(this)">Delete</button>
            </td>
            <td>${rowCount}</td>
            <td>${venueName}</td>
            <td>${venueCountry}</td>
            <td>${venueState}</td>
            <td>${venueCity}</td>
            <td>${venueCapacity}</td>
        `;
        document.getElementById('venuesTable').appendChild(newRow);
    }

    document.getElementById('formContainer').style.display = 'none';
}

function deleteRow(button) {
    if (confirm('Are you sure you want to delete this venue?')) {
        var row = button.parentNode.parentNode;
        row.parentNode.removeChild(row);
    }
}


