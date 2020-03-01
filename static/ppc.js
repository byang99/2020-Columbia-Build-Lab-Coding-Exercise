
var display_lists = function(non_ppc, ppc){
  $("#non-ppc").empty();
  $("#ppc").empty();
  $.each(non_ppc, function(index, employee){
    addEmployeeView(index, employee);
  });
  $.each(ppc, function(index, ppc_employee){
    addPPCEmployeeView(index, ppc_employee);
  });
}

function addEmployeeView(index, employee){
  var employee_template = $("<div class = employee></div>");
  next_idx = index + 1;
  employee_template.text(next_idx + ": " + employee);
  employee_template.data("name", employee)
  employee_template.hover(function(){
    employee_template.addClass("drag-element");
  }, function(){
    employee_template.removeClass();
    employee_template.addClass("employee");
  })
  employee_template.draggable({
    revert: true,
    cursor: "move",
    start: function(event, ui){
      employee_template.addClass("drag-element");
      $("#ppc-label").addClass("dark-shade");
    },
    drag: function(event, ui){
      employee_template.addClass("drag-element");
    },
    stop: function(event, ui){
      employee_template.removeClass();
      employee_template.addClass("employee");
      $("#ppc-label").removeClass();
      $("#ppc-label").addClass("label");

    }
  })
  $("#non-ppc").append(employee_template);
}

function addPPCEmployeeView(index, employee){
  var employee_template = $("<div class = ppc-employee></div>");
  next_idx = index + 1;
  employee_template.text(next_idx + ": " + employee);
  employee_template.data("name", employee)
  employee_template.hover(function(){
    employee_template.addClass("drag-element");
  }, function(){
    employee_template.removeClass();
    employee_template.addClass("ppc-employee");
  })
  employee_template.draggable({
    revert: true,
    cursor: "move",
    start: function(event, ui){
      employee_template.addClass("drag-element");
      $("#non-ppc-label").addClass("dark-shade");
    },
    drag: function(event, ui){
      employee_template.addClass("drag-element");
    },
    stop: function(event, ui){
      employee_template.removeClass();
      employee_template.addClass("ppc-employee");
      $("#non-ppc-label").removeClass();
      $("#non-ppc-label").addClass("label");

    }
  })
  $("#ppc").append(employee_template);
}

var move_to_ppc = function(name){
  var name_data = {"name": name}
  $.ajax({
    type: "POST",
    url: "move_to_ppc",                
    dataType : "json",
    contentType: "application/json; charset=utf-8",
    data : JSON.stringify(name_data),
    success: function(result){
        var new_ppc = result["ppc"]
        var new_non_ppc = result["non_ppc"]
        ppc = new_ppc
        non_ppc = new_non_ppc
        display_lists(non_ppc, ppc)
    },
    error: function(request, status, error){
        console.log("Error");
        console.log(request)
        console.log(status)
        console.log(error)
    }
  });
}

var move_to_non_ppc = function(name){
  var name_data = {"name": name}
  $.ajax({
    type: "POST",
    url: "move_to_non_ppc",                
    dataType : "json",
    contentType: "application/json; charset=utf-8",
    data : JSON.stringify(name_data),
    success: function(result){
        var new_ppc = result["ppc"]
        var new_non_ppc = result["non_ppc"]
        ppc = new_ppc
        non_ppc = new_non_ppc
        display_lists(non_ppc, ppc)
    },
    error: function(request, status, error){
        console.log("Error");
        console.log(request)
        console.log(status)
        console.log(error)
    }
  });
}

$(document).ready(function(){
  display_lists(non_ppc, ppc);
  $("#ppc-label").droppable({
    accept: ".employee",
    over: function(event, ui){
      $("#ppc-label").addClass("darker-shade");
    },
    out: function(event, ui){
      $("#ppc-label").removeClass("darker-shade");
    },
    drop: function(event, ui){
      $("#ppc-label").removeClass("darker-shade");
      $("#ppc-label").removeClass("dark-shade");
      move_to_ppc(ui.draggable.data("name"))
    }
  })

  $("#non-ppc-label").droppable({
    accept: ".ppc-employee",
    over: function(event, ui){
      $("#non-ppc-label").addClass("darker-shade");
    },
    out: function(event, ui){
      $("#non-ppc-label").removeClass("darker-shade");
    },
    drop: function(event, ui){
      $("#non-ppc-label").removeClass("darker-shade");
      $("#non-ppc-label").removeClass("dark-shade");
      move_to_non_ppc(ui.draggable.data("name"))
    }
  })
})