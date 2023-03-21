$(document).ready(function () {
    $("#lookup_button").click(fetchAnswers);
});

function fetchAnswers() {
    $('#loading').show();
    $.ajax({
        url: "http://localhost:8081/lookup.js",
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
    console.log('Hi! ' + data);
    if($('#results p').length > 0) $('#results').empty();
    let wordtype = '';
    $.each(data, function(index, item) {
        wordtype = item.wordtype ? '(' + item.wordtype + ')' : '';
        $('#results').append('<p>' + (index + 1) + wordtype + ' :: ' + item.definition + '</p>');
    });
}

function noAnswer(error) {
    alert(JSON.stringify(error));
}