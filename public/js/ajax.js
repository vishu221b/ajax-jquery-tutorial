$.get('https://www.omdbapi.com/?s=see&apikey=thewdb', (data) => { // get request in ajax
    console.log(data);
    // debugger // breaks code execution in browser at this point
});

$('#new-form').submit((e) => {
    e.preventDefault();
    console.log($(this).serialize()); // this is not working for some reason so using form's id below for data serialization
    let newData = $('#new-form').serialize(); // serializes the form data to string so that it can be posted via post request
    $.post('/todos', newData, function(response){
        console.log(response);
        debugger
    });
});

$('#edit-form').submit((e) => {
    e.preventDefault();
    let formAction = $('#edit-form').attr('action');
    let formData = $('#edit-form').serialize();
    console.log(formAction);
    $.ajax({
        url: formAction,
        data: formData,
        type: 'PUT', // ajax has no put method so this approach has to be used for PUT requests
        success:function(response){
            console.log(response);
            debugger
        }
    });
});

$('form').submit((e)=>{
    e.preventDefault();
    console.log(e.target.getAttribute('action'));
    console.log(e.target.getAttribute('id'));
    let formAction = $('form').attr('action');
    console.log(formAction);
    $.ajax({
        url: formAction,
        type: 'DELETE', //Delete method, implemented in AJAX
        success: (response) => {
            console.log(response);
            debugger
        }
    });
});
