$(function () {
    // To select an element, $()
    $('.container').children('section').last().children('h2').css({
      color: 'red'
    })
  
    $('.about-read-more').parent('section').next().children('button').css({
      backgroundColor: 'blue',
      color: 'white'
    }).on('click', function() {
      $.ajax({
        url: 'https://dummyjson.com/todos',
        type: 'GET',
        success: function(response) {
          console.log(response.todos)
          response.todos.forEach(item => {
            $('.container').children('section').first().next().find('ul').append(`
                <li>${item.todo} - Completed: ${item.completed ? 'Yes' : 'No'}</li>
              `)
          })
        },
        error: function(err) {
          console.error(err)
        }
      })
  
    })
  
    $('.add-todo').on('submit', function(e) {
      e.preventDefault()
      const todoInput = $('#todo').val()
      $.ajax({
        type: 'POST',
        url: 'https://dummyjson.com/todos/add',
        data: JSON.stringify({
          todo: todoInput,
          completed: false,
          userId: 152
        }),
        contentType: 'application/json',
        success: function(response) {
          $('.container section:nth-child(2) ul').prepend(`
              <li>${response.todo} - Completed: ${response.completed ? 'Yes' : 'No'}</li>
            `)
        },
        error: function (err) {
          console.error(err)
        }
      })
    })
  })
  