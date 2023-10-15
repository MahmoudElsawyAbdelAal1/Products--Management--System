let title = document.getElementById('TITLE');
let price = document.getElementById('PRICE');
let taxes = document.getElementById('TAXES');
let ads = document.getElementById('ADS');
let discount = document.getElementById('DISCOUNT');
let total = document.getElementById('total');
let count = document.getElementById('count');
let gategory = document.getElementById('GATEGORY');
let create = document.getElementById('create');
let deleteAll = document.getElementById('deleteAll');
let tbody = document.getElementById('tbody');
let mood = 'create'
let tmp = 0;
let search = document.getElementById('search');
let searchMood;


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////الله اكبر ولله الحمد /////////////////////////////////////////////////////////                  
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

let productArray;
if (localStorage.prodcut != null) {

    productArray = JSON.parse(localStorage.prodcut);
}
else {

    productArray = [];

}
//1:getTotal/trou
let getTotal = function () {
    if (price.value != '') {

        total.innerHTML = (+price.value + +taxes.value + +ads.value) - +discount.value;
        total.style.backgroundColor = '#040';
    }
    else {
        total.innerHTML = '';
        total.style.backgroundColor = '#a00d02';

    }
}
//2:createProduct
create.onclick = function () {
    let productOpject = {

        title: title.value,
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        total: total.innerHTML,
        discount: discount.value,
        gategory: gategory.value,
        count: count.value,
    }
     //11:cleanData
    if (title.value != '' && price.value != '' && taxes.value != '' && ads.value != '' && discount.value != '' && gategory.value != ''&&count.value<100) {

        if (mood === 'create') {
            //count
            if (productOpject.count > 1) {

                for (let i = 0; i < productOpject.count; i++) {

                    productArray.push(productOpject);

                }

            }
            else {

                productArray.push(productOpject);

            }
        }
        else {

            productArray[tmp] = productOpject;
            mood = 'create'
            count.style.display = ' block'
            create.innerHTML = 'create'

        }

        clearData();

    }
    
    




    //3:saveLocalStorage
    localStorage.setItem('prodcut', JSON.stringify(productArray));

    showData();
    getTotal();
    

}
//4:clearInputs
function clearData() {
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    total.innerHTML = '';
    discount.value = '';
    gategory.value = '';
    count.value = '';
}
//5:read
function showData() {

    let table = '';

    for (let i = 0; i < productArray.length; i++) {

        table += `
        <tr>
              <td style="padding-left: 0px;">${i + 1}</td>
              <td>${productArray[i].title}</td>
              <td>${productArray[i].price}</td>
              <td>${productArray[i].taxes}</td>
              <td>${productArray[i].ads}</td>
              <td>${productArray[i].total}</td>
              <td>${productArray[i].discount}</td>
              <td>${productArray[i].gategory}</td>
              <td><button  onclick="updateOnProduct(${i})"    style="padding: 2px 5px ; margin:10px 0px" >Update</button></td>
              <td style="padding-right: 0px"><button  onclick="deleteOnProduct(${i})"    style="padding: 2px 5px ; margin:10px 0px" >Delete</button></td>
        </tr>

        `
    }
    tbody.innerHTML = table; //ask in

    if (productArray.length > 0) {

        deleteAll.innerHTML = `
  
           <button onclick="deleteAllData()"  style="width: 100%; margin:8px 0px "> deleteAll(${productArray.length}) </button>
           `
    }
    else {

        deleteAll.innerHTML = '';
    }
}
showData();
//6:delete
function deleteOnProduct(i) {

    productArray.splice(i, 1);
    localStorage.prodcut = JSON.stringify(productArray);
    showData();
}

//7deleteAll
function deleteAllData() {
    productArray = [];
    localStorage.clear();
    showData();


}
//9:update

function updateOnProduct(i) {
    title.value = productArray[i].title;
    price.value = productArray[i].price;
    taxes.value = productArray[i].taxes;
    ads.value = productArray[i].ads;
    discount.value = productArray[i].discount;
    gategory.value = productArray[i].gategory;
    getTotal();
    count.style.display = 'none';
    create.innerHTML = 'Update';
    mood = 'update';
    tmp = i;
    scroll({
        top: 0,
        behavior: "smooth",

    })



}
//10:search
search.onkeyup = function () {

    let table = '';

    if (searchMood === 'Search By TITLE') {

        for (let i = 0; i < productArray.length; i++) {

            if (productArray[i].title.includes(search.value.toLowerCase())) {

                table += `
                <tr>
                      <td>${i + 1}</td>
                      <td>${productArray[i].title}</td>
                      <td>${productArray[i].price}</td>
                      <td>${productArray[i].taxes}</td>
                      <td>${productArray[i].ads}</td>
                      <td>${productArray[i].total}</td>
                      <td>${productArray[i].discount}</td>
                      <td>${productArray[i].gategory}</td>
                      <td><button  onclick="updateOnProduct(${i})"    style="padding: 2px 5px ; margin:10px 0px" >Update</button></td>
                      <td><button  onclick="deleteOnProduct(${i})"    style="padding: 2px 5px ; margin:10px 0px" >Delete</button></td>
                </tr>
        
                `



            }

        }


    }
    else {

        for (let i = 0; i < productArray.length; i++) {

            if (productArray[i].gategory.includes(search.value.toLowerCase())) {

                table += `
                <tr>
                      <td>${i + 1}</td>
                      <td>${productArray[i].title}</td>
                      <td>${productArray[i].price}</td>
                      <td>${productArray[i].taxes}</td>
                      <td>${productArray[i].ads}</td>
                      <td>${productArray[i].total}</td>
                      <td>${productArray[i].discount}</td>
                      <td>${productArray[i].gategory}</td>
                      <td><button  onclick="updateOnProduct(${i})"    style="padding: 2px 5px ; margin:10px 0px" >Update</button></td>
                      <td><button  onclick="deleteOnProduct(${i})"    style="padding: 2px 5px ; margin:10px 0px" >Delete</button></td>
                </tr>
        
                `



            }

        }




    }

    tbody.innerHTML = table; //ask in

}
function getSearchType(id) {
    searchMood = id;
    search.focus();
    search.value = ''


}