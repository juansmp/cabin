// // WARNING: For GET requests, body is set to null by browsers.
// var data = "";

// var xhr = new XMLHttpRequest();
// xhr.withCredentials = true;

// xhr.addEventListener("readystatechange", function() {
//   if(this.readyState === 4) {
//     console.log(this.responseText);
//   }
// });

// xhr.open("GET", "https://g652512b33ec820-alquilercabanas.adb.ca-toronto-1.oraclecloudapps.com/ords/admin/cabin/cabin");

// xhr.send(data);
var urlBase = "https://g652512b33ec820-alquilercabanas.adb.ca-toronto-1.oraclecloudapps.com/ords/admin/cabin/"
var cabinLastId = 0;

function consultar(params) {
  console.log("consultar")
  $.ajax({
    url: urlBase + "cabin",
    type: "GET",
    dataType: "json",
    success: function(response){
      $("#cuerpoTabla").empty();
      console.log(response);
      response.items.forEach(item => {
        console.log(item);
        var row = $("<tr>");
        row.append($("<td>").text(item.id));
        row.append($("<td>").text(item.brand));
        row.append($("<td>").text(item.rooms));
        row.append($("<td>").text(item.category_id));
        row.append($("<td>").text(item.name));
        $("#cuerpoTabla").append(row);
        cabinLastId = item.id;
      });
      cabinLastId++;
      $('#id').val(cabinLastId);
    },error: function(error){
      alert("Error al consultar");
    }
  });
}

function createCabin() {
  var cabin = {
    id: $("#id").val(),
    brand: $("#brand").val(),
    rooms: $("#rooms").val(),
    category_id: $("#category_id").val(),
    name: $("#name").val(),
  }
  $.ajax({
    url: urlBase + "cabin",
    type: "POST",
    dataType: "json",
    data: cabin,
    statusCode: {
      201: function(){
        alert("Cabina creada");
        consultar();
      },
      400: function(){
        console.log("Error al crear la cabina, datos incorrectos");
      },
      555: function(){
        console.log("Error al crear la cabina, cabana ya existe");
      },
    },
    error: function(error){
      if(error.status!=201){
        alert("Error al crear");
      }      
    }
  });
}

function cleanFormular() {
  $("#brand").val("");
  $("#rooms").val("");
  $("#category_id").val("");
  $("#name").val("");
}


$(document).ready(function(){
  consultar();
});

