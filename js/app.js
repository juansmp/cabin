var urlBase = "https://g652512b33ec820-alquilercabanas.adb.ca-toronto-1.oraclecloudapps.com/ords/admin"

/* Métodos de Cabañas */
var cabinLastId = 0;
function getCabin(params) {
  console.log("getCabin")
  $.ajax({
    url: urlBase + "/cabin/cabin",
    type: "GET",
    dataType: "json",
    success: function (response) {
      $("#cabinTableBody").empty();
      console.log(response);
      response.items.forEach(item => {
        console.log(item);
        var row = $("<tr>");
        row.append($("<td>").text(item.id));
        row.append($("<td>").text(item.brand));
        row.append($("<td>").text(item.rooms));
        row.append($("<td>").text(item.category_id));
        row.append($("<td>").text(item.name));
        row.append($("<td class='text-center no-padding'>").append(
          '<button type="button" class="btn btn-outline-danger btn-block w-100" onclick="deleteCabin(' + item.id + ',\'' + item.name + '\')">Eliminar</button>\
          <button type="button" class="btn btn-outline-success btn-block w-100" onclick="openUpdatePopupCabin(' + item.id + ',\'' + item.brand + '\',\'' + item.rooms + '\',\'' + item.category_id + '\',\'' + item.name + '\')">Actualizar</button>'));
        $("#cabinTableBody").append(row);
        cabinLastId = item.id;
      });
      cabinLastId++;
      $('#cabinId').val(cabinLastId);
    }, error: function (error) {
      alert("Error al getCabin");
    }
  });
}

function createCabin() {
  var cabin = {
    id: $("#cabinId").val(),
    brand: $("#cabinBrand").val(),
    rooms: $("#cabinRooms").val(),
    category_id: $("#cabinCategory_id").val(),
    name: $("#cabinName").val(),
  }
  $.ajax({
    url: urlBase + "/cabin/cabin",
    type: "POST",
    dataType: "json",
    data: cabin,
    statusCode: {
      201: function () {
        alert("Cabaña creada");
        getCabin();
      },
      400: function () {
        console.log("Error al crear la Cabaña, datos incorrectos");
      },
      555: function () {
        console.log("Error al crear la Cabaña, ya existe");
      },
    },
    error: function (error) {
      if (error.status != 201) {
        alert("Error al crear");
      }
    }
  });
}


function cleanCabinFormular() {
  $("#cabinBrand").val("");
  $("#cabinRooms").val("");
  $("#cabinCategory_id").val("");
  $("#cabinName").val("");
}

function updateCabin() {
  var cabin = {
    id: $("#puCabinId").val(),
    brand: $("#puCabinBrand").val(),
    rooms: $("#puCabinRooms").val(),
    category_id: $("#puCabinCategory_id").val(),
    name: ''+ $("#puCabinName").val(),
  }
  $.ajax({
    url: urlBase + "/cabin/cabin",
    type: "PUT",
    contentType: 'application/json',
    data: JSON.stringify(cabin), // access in body
    statusCode: {
      200: function () {
        alert("Cabaña Actualizada");
        getCabin();
      },
      201: function () {
        alert("Cabaña Creada - mediante PUT");
        getCabin();
      },
      204: function () {
        alert("Cabaña Actualizada");
        getCabin();
      },
      400: function () {
        console.log("Error al crear la Cabaña, datos incorrectos");
      },
      555: function () {
        console.log("Error al crear la Cabaña, ya existe");
      },
    },
    error: function (error) {
      if (error.status != 201) {
        alert("Error al crear");
        getCabin();
      }
    }
  });
}


function deleteCabin(input_id, input_name) {
  $.ajax({
    url: urlBase + "/cabin/cabin" + "?id=" + input_id,
    method: "DELETE",
    statusCode: {
      200: function () {
        alert("Cabaña " + input_name + " eliminada");
        getCabin();
      },
    },
    error: function (error) {
      if (error.status != 200) {
        alert("Error al eliminar");
      }
    }
  });
}

// When the user clicks on <div>, open the popup
function openUpdatePopupCabin(input_id, input_brand, input_rooms, input_category_id, input_name) {
  var popup = document.getElementById("myPopup");
  popup.classList.toggle("show", true);
  $('#puCabinId').val(input_id);  
  $('#puCabinBrand').val(input_brand);
  $('#puCabinRooms').val(input_rooms);
  $('#puCabinCategory_id').val(input_category_id);
  $('#puCabinName').val(input_name);
}

function closeUpdatePopupCabin() {
  var popup = document.getElementById("myPopup");
  popup.classList.toggle("show", false);
  updateCabin();
}


/* Métodos de Categorías */
var categoryLastId = 0;
function getCategory(params) {
  console.log("getCategory")
  $.ajax({
    url: urlBase + "/category/category",
    type: "GET",
    dataType: "json",
    success: function (response) {
      $("#categoryTableBody").empty();
      console.log(response);
      response.items.forEach(item => {
        console.log(item);
        var row = $("<tr>");
        row.append($("<td>").text(item.id));
        row.append($("<td>").text(item.name));
        row.append($("<td>").text(item.description));
        $("#categoryTableBody").append(row);
        categoryLastId = item.id;
      });
      categoryLastId++;
      $('#categoryId').val(categoryLastId);
    }, error: function (error) {
      alert("Error al getCategory");
    }
  });
}

