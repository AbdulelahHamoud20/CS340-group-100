document.addEventListener('DOMContentLoaded', function() {
    // Initialize or load any necessary data
});

function showAddForm() {
    document.getElementById('formContainer').style.display = 'block';
    document.getElementById('formTitle').innerText = 'Add Competing Team';
    document.getElementById('competingTeamID').value = '';
    document.getElementById('eventID').value = '';
    document.getElementById('teamID').value = '';
}

function showEditForm(button) {
    var row = button.parentNode.parentNode;
    var cells = row.getElementsByTagName('td');
    
    document.getElementById('formContainer').style.display = 'block';
    document.getElementById('formTitle').innerText = 'Edit Competing Team';
    document.getElementById('competingTeamID').value = cells[1].innerText;
    document.getElementById('eventID').value = cells[2].innerText;
    document.getElementById('teamID').value = cells[3].innerText;
}

function hideForm() {
    document.getElementById('formContainer').style.display = 'none';
}

function submitForm(event) {
    event.preventDefault();
    var competingTeamID = document.getElementById('competingTeamID').value;
    var eventID = document.getElementById('eventID').value;
    var teamID = document.getElementById('teamID').value;

    if (competingTeamID === '') {
        // Add new competing team
        var newRow = document.createElement('tr');
        var rowCount = document.getElementById('competingTeamsTable').rows.length;
        newRow.innerHTML = `
            <td>
                <button class="edit" onclick="showEditForm(this)">Edit</button>
                <button class="delete" onclick="deleteRow(this)">Delete</button>
            </td>
            <td>${rowCount}</td>
            <td>${eventID}</td>
            <td>${teamID}</td>
        `;
        document.getElementById('competingTeamsTable').appendChild(newRow);
    } else {
        // Edit existing competing team
        var rows = document.getElementById('competingTeamsTable').rows;
        for (var i = 1; i < rows.length; i++) {
            var cells = rows[i].getElementsByTagName('td');
            if (cells[1].innerText === competingTeamID) {
                cells[2].innerText = eventID;
                cells[3].innerText = teamID;
                break;
            }
        }
    }
    hideForm();
}

function deleteRow(button) {
    if (confirm('Are you sure you want to delete this competing team?')) {
        var row = button.parentNode.parentNode;
        row.parentNode.removeChild(row);
    }
}

function searchTable() {
    var input, filter, table, tr, td, i, j, txtValue;
    input = document.getElementById('searchInput');
    filter = input.value.toUpperCase();
    table = document.getElementById('competingTeamsTable');
    tr = table.getElementsByTagName('tr');

    for (i = 1; i < tr.length; i++) {
        tr[i].style.display = 'none';
        td = tr[i].getElementsByTagName('td');
        for (j = 1; j < td.length; j++) {
            if (td[j]) {
                txtValue = td[j].textContent || td[j].innerText;
                if (txtValue.toUpperCase().indexOf(filter) > -1) {
                    tr[i].style.display = '';
                    break;
                }
            }
        }
    }
}
