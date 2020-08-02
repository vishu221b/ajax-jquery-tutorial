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
                    <form action="/todos/${response._id}" class="edit-todo-form">
						<div class="form-group">
							<label>Item Text</label>
							<input type="text" value="${response.text}" name="todo[text]" class="form-control">
						</div>
						<button type="submit" class="btn btn-primary">Update Item</button>
					</form>
					<span class="lead">
						${response.text}
					</span>
					<div class="pull-right">
                    <button class="btn btn-sm btn-warning edit-todo-button">Edit</button>
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
$(document).ready(() => {
    $('#todo-list').on('submit', '.edit-todo-form', (e)=>{
        e.preventDefault();
        let formData = $(e.target).serialize();
        let formAction = $(e.target).attr('action');
        let $wholeItem = $(e.target).parent('.list-group-item');
        console.log($wholeItem);
        $.ajax({
            url: formAction,
            data: formData,
            type: 'PUT',
            wholeItem: $wholeItem, // passing since ajax has it's own scope
            success: function(response){
                console.log(response);
                console.log(this);
                console.log(this.wholeItem);
                this.wholeItem.html(
                    `
                    <form action="/todos/${response._id}" class="edit-todo-form">
                            <div class="form-group">
                                <label>Item Text</label>
                                <input type="text" value="${ response.text }" name="todo[text]" class="form-control">
                            </div>
                            <button type="submit" class="btn btn-primary">Update Item</button>
                        </form>
                        <span class="lead">
                            ${ response.text }
                        </span>
                        <div class="pull-right">
                            <button class="btn btn-sm btn-warning edit-todo-button">Edit</button>
                            <form style="display: inline" method="POST" action="/todos/${response._id}" id="<%= todo._id %>">
                                <button type="submit" class="btn btn-sm btn-danger">Delete</button>
                            </form>
                        </div>
                        <div class="clearfix"></div>
                    `
                );
            }
        });
    });
});



