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

function consultar(params) {
  console.log("consultar")
  $.ajax({
    url: urlBase + "cabin",
    type: "GET",
    dataType: "json",
    success: function(response){
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
      });
    },error: function(error){
      console.error(error);
    }
  });
}


$(document).ready(function(){
  consultar();
});

