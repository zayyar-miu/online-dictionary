$(document).ready(function () {
    $("#lookup_button").click(fetchResults);
});

function fetchResults() {
    if($("#term").val()) {
        $('#loading').show();
        $.ajax({
            url: "http://localhost:8081/lookup",
            type: "GET",
            data: { 
                term: $("#term").val()
            },
            dataType: "json",
            "success": showResults,
            "error": noResult,
            "complete": hideLoading
        });
    } else {
        if($('#results p').length > 0) $('#results').empty();
        $('#results').append('<p>No definitions found!</p>');
    }
}

function hideLoading() {
    $('#loading').hide();
}

function showAnswers(data) {
    if($('#results p').length > 0) $('#results').empty();
    let wordtype = '';
    if(data.success == false) {
        alert(data.message);
    } else {
        $.each(data.data, function(index, item) {
            wordtype = item.wordtype ? '(' + item.wordtype + ')' : '';
            $('#results').append('<p>' + (index + 1) + wordtype + ' :: ' + item.definition + '</p>');
        });
    }
}

function noAnswer(error) {
    alert(error);
}