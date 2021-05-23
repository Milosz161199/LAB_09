$(document).ready(()=>{	
	$("#postMatrix").submit(function(e) {

		e.preventDefault(); // avoid to execute the actual submit of the form.

		var form = $(this);
		var url = 'servermock/ledDisplay.php';
    
		$.ajax({
				type: "POST",
				url: url,
				data: form.serialize(), // serializes the form's elements.
				success: function(data)
				{
				   alert(data); // show response from the php script.
				}
		});
	});
	
});