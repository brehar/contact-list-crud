'use strict';

$(document).ready(init);

function init() {
    renderList();
    $('#filter').on('keyup', filter);
    $('.save-contact').submit(addContact);
    $('.contacts').on('click', 'span.glyphicon', toggleFavorite);
    $('.contacts').on('click', '.delete', deleteContact);
}

var ContactStorage = {
    get: function() {
        try {
            var contacts = JSON.parse(localStorage.contacts);
        } catch (err) {
            var contacts = [];
        }

        return contacts;
    },
    write: function(contacts) {
        localStorage.contacts = JSON.stringify(contacts);
    }
};

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

    $('#name').val('');
    $('#address').val('');
    $('#email').val('');
    $('#phone').val('');
    $('#image').val('');

    var contacts = ContactStorage.get();
    contacts.push(contact);
    ContactStorage.write(contacts);

    $('#myModal').modal('toggle');

    renderList();
}

function renderList() {
    var contacts = ContactStorage.get();
    var newList = [];

    for (var x = 0; x < contacts.length; x++) {
        var $contact = $('.template').clone();
        $contact.removeClass('template');

        $contact.find('img').attr('src', contacts[x].img);
        $contact.find('.name').text(contacts[x].name);
        $contact.find('.address').text(contacts[x].address);
        $contact.find('.phone').text(contacts[x].phone);
        $contact.find('.email').text(contacts[x].email);

        newList.push($contact);
    }

    $('.contacts').empty().append(newList);
}

function deleteContact() {
    debugger;
    var index = $(this).index();

    var contacts = ContactStorage.get();

    if (contacts.length === 1) {
        localStorage.clear();
    } else {
        contacts.splice(index, 1);
        ContactStorage.write(contacts);
    }

    renderList();
}