function createCategory() {
  var category = {
    id: $("#categoryId").val(),
    name: $("#categoryName").val(),
    description: $("#categoryDescription").val(),
  }
  $.ajax({
    url: urlBase + "/category/category",
    type: "POST",
    dataType: "json",
    data: category,
    statusCode: {
      201: function () {
        alert("Categoría creada");
        getCategory();
      },
      400: function () {
        console.log("Error al crear la Categoría, datos incorrectos");
      },
      555: function () {
        console.log("Error al crear la Categoría, ya existe");
      },
    },
    error: function (error) {
      if (error.status != 201) {
        alert("Error al crear");
      }
    }
  });
}

function cleanCategoryFormular() {
  $("#categoryBrand").val("");
  $("#categoryRooms").val("");
  $("#categoryCategory_id").val("");
  $("#categoryName").val("");
}


/* Métodos de Clientes */
var clientLastId = 0;
function getClient(params) {
  console.log("getClient")
  $.ajax({
    url: urlBase + "/client/client",
    type: "GET",
    dataType: "json",
    success: function (response) {
      $("#clientTableBody").empty();
      console.log(response);
      response.items.forEach(item => {
        console.log(item);
        var row = $("<tr>");
        row.append($("<td>").text(item.id));
        row.append($("<td>").text(item.name));
        row.append($("<td>").text(item.email));
        row.append($("<td>").text(item.age));
        $("#clientTableBody").append(row);
        clientLastId = item.id;
      });
      clientLastId++;
      $('#clientId').val(clientLastId);
    }, error: function (error) {
      alert("Error al getClient");
    }
  });
}

function createClient() {
  var client = {
    id: $("#clientId").val(),
    name: $("#clientName").val(),
    email: $("#clientEmail").val(),
    age: $("#clientAge").val(),
  }
  $.ajax({
    url: urlBase + "/client/client",
    type: "POST",
    dataType: "json",
    data: client,
    statusCode: {
      201: function () {
        alert("Cliente creada");
        getClient();
      },
      400: function () {
        console.log("Error al crear la Cliente, datos incorrectos");
      },
      555: function () {
        console.log("Error al crear la Cliente, ya existe");
      },
    },
    error: function (error) {
      if (error.status != 201) {
        alert("Error al crear");
      }
    }
  });
}

function cleanClientFormular() {
  $("#clientName").val("");
  $("#clientEmail").val("");
  $("#clientAge").val("");
}


/* Métodos de Mensajes */
var messageLastId = 0;
function getMessage(params) {
  console.log("getMessage")
  $.ajax({
    url: urlBase + "/message/message",
    type: "GET",
    dataType: "json",
    success: function (response) {
      $("#messageTableBody").empty();
      console.log(response);
      response.items.forEach(item => {
        console.log(item);
        var row = $("<tr>");
        row.append($("<td>").text(item.id));
        row.append($("<td>").text(item.messagetext));
        $("#messageTableBody").append(row);
        messageLastId = item.id;
      });
      messageLastId++;
      $('#messageId').val(messageLastId);
    }, error: function (error) {
      alert("Error al getMessage");
    }
  });
}

function createMessage() {
  var message = {
    id: $("#messageId").val(),
    messagetext: $("#messageMessagetext").val(),
  }
  $.ajax({
    url: urlBase + "/message/message",
    type: "POST",
    dataType: "json",
    data: message,
    statusCode: {
      201: function () {
        alert("Mensaje creada");
        getMessage();
      },
      400: function () {
        console.log("Error al crear la Mensaje, datos incorrectos");
      },
      555: function () {
        console.log("Error al crear la Mensaje, ya existe");
      },
    },
    error: function (error) {
      if (error.status != 201) {
        alert("Error al crear");
      }
    }
  });
}

function cleanMessageFormular() {
  $("#messageMessagetext").val("");
}


$('#navbarNav li a').click(function () {
  //alert($(this).text());
  if ($(this).text() == 'Cabañas') {
    document.getElementById("cabinContainer").style.display = "block";
    document.getElementById("categoryContainer").style.display = "none";
    document.getElementById("clientContainer").style.display = "none";
    document.getElementById("messageContainer").style.display = "none";
  } else if ($(this).text() == 'Categorías') {
    document.getElementById("cabinContainer").style.display = "none";
    document.getElementById("categoryContainer").style.display = "block";
    document.getElementById("clientContainer").style.display = "none";
    document.getElementById("messageContainer").style.display = "none";
  } else if ($(this).text() == 'Clientes') {
    document.getElementById("cabinContainer").style.display = "none";
    document.getElementById("categoryContainer").style.display = "none";
    document.getElementById("clientContainer").style.display = "block";
    document.getElementById("messageContainer").style.display = "none";
  } else if ($(this).text() == 'Mensajes') {
    document.getElementById("cabinContainer").style.display = "none";
    document.getElementById("categoryContainer").style.display = "none";
    document.getElementById("clientContainer").style.display = "none";
    document.getElementById("messageContainer").style.display = "block";
  } else {
    document.getElementById("cabinContainer").style.display = "block";
    document.getElementById("categoryContainer").style.display = "block";
    document.getElementById("clientContainer").style.display = "block";
    document.getElementById("messageContainer").style.display = "block";
  }
});



$(document).ready(function () {
  getCabin();
  getCategory();
  getClient();
  getMessage();
});



