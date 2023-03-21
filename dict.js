$(document).ready(function () {
    $("#lookup_button").click(fetchResults);
});

function fetchResults() {
    $('#loading').show();
    $.ajax({
        url: "http://localhost:8081/lookup",
        type: "GET",
        data: { 
            term: $("#term").val()
        },
        dataType: "json",
        "success": showAnswers,
        "error": noAnswer,
        "complete": hideLoading
    });
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