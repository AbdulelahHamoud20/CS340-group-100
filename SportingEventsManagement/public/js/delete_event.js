/*
Citation for the following JavaScript code:
Date: 8/9/2024
Copied from /OR/ Adapted from /OR/ Based on
Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main 
Reworked the request to better accomodate the attributes of the corresponding table.
*/

// Sends request to delete entry from the database then updates the UI
function deleteEvent(EventID) {

    let link = '/delete-event-ajax/';
    let data = {
      id: EventID
    };
  
    $.ajax({
      url: link,
      type: 'DELETE',
      data: JSON.stringify(data),
      contentType: "application/json; charset=utf-8",
      success: function(result) {
        deleteRow(EventID);
        }
    });
}
  
// Removes the entry from the user-facing table
function deleteRow(EventID) {
    let table = document.getElementById("events-table");
    for (let i = 0, row; row = table.rows[i]; i++) {
        if (table.rows[i].getAttribute("data-value") == EventID) {
            table.deleteRow(i);
            deleteDropDownMenu(EventID)
            break;
        }
    }
}

// Removes the deleted entry from the edit dropdown list
function deleteDropDownMenu(EventID) {
    let selectMenu = document.getElementById("input-event-update");
    for (let i = 0; i < selectMenu.length; i++) {
        if (Number(selectMenu.options[i].attributes[0].value) === Number(EventID)) {
            selectMenu[i].remove();
            break;
        }
    }
}