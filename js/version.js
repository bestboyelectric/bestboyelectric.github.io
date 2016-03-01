$.get('build_number.txt', function(data) {
    $('#version-span').append('build '+ data);
});
