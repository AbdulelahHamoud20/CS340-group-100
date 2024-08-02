document.addEventListener('DOMContentLoaded', function() {
    populateSportOptions();
});

function showAddForm() {
    document.getElementById('formContainer').style.display = 'block';
    document.getElementById('formTitle').innerText = 'Add Team';
    document.getElementById('teamID').value = '';
    document.getElementById('teamName').value = '';
    document.getElementById('teamCoach').value = '';
    document.getElementById('sportID').value = '';
}

function showEditForm(button) {
    var row = button.parentNode.parentNode;
    var cells = row.getElementsByTagName('td');
    
    document.getElementById('formContainer').style.display = 'block';
    document.getElementById('formTitle').innerText = 'Edit Team';
    document.getElementById('teamID').value = cells[1].innerText;
    document.getElementById('teamName').value = cells[2].innerText;
    document.getElementById('teamCoach').value = cells[3].innerText;
    document.getElementById('sportID').value = cells[4].innerText;
}

function hideForm() {
    document.getElementById('formContainer').style.display = 'none';
}

function submitForm(event) {
    event.preventDefault();
    var teamID = document.getElementById('teamID').value;
    var teamName = document.getElementById('teamName').value;
    var teamCoach = document.getElementById('teamCoach').value;
    var sportID = document.getElementById('sportID').value;

    if (teamID === '') {
        // Add new team
        var newRow = document.createElement('tr');
        var rowCount = document.getElementById('teamsTable').rows.length;
        newRow.innerHTML = `
            <td>
                <button class="edit-btn" onclick="showEditForm(this)">Edit</button>
                <button class="delete-btn" onclick="deleteRow(this)">Delete</button>
            </td>
            <td>${rowCount}</td>
            <td>${teamName}</td>
            <td>${teamCoach}</td>
            <td>${sportID}</td>
        `;
        document.getElementById('teamsTable').appendChild(newRow);
    } else {
        // Edit existing team
        var rows = document.getElementById('teamsTable').getElementsByTagName('tr');
        for (var i = 1; i < rows.length; i++) {
            var cells = rows[i].getElementsByTagName('td');
            if (cells[1].innerText == teamID) {
                cells[2].innerText = teamName;
                cells[3].innerText = teamCoach;
                cells[4].innerText = sportID;
                break;
            }
        }
    }

    hideForm();
}

function deleteRow(button) {
    if (confirm('Are you sure you want to delete this team?')) {
        var row = button.parentNode.parentNode;
        row.parentNode.removeChild(row);
    }
}

function searchTeam() {
    var searchValue = document.getElementById('searchInput').value.toLowerCase();
    var table = document.getElementById('teamsTable');
    var rows = table.getElementsByTagName('tr');

    for (var i = 1; i < rows.length; i++) {
        var cells = rows[i].getElementsByTagName('td');
        var teamName = cells[2].innerText.toLowerCase();

        if (teamName.includes(searchValue)) {
            rows[i].style.display = '';
        } else {
            rows[i].style.display = 'none';
        }
    }
}

function populateSportOptions() {
    // Example function to populate sport options
    var sportSelect = document.getElementById('sportID');
    sportSelect.innerHTML = `
        <option value="1">Football</option>
        <option value="2">Soccer</option>
        <option value="3">Basketball</option>
        <option value="4">Baseball</option>
        <option value="5">Hockey</option>
    `;
}
