//Search a sport
function searchSport() {
    var searchValue = document.getElementById('searchInput').value.toLowerCase();
    var table = document.getElementById('sportsTable');
    var rows = table.getElementsByTagName('tr');

    for (var i = 1; i < rows.length; i++) {
        var cells = rows[i].getElementsByTagName('td');
        var sportName = cells[2].innerText.toLowerCase();

        if (sportName.includes(searchValue)) {
            rows[i].style.display = '';
        } else {
            rows[i].style.display = 'none';
        }
    }
}


function showAddForm() {
    document.getElementById('formTitle').innerText = 'Add Sport';
    document.getElementById('sportID').value = '';
    document.getElementById('sportName').value = '';
    document.getElementById('sportRulesManual').value = '';
    document.getElementById('sportDescription').value = '';
    document.getElementById('formContainer').style.display = 'block';
}

function showEditForm(button) {
    var row = button.parentNode.parentNode;
    var cells = row.getElementsByTagName('td');

    document.getElementById('formTitle').innerText = 'Edit Sport';
    document.getElementById('sportID').value = cells[1].innerText;
    document.getElementById('sportName').value = cells[2].innerText;
    document.getElementById('sportRulesManual').value = cells[3].getElementsByTagName('a')[0].href;
    document.getElementById('sportDescription').value = cells[4].innerText;
    document.getElementById('formContainer').style.display = 'block';
}

function submitForm(event) {
    event.preventDefault();
    var sportID = document.getElementById('sportID').value;
    var sportName = document.getElementById('sportName').value;
    var sportRulesManual = document.getElementById('sportRulesManual').value;
    var sportDescription = document.getElementById('sportDescription').value;

    if (sportID) {
        // Edit existing sport
        var rows = document.getElementById('sportsTable').getElementsByTagName('tr');
        for (var i = 1; i < rows.length; i++) {
            if (rows[i].getElementsByTagName('td')[1].innerText === sportID) {
                rows[i].getElementsByTagName('td')[2].innerText = sportName;
                rows[i].getElementsByTagName('td')[3].innerHTML = `<a href="${sportRulesManual}">Link</a>`;
                rows[i].getElementsByTagName('td')[4].innerText = sportDescription;
                break;
            }
        }
    } else {
        // Add new sport
        var newRow = document.createElement('tr');
        var rowCount = document.getElementById('sportsTable').rows.length;
        newRow.innerHTML = `
            <td>
                <button class="edit-btn" onclick="showEditForm(this)">Edit</button>
                <button class="delete-btn" onclick="deleteRow(this)">Delete</button>
            </td>
            <td>${rowCount}</td>
            <td>${sportName}</td>
            <td><a href="${sportRulesManual}">Link</a></td>
            <td>${sportDescription}</td>
        `;
        document.getElementById('sportsTable').appendChild(newRow);
    }

    document.getElementById('formContainer').style.display = 'none';
}

function deleteRow(button) {
    if (confirm('Are you sure you want to delete this sport?')) {
        var row = button.parentNode.parentNode;
        row.parentNode.removeChild(row);
    }
}