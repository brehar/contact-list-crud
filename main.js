'use strict';

$(document).ready(init);

var id;
var index;

function init() {
    renderList();
    getCurrentId();
    $('#filter').on('keyup', filter);
    $('.save-contact').submit(addContact);
    $('.contacts').on('click', '.delete', deleteContact);
    $('.contacts').on('click', '.edit', loadContact);
    $('.edit-contact').submit(saveChanges);
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

function addContact(event) {
    event.preventDefault();

    var contact = {
        id: id,
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

    id++;

    renderList();
}

function renderList() {
    var contacts = ContactStorage.get();
    var newList = [];

    for (var x = 0; x < contacts.length; x++) {
        var $contact = $('.template').clone();
        $contact.removeClass('template');

        $contact.find('button.edit').attr('data-id', contacts[x].id);
        $contact.find('button.delete').attr('data-id', contacts[x].id);
        $contact.find('img').attr('src', contacts[x].img);
        $contact.find('.name').text(contacts[x].name);
        $contact.find('.address').text(contacts[x].address);
        $contact.find('.phone').text(contacts[x].phone);
        $contact.find('.email').text(contacts[x].email);

        newList.push($contact);
    }

    $('.contacts').empty().append(newList);
}

function getCurrentId() {
    var contacts = ContactStorage.get();

    if (contacts.length === 0) {
        id = 0;
    } else {
        id = parseInt(contacts[contacts.length - 1]['id']) + 1;
    }
}

function deleteContact() {
    index = $(this).attr('data-id');

    var contacts = ContactStorage.get();

    if (contacts.length === 1) {
        localStorage.clear();
    } else {
        contacts.splice(index, 1);
        ContactStorage.write(contacts);
    }

    renderList();
}

function loadContact() {
    index = $(this).attr('data-id');

    var contacts = ContactStorage.get();
    var contact = contacts[index];

    $('#edit-image').val(contact.img);
    $('#edit-name').val(contact.name);
    $('#edit-address').val(contact.address);
    $('#edit-phone').val(contact.phone);
    $('#edit-email').val(contact.email);
}

function saveChanges(event) {
    event.preventDefault();

    var contact = {
        id: index,
        name: $('#edit-name').val(),
        address: $('#edit-address').val(),
        email: $('#edit-email').val(),
        phone: $('#edit-phone').val(),
        img: $('#edit-image').val()
    };

    $('#edit-name').val('');
    $('#edit-address').val('');
    $('#edit-email').val('');
    $('#edit-phone').val('');
    $('#edit-image').val('');

    var contacts = ContactStorage.get();
    contacts[index] = contact;
    ContactStorage.write(contacts);

    $('#editModal').modal('toggle');

    renderList();
}