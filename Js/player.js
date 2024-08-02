function searchPlayer() {
    var searchValue = document.getElementById('searchInput').value.toLowerCase();
    var table = document.getElementById('playersTable');
    var rows = table.getElementsByTagName('tr');

    for (var i = 1; i < rows.length; i++) {
        var cells = rows[i].getElementsByTagName('td');
        var playerName = cells[2].innerText.toLowerCase();

        if (playerName.includes(searchValue)) {
            rows[i].style.display = '';
        } else {
            rows[i].style.display = 'none';
        }
    }
}

function showAddForm() {
    document.getElementById('formTitle').innerText = 'Add Player';
    document.getElementById('playerID').value = '';
    document.getElementById('playerName').value = '';
    document.getElementById('playerPosition').value = '';
    document.getElementById('playerTeamID').value = '1';
    document.getElementById('formContainer').style.display = 'block';
}

function showEditForm(button) {
    var row = button.parentNode.parentNode;
    var cells = row.getElementsByTagName('td');

    document.getElementById('formTitle').innerText = 'Edit Player';
    document.getElementById('playerID').value = cells[1].innerText;
    document.getElementById('playerName').value = cells[2].innerText;
    document.getElementById('playerPosition').value = cells[3].innerText;
    document.getElementById('playerTeamID').value = cells[4].innerText;
    document.getElementById('formContainer').style.display = 'block';
}

function submitForm(event) {
    event.preventDefault();
    var playerID = document.getElementById('playerID').value;
    var playerName = document.getElementById('playerName').value;
    var playerPosition = document.getElementById('playerPosition').value;
    var playerTeamID = document.getElementById('playerTeamID').value;

    if (playerID) {
        // Edit existing player
        var rows = document.getElementById('playersTable').getElementsByTagName('tr');
        for (var i = 1; i < rows.length; i++) {
            if (rows[i].getElementsByTagName('td')[1].innerText === playerID) {
                rows[i].getElementsByTagName('td')[2].innerText = playerName;
                rows[i].getElementsByTagName('td')[3].innerText = playerPosition;
                rows[i].getElementsByTagName('td')[4].innerText = playerTeamID;
                break;
            }
        }
    } else {
        // Add new player
        var table = document.getElementById('playersTable').getElementsByTagName('tbody')[0];
        var newRow = table.insertRow();
        newRow.insertCell(0).innerHTML = `
            <button class="edit-btn" onclick="showEditForm(this)">Edit</button>
            <button class="delete-btn" onclick="deleteRow(this)">Delete</button>`;
        newRow.insertCell(1).innerText = table.rows.length; // Auto-increment ID
        newRow.insertCell(2).innerText = playerName;
        newRow.insertCell(3).innerText = playerPosition;
        newRow.insertCell(4).innerText = playerTeamID;
    }

    document.getElementById('formContainer').style.display = 'none';
}

function deleteRow(button) {
    if (confirm('Are you sure you want to delete this player?')) {
        var row = button.parentNode.parentNode;
        row.parentNode.removeChild(row);
    }
}