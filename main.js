'use strict';

$(document).ready(init);

function init() {
    $('#filter').on('keyup', filter);
    $('.save-contact').submit(addContact);
    $('.contacts').on('click', 'span.glyphicon', toggleFavorite);
}

function filter() {
    var filter = $(this).val();

    $('.media').each(function() {
        if ($(this).text().search(new RegExp(filter, 'i')) < 0) {
            $(this).fadeOut();
        } else {
            $(this).show();
            $('.template').hide();
        }
    });
}

function toggleFavorite() {
    if ($(this).hasClass('glyphicon-star-empty')) {
        $(this).removeClass('glyphicon-star-empty').addClass('glyphicon-star');
    } else {
        $(this).removeClass('glyphicon-star').addClass('glyphicon-star-empty');
    }
}

function addContact(event) {
    event.preventDefault();

    var contact = {
        name: $('#name').val(),
        address: $('#address').val(),
        email: $('#email').val(),
        phone: $('#phone').val(),
        img: $('#image').val()
    };

    var $contact = $('.template').clone();
    $contact.removeClass('template');

    $contact.find('img').attr('src', contact.img);
    $contact.find('.name').text(contact.name);
    $contact.find('.address').text(contact.address);
    $contact.find('.phone').text(contact.phone);
    $contact.find('.email').text(contact.email);

    $('.contacts').append($contact);

    $('#name').val('');
    $('#address').val('');
    $('#email').val('');
    $('#phone').val('');
    $('#image').val('');

    $('#myModal').modal('toggle');
}