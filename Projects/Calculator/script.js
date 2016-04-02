$(document).ready(function() {
    
    // clears calcultator's display
    function clear () {
        
        $("#display-result").html('');
    }
    
    // append number or operator to calculator's screen when clicked
    $(".btn-number").click(function () { 
            $("#display-result").append($(this).text().trim());
    });
    
    // clear calculator's screen and set result to 0
    $(".btn-action#clear").click(function () { 
        clear();
    });
    
    // try to execute operation entered by user, if valid display result
    $(".btn-action#equal").click(function () { 
        
        var result;
        
        try {
            result = eval($("#display-result").html().trim());
        } catch (e) {
            
            if (e) {
                
                clear();
                $("#display-result").html("Invalid operation");
            } 
        }
        
        $("#display-result").text(result);
    });
});