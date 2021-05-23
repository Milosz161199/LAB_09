var IP_address = '192.168.1.91';
var Sample_time = 100;
var Max_number_of_samples = 100;
var API_version = 1;


const url_config = 'http://192.168.1.91/client_LAB_09/HTML/servermock/config_file.json';
/**
* @brief Send HTTP GET request to IoT server
*/
function ajaxJSON() {
	$.ajax(url_config, {
		type: 'GET', dataType: 'json',
		success: function(responseJSON, status, xhr) {
			IP_address = responseJSON.IP_address;
			Sample_time = responseJSON.Sample_time;
			Max_number_of_samples = responseJSON.Max_number_of_samples;
			API_version = responseJSON.API_version;
			
			$("#IP_address_id").val(IP_address.toString());
			$("#Sample_time_id").val(parseInt(Sample_time));
			$("#Max_number_of_samples_id").val(parseInt(Max_number_of_samples));
			$("#API_version_id").val(parseInt(API_version));
			
		}
	});
}

$(document).ready(()=>{ 
	ajaxJSON();


	$("#postConfig").submit(function(e) {

		e.preventDefault(); // avoid to execute the actual submit of the form.

		var form = $(this);
		var url = 'servermock/config_data.php';
    
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