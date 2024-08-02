document.addEventListener('DOMContentLoaded', function() {
    // Initialize or load any necessary data
});

function showAddForm() {
    document.getElementById('formContainer').style.display = 'block';
    document.getElementById('formTitle').innerText = 'Add League';
    document.getElementById('leagueID').value = '';
    document.getElementById('leagueName').value = '';
    document.getElementById('yearFounded').value = '';
    document.getElementById('commissioner').value = '';
    document.getElementById('sportID').value = '';
}

function showEditForm(button) {
    var row = button.parentNode.parentNode;
    var cells = row.getElementsByTagName('td');
    
    document.getElementById('formContainer').style.display = 'block';
    document.getElementById('formTitle').innerText = 'Edit League';
    document.getElementById('leagueID').value = cells[1].innerText;
    document.getElementById('leagueName').value = cells[2].innerText;
    document.getElementById('yearFounded').value = cells[3].innerText;
    document.getElementById('commissioner').value = cells[4].innerText;
    document.getElementById('sportID').value = cells[5].innerText;
}

function hideForm() {
    document.getElementById('formContainer').style.display = 'none';
}

function submitForm(event) {
    event.preventDefault();
    var leagueID = document.getElementById('leagueID').value;
    var leagueName = document.getElementById('leagueName').value;
    var yearFounded = document.getElementById('yearFounded').value;
    var commissioner = document.getElementById('commissioner').value;
    var sportID = document.getElementById('sportID').value;

    if (leagueID === '') {
        // Add new league
        var newRow = document.createElement('tr');
        var rowCount = document.getElementById('leaguesTable').rows.length;
        newRow.innerHTML = `
            <td>
                <button class="edit-btn" onclick="showEditForm(this)">Edit</button>
                <button class="delete-btn" onclick="deleteRow(this)">Delete</button>
            </td>
            <td>${rowCount}</td>
            <td>${leagueName}</td>
            <td>${yearFounded}</td>
            <td>${commissioner}</td>
            <td>${sportID}</td>
        `;
        document.getElementById('leaguesTable').appendChild(newRow);
    } else {
        // Edit existing league
        var rows = document.getElementById('leaguesTable').rows;
        for (var i = 1; i < rows.length; i++) {
            var cells = rows[i].getElementsByTagName('td');
            if (cells[1].innerText === leagueID) {
                cells[2].innerText = leagueName;
                cells[3].innerText = yearFounded;
                cells[4].innerText = commissioner;
                cells[5].innerText = sportID;
                break;
            }
        }
    }
    hideForm();
}

function deleteRow(button) {
    if (confirm('Are you sure you want to delete this league?')) {
        var row = button.parentNode.parentNode;
        row.parentNode.removeChild(row);
    }
}

function searchLeague() {
    var input = document.getElementById('searchInput').value.toLowerCase();
    var rows = document.getElementById('leaguesTable').rows;

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
