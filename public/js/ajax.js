// $.get('https://www.omdbapi.com/?s=see&apikey=thewdb', (data) => { // get request in ajax
//     console.log(data);
//     // debugger // breaks code execution in browser at this point
// });

// $('#new-form').submit((e) => {
//     e.preventDefault();
//     console.log($(this).serialize()); // this is not working for some reason so using form's id below for data serialization
//     let newData = $('#new-form').serialize(); // serializes the form data to string so that it can be posted via post request
//     $.post('/todos', newData, function(response){
//         console.log(response);
//         debugger
//     });
// });

// $('#edit-form').submit((e) => {
//     e.preventDefault();
//     let formAction = $('#edit-form').attr('action');
//     let formData = $('#edit-form').serialize();
//     console.log(formAction);
//     $.ajax({
//         url: formAction,
//         data: formData,
//         type: 'PUT', // ajax has no put method so this approach has to be used for PUT requests
//         success:function(response){
//             console.log(response);
//             debugger
//         }
//     });
// });

// $('form').submit((e)=>{
//     e.preventDefault();
//     console.log(e.target.getAttribute('action'));
//     console.log(e.target.getAttribute('id'));
//     let formAction = $('form').attr('action');
//     console.log(formAction);
//     $.ajax({
//         url: formAction,
//         type: 'DELETE', //Delete method, implemented in AJAX
//         success: (response) => {
//             console.log(response);
//             debugger
//         }
//     });
// });



$('#new-todo-form').submit((e) => {
    e.preventDefault();
    let todoItem = $('#new-todo-form').serialize();
   $.post('/todos', todoItem, (response)=>{
       console.log(response);
       $('#todo-list').append(
           `
           <li class="list-group-item">
					<span class="lead">
						${response.text}
					</span>
					<div class="pull-right">
						<a href="/todos/${response.text._id}/edit" class="btn btn-sm btn-warning">Edit</a>
						<form style="display: inline" method="POST" action="/todos/${response._id}">
							<button type="submit" class="btn btn-sm btn-danger">Delete</button>
						</form>
					</div>
					<div class="clearfix"></div>
				</li>
           `
       );
       $('#new-todo-form').find('.form-control').val('');
   }); 
});

$('#todo-list').on('click', '.edit-todo-button', (e)=>{
    $(e.target).parent().siblings('.edit-todo-form').toggle();
});

$('#todo-list').on('submit', '.edit-todo-form', (e)=>{
    e.preventDefault();
    let formData = $(e.target).serialize();
    console.log(formData);
    let formAction = $(e.target).attr('action');
    $.ajax({
        url: formAction,
        data: formData,
        type: 'PUT',
        success: function(response){
            console.log(response);
        }
    });
    $.get(formAction, function(response){
            console.log(response);
            $(e.target).toggle();
            $(e.target).siblings('.lead').val(response.text);
    });
});




