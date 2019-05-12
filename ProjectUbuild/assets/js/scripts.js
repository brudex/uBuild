var imgurl = "";
var homedesignupload = null;
var uploadFormData = [];
var uploadButton;

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

//function SubmitDocs(e) {

//    uploadFormData = $("#uploadForm").serializeArray();

//    homedesignupload.formData = uploadFormData;
//    console.log();
//    homedesignupload.submit();
//    $('#fileupload').bind('fileuploaddone',
//        function (e, data) {
//            location.reload(true);
//        });
//}

(function ($) {

    'use strict';
    $(document).ready(function () {
        // Initializes search overlay plugin.
        // Replace onSearchSubmit() and onKeyEnter() with 
        // your logic to perform a search and display results
        $(".list-view-wrapper").scrollbar();
        $(".image-picker").imagepicker();
        $('#datepicker-component2,#datepicker-component3,#datepicker-component4,#datepicker-component5,#datepicker-component6').datepicker(
            {
               
            });
        $('.input-phone').intlInputPhone();
        $('[data-toggle="tooltip"]').tooltip({ boundary: 'scrollParent' })
        var ulain = getParameterByName("clientUlain");

    

        $('#fileupload').fileupload({
            url: "/api/LoanApi/UploadDocument?clientUlain=" + ulain,
            dataType: 'json',
            autoUpload: false,
            acceptFileTypes: /(\.|\/)(pdf)$/i,
            maxFileSize: 999000,
            //formData: uploadFormData,
            done: function (e, data) {
                $.each(data.result.files,
                    function (index, file) {
                        $('<p/>').text(file.name).appendTo('#files');
                    });
            },
            add: function (e, data) {
                homedesignupload = data;
            },
            progressall: function (e, data) {
                var progress = parseInt(data.loaded / data.total * 100, 10);
                $('#progress .progress-bar').css(
                    'width',
                    progress + '%'
                );
            }
        }).on('fileuploadadd', function (e, data) {
                data.context = $('<div/>').appendTo('#files');
                $.each(data.files, function (index, file) {
                    var node = $('<p/>')
                        .append($('<span/>').text(file.name));
                    if (!index) {
                        node
                            .append('<br>')
                            .append(uploadButton.clone(true).data(data));
                    }
                    node.appendTo(data.context);
                });
            }).on('fileuploadprocessalways', function (e, data) {
                var index = data.index,
                    file = data.files[index],
                    node = $(data.context.children()[index]);
                if (file.preview) {
                    node
                        .prepend('<br>')
                        .prepend(file.preview);
                }
                if (file.error) {
                    node
                        .append('<br>')
                        .append($('<span class="text-danger"/>').text(file.error));
                }
                if (index + 1 === data.files.length) {
                    data.context.find('button')
                        .text('Upload')
                        .prop('disabled', !!data.files.error);
                }
            }).prop('disabled', !$.support.fileInput)
            .parent().addClass($.support.fileInput ? undefined : 'disabled');


        $('[data-pages="search"]').search({
            // Bind elements that are included inside search overlay
            searchField: '#overlay-search',
            closeButton: '.overlay-close',
            suggestions: '#overlay-suggestions',
            brand: '.brand',
            // Callback that will be run when you hit ENTER button on search box
            onSearchSubmit: function(searchString) {
                console.log("Search for: " + searchString);
            },
            // Callback that will be run whenever you enter a key into search box. 
            // Perform any live search here.  
            onKeyEnter: function(searchString) {
                console.log("Live search for: " + searchString);
                var searchField = $('#overlay-search');
                var searchResults = $('.search-results');

                /* 
                    Do AJAX call here to get search results
                    and update DOM and use the following block 
                    'searchResults.find('.result-name').each(function() {...}'
                    inside the AJAX callback to update the DOM
                */

                // Timeout is used for DEMO purpose only to simulate an AJAX call
                clearTimeout($.data(this, 'timer'));
                searchResults.fadeOut("fast"); // hide previously returned results until server returns new results
                var wait = setTimeout(function() {

                    searchResults.find('.result-name').each(function() {
                        if (searchField.val().length !== 0) {
                            $(this).html(searchField.val());
                            searchResults.fadeIn("fast"); // reveal updated results
                        }
                    });
                }, 500);
                $(this).data('timer', wait);

            }
        });

    });


    $('.panel-collapse label').on('click', function(e) {
        e.stopPropagation();
    });

})(window.jQuery);