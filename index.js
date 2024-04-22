
var BookmarkName = document.getElementById('BookmarkName');
var WebsiteURL = document.getElementById('WebsiteURL');
var fixedlayer = document.querySelector('.fixedlayer');
var closeBtn = document.getElementById('closeBtn');
var Submit = document.querySelector('.Submit');

var tbody = document.getElementById('tbody');


if (localStorage.getItem('Bookmarks') !== null) {
    var allBookmarks = JSON.parse(localStorage.getItem('Bookmarks'));
    DisplayBookMark();
}
else {
    var allBookmarks = [];
}

// ========================================creat Bookmark========================================

function creatBookmark() {

    var Bookmark = {
        BookmarkValue: BookmarkName.value,
        WebsiteValue: WebsiteURL.value
    }



    if (validateSiteName() && validateWebsiteURL()) {

        allBookmarks.push(Bookmark);
        var stringDate = JSON.stringify(allBookmarks);
        localStorage.setItem('Bookmarks', stringDate);

        clearForm();
        RetriveBookMark();

    }
    else {
        fixedlayer.classList.replace('d-none', 'd-flex')
        BookmarkName.classList.remove('is-invalid');
        WebsiteURL.classList.remove('is-invalid');

    }


    console.log(allBookmarks);

}

Submit.addEventListener('click', function (e) {
    e.preventDefault();
    creatBookmark();
});

// ========================================clear Form========================================

function clearForm() {
    BookmarkName.value = '';
    WebsiteURL.value = '';
}

// =====================================Retrive BookMark=====================================

function RetriveBookMark() {

    var trs = '';

    for (var i = 0; i < allBookmarks.length; i++) {
        trs = `<tr>
        <td>${i}</td>
        <td>${allBookmarks[i].BookmarkValue}</td>
        <td><a href="https://${allBookmarks[i].WebsiteValue}" target="_blank"><button type="button" class="btn btn-primary py-1 px-3"><i class="fa-solid fa-eye me-2"></i>Visit</button></a></td>
        <td><button type="button" class="btn btn-danger py-1 px-3" onclick="DeleteBookMark(${i});"><i class="fa-solid fa-trash me-2"></i>Delete</button></td>
        </tr>`
    }
    tbody.innerHTML += trs;
}

// =====================================Display BookMark=====================================

function DisplayBookMark() {

    var trs = '';

    for (var i = 0; i < allBookmarks.length; i++) {

        trs += `<tr>
     <td>${i}</td>
     <td>${allBookmarks[i].BookmarkValue}</td>
     <td><a href="https://${allBookmarks[i].WebsiteValue}" target="_blank"><button type="button" class="btn btn-primary py-1 px-3"><i class="fa-solid fa-eye me-2"></i>Visit</button></a></td>
     <td><button type="button" class="btn btn-danger py-1 px-3" onclick="DeleteBookMark(${i});"><i class="fa-solid fa-trash me-2"></i>Delete</button></td>
     </tr>`
    }
    tbody.innerHTML = trs;
}

// =====================================Delete BookMark=====================================

function DeleteBookMark(index) {

    allBookmarks.splice(index, 1);
    DisplayBookMark();
    localStorage.setItem('Bookmarks', JSON.stringify(allBookmarks));

}

// ==================================validate Site===================================

function validateSiteName() {

    var siteregex = /^[A-Z][a-z]{3,15}$/;
    var pname = BookmarkName.value;

    if (siteregex.test(pname)) {

        BookmarkName.classList.add('is-valid');
        BookmarkName.classList.remove('is-invalid');
        return true;
    }
    else {

        BookmarkName.classList.add('is-invalid');
        return false;
    }

}

BookmarkName.addEventListener('input', validateSiteName)
closeBtn.addEventListener('click', validateSiteName);

// ==================================validate URL===================================

function validateWebsiteURL() {

    var URLregex = /^(www.)[a-z]+(.com)$/;
    var pURL = WebsiteURL.value;

    if (URLregex.test(pURL)) {

        WebsiteURL.classList.add('is-valid');
        WebsiteURL.classList.remove('is-invalid');
        return true;
    }
    else {

        WebsiteURL.classList.add('is-invalid');
        return false;
    }

}

WebsiteURL.addEventListener('input', validateWebsiteURL)
closeBtn.addEventListener('click', validateWebsiteURL);

// ==================================close button===================================

closeBtn.addEventListener('click', function () {
    fixedlayer.classList.replace('d-flex', 'd-none')
})

