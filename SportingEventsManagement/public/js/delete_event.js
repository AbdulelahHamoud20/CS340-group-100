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

function deleteDropDownMenu(EventID) {
    let selectMenu = document.getElementById("input-event-update");
    for (let i = 0; i < selectMenu.length; i++) {
        if (Number(selectMenu.options[i].attributes[0].value) === Number(EventID)) {
            selectMenu[i].remove();
            break;
        }
    }
}