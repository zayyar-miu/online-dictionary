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
        "success": showResults,
        "error": noResult,
        "complete": hideLoading
    });
}

function hideLoading() {
    $('#loading').hide();
}

function showResults(data) {
    if(data.success == false) {
        alert(data.message);
    } else {
        if($('#results p').length > 0) $('#results').empty();
        let wordtype = '';
        $.each(data.data, function(index, item) {
            wordtype = item.wordtype ? '(' + item.wordtype + ')' : '';
            $('#results').append('<p>' + (index + 1) + wordtype + ' :: ' + item.definition + '</p>');
        });
    }
}

function noResult(error) {
    alert(JSON.stringify(error));
}