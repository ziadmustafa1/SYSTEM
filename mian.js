let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let count = document.getElementById('count');
let category = document.getElementById('category');
let sabmeet = document.getElementById('sabmeet');
let Total = document.getElementById('Total');
let mood = 'create';
let temp;

//get total
function getTotal() {
  if (price.value != '') {
    let result = (+price.value + +taxes.value + +ads.value) - +discount.value;
    Total.innerHTML = result;
    Total.style.background = '#040';
  } else {
    Total.innerHTML = '';
    Total.style.background = '#a00d02';
  }
}

// cret prodact
let datapro;
if (localStorage.product != null) {
  datapro = JSON.parse(localStorage.product)
} else {
  datapro = [];
}

sabmeet.onclick = function () {
  let newpro = {
    title: title.value.toLowerCase(),
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    Total: Total.innerHTML,
    count: count.value,
    category: category.value.toLowerCase(),
  }
  if (title.value != '' && newpro.count < 101) {
    if (mood === 'create') {
      if (newpro.count > 1) {
        for (let i = 0; i < newpro.count; i++) {
          datapro.push(newpro);
        }
      } else {
        datapro.push(newpro);
      }
    } else {
      datapro[temp] = newpro;
      mood = 'create';
      sabmeet.innerHTML = 'create';
      count.style.display = 'block';
    }
    clearData();
  }


  // save localstore
  localStorage.setItem('product', JSON.stringify(datapro));

  showdata();
}


// clear inputs
function clearData() {
  title.value = '';
  price.value = '';
  taxes.value = '';
  ads.value = '';
  discount.value = '';
  count.value = '';
  category.value = '';
  Total.innerHTML = '';
};

// read
function showdata() {
  getTotal();
  let table = '';
  for (let i = 0; i < datapro.length; i++) {
    table += `
            <tr>
                <td>${i + 1}</td>
                <td>${datapro[i].title}</td>
                <td>${datapro[i].price}</td>
                <td>${datapro[i].taxes}</td>
                <td>${datapro[i].ads}</td>
                <td>${datapro[i].discount}</td>
                <td>${datapro[i].count}</td>
                <td>${datapro[i].category}</td>
                <td><button onclick ="update(${i})" id="update" class="px-5 h-10 text-1xl bg-fuchsia-950 hover:tracking-wider hover:bg-fuchsia-900 text-white rounded-full">update</button></td>
                <td><button onclick ="deletedata(${i})" id="delete" class="px-5 h-10 text-1xl bg-fuchsia-950 hover:tracking-wider hover:bg-fuchsia-900 text-white rounded-full">delete</button></td>
            </tr>`;
  }
  let tbody = document.getElementById('tbody');
  if (tbody) {
    tbody.innerHTML = table;
  }
  let deleteAll = document.getElementById('deleteAll');
  if (datapro.length > 0) {
    deleteAll.innerHTML = '<button onclick ="deleteAll()" class="px-5 mt-5 h-10 text-1xl bg-fuchsia-950 w-full hover:tracking-wider hover:bg-fuchsia-900 text-white rounded-full">Delete All (' + datapro.length + ')</button>';
  } else {
    deleteAll.innerHTML = '';
  }
}

// cauont
// delete
function deletedata(i) {
  datapro.splice(i, 1);
  localStorage.product = JSON.stringify(datapro)
  showdata()
}

function deleteAll() {
  localStorage.clear()
  datapro.splice(0, datapro.length);
  showdata()
}
// update

function update(i) {
  title.value = datapro[i].title;
  price.value = datapro[i].price;
  taxes.value = datapro[i].taxes;
  ads.value = datapro[i].ads;
  discount.value = datapro[i].discount;
  getTotal()
  count.style.display = 'none'
  category.value = datapro[i].category;
  sabmeet.innerHTML = 'update';
  mood = 'create';
  temp = i;
  scroll({
    top: 0,
    behavior: "smooth"
  })
}


// search
let search = document.getElementById("search");
let searchmood = 'title';

function getserchmood(id) {
  if (id == 'searchtitle') {
    searchmood = 'title';

  } else {
    searchmood = 'category';


    search.value = '';
    showdata();
  }
  search.placeholder = 'search by ' + searchmood;
  search.focus()
}

function searchdata(value) {
  let table = '';
  for (let i = 0; i < datapro.length; i++)
    if (searchmood == 'title') {
      {
        if (datapro[i].title.includes(value.toLowerCase())) {
          table += `<tr>
                    <td>${i + 1}</td>
                    <td>${datapro[i].title}</td>
                    <td>${datapro[i].price}</td>
                    <td>${datapro[i].taxes}</td>
                    <td>${datapro[i].ads}</td>
                    <td>${datapro[i].discount}</td>
                    <td>${datapro[i].total}</td>
                  </tr>`;
        }
      }
    } else if (searchmood == 'price') {
      {
        if (datapro[i].category.includes(value.toLowerCase())) {
          table += `<tr>
                    <td>${i + 1}</td>
                    <td>${datapro[i].title}</td>
                    <td>${datapro[i].price}</td>
                    <td>${datapro[i].taxes}</td>
                    <td>${datapro[i].ads}</td>
                    <td>${datapro[i].discount}</td>
                    <td>${datapro[i].total}</td>
                  </tr>`;
        }
      }
    }
  document.getElementById('tbody').innerHTML = table;
}


// celan data