document.addEventListener('DOMContentLoaded', function() {
    // Populate any necessary data if needed
});

function showAddForm() {
    document.getElementById('formContainer').style.display = 'block';
    document.getElementById('formTitle').innerText = 'Add Event';
    document.getElementById('eventID').value = '';
    document.getElementById('eventName').value = '';
    document.getElementById('eventDate').value = '';
    document.getElementById('venueID').value = '';
    document.getElementById('sportID').value = '';
    document.getElementById('eventScore').value = '';
    document.getElementById('leagueID').value = '';
    document.getElementById('ticketPrice').value = '';
}

function showEditForm(button) {
    var row = button.parentNode.parentNode;
    var cells = row.getElementsByTagName('td');
    
    document.getElementById('formContainer').style.display = 'block';
    document.getElementById('formTitle').innerText = 'Edit Event';
    document.getElementById('eventID').value = cells[1].innerText;
    document.getElementById('eventName').value = cells[2].innerText;
    document.getElementById('eventDate').value = new Date(cells[3].innerText).toISOString().slice(0,16);
    document.getElementById('venueID').value = cells[4].innerText;
    document.getElementById('sportID').value = cells[5].innerText;
    document.getElementById('eventScore').value = cells[6].innerText;
    document.getElementById('leagueID').value = cells[7].innerText;
    document.getElementById('ticketPrice').value = cells[8].innerText;
}

function hideForm() {
    document.getElementById('formContainer').style.display = 'none';
}

function submitForm(event) {
    event.preventDefault();
    var eventID = document.getElementById('eventID').value;
    var eventName = document.getElementById('eventName').value;
    var eventDate = document.getElementById('eventDate').value;
    var venueID = document.getElementById('venueID').value;
    var sportID = document.getElementById('sportID').value;
    var eventScore = document.getElementById('eventScore').value;
    var leagueID = document.getElementById('leagueID').value;
    var ticketPrice = document.getElementById('ticketPrice').value;

    if (eventID === '') {
        // Add new event
        var newRow = document.createElement('tr');
        var rowCount = document.getElementById('eventsTable').rows.length;
        newRow.innerHTML = `
            <td>
                <button class="edit-btn" onclick="showEditForm(this)">Edit</button>
                <button class="delete-btn" onclick="deleteRow(this)">Delete</button>
            </td>
            <td>${rowCount}</td>
            <td>${eventName}</td>
            <td>${eventDate}</td>
            <td>${venueID}</td>
            <td>${sportID}</td>
            <td>${eventScore}</td>
            <td>${leagueID}</td>
            <td>${ticketPrice}</td>
        `;
        document.getElementById('eventsTable').appendChild(newRow);
    } else {
        // Edit existing event
        var rows = document.getElementById('eventsTable').rows;
        for (var i = 1; i < rows.length; i++) {
            var cells = rows[i].getElementsByTagName('td');
            if (cells[1].innerText === eventID) {
                cells[2].innerText = eventName;
                cells[3].innerText = eventDate;
                cells[4].innerText = venueID;
                cells[5].innerText = sportID;
                cells[6].innerText = eventScore;
                cells[7].innerText = leagueID;
                cells[8].innerText = ticketPrice;
                break;
            }
        }
    }
    hideForm();
}

function deleteRow(button) {
    if (confirm('Are you sure you want to delete this event?')) {
        var row = button.parentNode.parentNode;
        row.parentNode.removeChild(row);
    }
}

function searchEvent() {
    var input = document.getElementById('searchInput').value.toLowerCase();
    var rows = document.getElementById('eventsTable').rows;

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
