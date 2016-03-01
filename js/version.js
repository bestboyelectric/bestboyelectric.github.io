$.get('build_number.txt', function(data) {
    $('#version-span').append('Build number: '+ data);
});
