document.addEventListener('DOMContentLoaded', function() {
    // Initialize or load any necessary data
});

function showAddForm() {
    document.getElementById('formContainer').style.display = 'block';
    document.getElementById('formTitle').innerText = 'Add Event Stream';
    document.getElementById('eventStreamID').value = '';
    document.getElementById('eventID').value = '';
    document.getElementById('serviceID').value = '';
}

function showEditForm(button) {
    var row = button.parentNode.parentNode;
    var cells = row.getElementsByTagName('td');
    
    document.getElementById('formContainer').style.display = 'block';
    document.getElementById('formTitle').innerText = 'Edit Event Stream';
    document.getElementById('eventStreamID').value = cells[1].innerText;
    document.getElementById('eventID').value = cells[2].innerText;
    document.getElementById('serviceID').value = cells[3].innerText;
}

function hideForm() {
    document.getElementById('formContainer').style.display = 'none';
}

function submitForm(event) {
    event.preventDefault();
    var eventStreamID = document.getElementById('eventStreamID').value;
    var eventID = document.getElementById('eventID').value;
    var serviceID = document.getElementById('serviceID').value;

    if (eventStreamID === '') {
        // Add new event stream
        var newRow = document.createElement('tr');
        var rowCount = document.getElementById('eventStreamsTable').rows.length;
        newRow.innerHTML = `
            <td>
                <button class="edit" onclick="showEditForm(this)">Edit</button>
                <button class="delete" onclick="deleteRow(this)">Delete</button>
            </td>
            <td>${rowCount}</td>
            <td>${eventID}</td>
            <td>${serviceID}</td>
        `;
        document.getElementById('eventStreamsTable').appendChild(newRow);
    } else {
        // Edit existing event stream
        var rows = document.getElementById('eventStreamsTable').rows;
        for (var i = 1; i < rows.length; i++) {
            var cells = rows[i].getElementsByTagName('td');
            if (cells[1].innerText === eventStreamID) {
                cells[2].innerText = eventID;
                cells[3].innerText = serviceID;
                break;
            }
        }
    }
    hideForm();
}

function deleteRow(button) {
    if (confirm('Are you sure you want to delete this event stream?')) {
        var row = button.parentNode.parentNode;
        row.parentNode.removeChild(row);
    }
}

function searchTable() {
    var input, filter, table, tr, td, i, j, txtValue;
    input = document.getElementById('searchInput');
    filter = input.value.toUpperCase();
    table = document.getElementById('eventStreamsTable');
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
