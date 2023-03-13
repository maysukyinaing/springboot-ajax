$(document).ready(function(){

    $("#update").hide();

    assignDataToTable();

    $('table').on('click', 'button[id="delete"]', function(e){
       var id = $(this).closest('tr').children('td:first').text();
       
       $.ajax({
            type:"DELETE",
            url:"http://localhost:8080/api/users/" + id,
            success: function(data){
                alertUsing("Deleted.", true);
                assignDataToTable();
            },
            error: function(err) {  
                console.log(err);
                alert(err);
            }
        });

    })

    $('table').on('click', 'button[id="edit"]', function(e){
       var id = $(this).closest('tr').children('td:first').text();
       var name = $(this).closest('tr').children('td:nth-child(2)').text();
       var phone = $(this).closest('tr').children('td:nth-child(3)').text();
       var email = $(this).closest('tr').children('td:nth-child(4)').text();
       var address = $(this).closest('tr').children('td:nth-child(5)').text();

        $("#name").val(name);
        $("#phone").val(phone);
        $("#email").val(email);
        $("#address").val(address);

        $("#update").show();
        $("#save").hide();

        $("#update").click(function() {

            var jsonVar = {
                name: $("#name").val(),
                phone: $("#phone").val(),
                email: $("#email").val(),
                address: $("#address").val()
            };

            $.ajax({
                type:"PUT",
                data: JSON.stringify(jsonVar),
                contentType: "application/json",
                url:"http://localhost:8080/api/users/" + id,
                success: function(data){
                    alertUsing("Edited.", true);
                    $("#update").hide();
                    $("#save").show();
                    $("#name").val("");
                    $("#phone").val("");
                    $("#email").val("");
                    $("#address").val("");
                    assignDataToTable();
                },
                error: function(err) {  
                    console.log(err);
                    alert(err);
                }

        });

    });

    })

    var phone = $("#phone");

    phone.keypress(function(key){
        if(key.charCode >= 48 || key.charCode <= 57){
            if(phone.val().length < 12){
                return true;
            }else{
                alertUsing("You Have Exceeded 10 digit.", false);
                return false;
            }
        }else{
            alertUsing("Enter Number.", false);
            return false;
        }
    });

    $("#save").click(function() {

        var jsonVar = {
            name: $("#name").val(),
            phone: $("#phone").val(),
            email: $("#email").val(),
            address: $("#address").val()
        };

        $.ajax({
            type:"POST",
            url:"http://localhost:8080/api/users",
            data: JSON.stringify(jsonVar),
            contentType: "application/json",
            success: function(data){
                alertUsing("Saved.", true);
                $("#update").hide();
                $("#save").show();
                $("#name").val("");
                $("#phone").val("");
                $("#email").val("");
                $("#address").val("");
                assignDataToTable();
            },
            error: function(err) {
                console.log(err);
                alert(err);
            }
        });

    });

    function assignDataToTable() {
        $("tbody").empty();
        $.ajax({    
          type:"GET",
          contentType: "application/json",
          url:"http://localhost:8080/api/users",
          success: function(data) {
            var users = JSON.parse(JSON.stringify(data));
            for (var i in users) {
                $("tbody").
                append("<tr> \
                            <td>" +  users[i].id + "</td> \
                            <td>" +  users[i].name + "</td> \
                            <td>" +  users[i].phone + "</td> \
                            <td>" +  users[i].email + "</td> \
                            <td>" +  users[i].address + "</td> \
                            <td> \ <button id='delete' class='btn btn-danger'>Delete</button> \
                           <button id='edit' class='btn btn-warning'>Edit</button> \ </td> \
                        </tr>");
            }
          },
          error: function(data) { 
            console.log(data);
            }
        });
       
    }

function alertUsing(text, flag) {

    var alert = $(".alert");

    if(flag){
        alert.removeClass("alert-danger").addClass("alert-success");
    }else{
        alert.removeClass("alert-success").addClass("alert-danger");
        
    }
    
    alert.fadeIn(400);
    alert.css("display", "block");
    alert.text(text);
    setTimeout(function() {
        alert.fadeOut();
    }, 2000);

  }

});