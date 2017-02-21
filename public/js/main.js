$(document).ready(function() {
	$(".btn_restart ").click(function() {
		location.reload();
	});
	Dropzone.autoDiscover = false;
	$(".dropzone").dropzone({
		url: "/api/upload",
		paramName: "userHTML", // The name that will be used to transfer the file
		dictDefaultMessage: "Please drop",
		success: function(file, response) {
			var imgName = response;
			// $("#status").empty().text(response);
			console.log("Successfully uploaded :" + imgName);
		},
		error: function(file, response) {
			//  status('Error: ' + response.status);
		}
	});
});
