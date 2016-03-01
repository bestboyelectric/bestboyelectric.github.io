var getFormData = function($form){
    var unindexed_array = $form.serializeArray();
    var indexed_array = {};

    $.map(unindexed_array, function(n, i){
        indexed_array[n['name']] = n['value'];
    });

    return indexed_array;
}

var submitCTAForm = function(){
	var formData = getFormData($("#cta-form"));
	var xhr = new XMLHttpRequest();
        xhr.open('POST', 'https://tta1dxz1f5.execute-api.eu-west-1.amazonaws.com/prod/WebsiteFormHandler', false);
	xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
	xhr.setRequestHeader('X-Api-Key','6Ugy6L9L1v7ktwbxV5GbQ9Qc2tZM3Ly94IjJQRtQ');
        jsonString = JSON.stringify(formData)
	try{
		xhr.send(jsonString);
	}catch(e){
		alert(e);
	}
	$('#Popup-Thanks').removeClass('hidden');	
	window.setTimeout(function(){
		$('#FormPopup').modal('hide');
	},3000);
	return false;
}
