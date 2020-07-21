$(document).ready(onReady);


let operator = "";

function onReady() {
    //console.log('jquery working')

    $('#clearButton').on('click', clearMath);
    
    $('#equalButton').on('click', equalMath);
    $('.operationsButton').on('click', function () {
        operator = $(this).html();
    })
}



function clearMath() {
    console.log('inside clearFunction');
    $('#clearButton').on('click',
        $('#leftInput').val(''),
        $('#rightInput').val('')
    );
}


function equalMath() {
    //console.log('inside equalMath');

    let numberOne = $('#leftInput').val();
    let numberTwo = $('#rightInput').val();
    // let operator = $('.operationsButton').val();
    let objectToSend = {
        numberOne: numberOne,
        numberTwo: numberTwo,
        operator: operator
    }
    //console.log('sending:', objectToSend);
    $.ajax({
        type: 'POST',
        url: '/entries',
        data: objectToSend
    }).then(function (solvedProblem) {
        console.log('back from POST:', solvedProblem);
        //updates DOM
        appendToDom();
    }).catch(function (err) {
        alert('error');
        console.log(err)
    }) //end AJAX
}

function appendToDom() {
    console.log("in appendToDom")
    $.ajax({
        type: 'GET',
        url: '/entries'
    }).then(function (response) {
        let el = $('#answerHistory');
        el.empty();
        for (let i = 0; i < response.length; i++) {
            el.append(`<li>${response[i].numberOne} ${response[i].operator} ${response[i].numberTwo} = ${response[i].answer}</li>`)
        } //end for
    }).catch(function (err) {
        alert('error getting answers');
        console.log(err)
    })
} //end append to dom