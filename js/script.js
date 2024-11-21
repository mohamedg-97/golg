let AllDrink = document.querySelector(".Drinks") // هنا هيتم اضافه كل الكورسات
let Drinks = [
    {
        id: 1,
        title: "Salted Caramel Latte",
        price: "10$",
        rate: "★★★☆☆",
        imageUrl: "images/Salted caramel latte.jpeg",
        count: 1
    },
    {
        id: 2,
        title: "Turkish Coffee",
        price: "17$",
        rate: "★★★★☆",
        imageUrl: "images/Turkish coffee.jpeg",
        count: 1
    },
    {
        id: 3,
        title: "White Chocolate Mocha",
        price: "15$",
        rate: "★★★★☆",
        imageUrl: "images/White Chocolate Mocha.jpeg",
        count: 1
    },
    {
        id: 4,
        title: "Apple Cider Tea",
        price: "33$",
        rate: "★★★☆☆",
        imageUrl: "images/Apple cider tea.jpeg",
        count: 1
    },
    {
        id: 5,
        title: "Hot Chocolate",
        price: "25$",
        rate: "★★★☆☆",
        imageUrl: "images/Hot chocolate.jpeg",
        count: 1
    },
    {
        id: 6,
        title: "Carmel Frappe",
        price: "45$",
        rate: "★★★★☆",
        imageUrl: "images/Carmel frappe.jpeg",
        count: 1
    },
    {
        id: 7,
        title: "Espresso",
        price: "27$",
        rate: "★★★☆☆",
        imageUrl: "images/Espresso.jpeg",
        count: 1
    },
    {
        id: 8,
        title: "Black Tea",
        price: "19$",
        rate: "★★★☆☆",
        imageUrl: "images/Black tea.jpeg",
        count: 1
    },
    {
        id: 9,
        title: "Cappuccino",
        price: "15$",
        rate: "★★★☆☆",
        imageUrl: "images/Cappuccino.jpeg",
        count: 1
    }
]

function drawDrinks() {
    let x = Drinks.map((item) => {
        return `
            <div class="col-12 col-sm-4">
                <div class="card card1 mx-auto" style="width: 18rem;" data-aos="fade-up">
                    <img src="${item.imageUrl}" class="card-img-top" alt="${item.title} Coffee">
                    <div class="font card-body z-1">
                        <h5 class="fw-bold">Name: ${item.title}</h5>
                        <p class="fw-bold">Price: ${item.price}</p>
                        <p class="fw-bold">Rating: ${item.rate}</p>    
                        <div class="action d-flex justify-content-between align-items-center">
                            <button class="btn btn-outline-primary" id="purchase-${item.id}" data-price="${item.price}" onclick="ADD(${item.id})">Shop Coffee</button>
                            <i id="favcolor-${item.id}" class="fas fa-heart ms-auto fs-4 text-secondary colorfav" onclick="fav(${item.id})"></i>
                        </div>
                    </div>
                </div>
            </div>
        `
    }).join('')
    AllDrink.innerHTML = `<div class="row g-3 mb-3">${x}</div>`
}
drawDrinks()

let titleDrinks = document.querySelector(".items_drink div") // كدا عرفت العنصر اللي هيتحط فيه عاسماء الكورسات اللي عاوزها
let badge = document.querySelector(".badge") // المكان اللي هيظهر فيه عدد الكورسات اللي اخترتها 

let addItem = localStorage.getItem("DrinksInShop") ? JSON.parse(localStorage.getItem("DrinksInShop")) : []
if (addItem) {
    addItem.map(item => {
        titleDrinks.innerHTML += `
                                    <p>${item.title}
                                    <i class="fas fa-minus text-danger fs-6 m-lg-0 countMinus" onClick="minusDrink(${item.id})"></i>
                                    <span class="count">${item.count}</span>
                                    <i class="fas fa-plus text-primary fs-6 m-lg-0 countPlus" onClick="plusDrink(${item.id})"></i>
                                    <hr>
                                    </p>`
    })
    badge.style.display = "block"
    badge.innerHTML = addItem.length
}

// استرجاع السعر الإجمالي الحالي من localStorage أو تعيينه إلى 0 إذا لم يكن موجودًا
let totalPrice = localStorage.getItem("totalPrice") ? parseFloat(localStorage.getItem("totalPrice")) : 0

// تحديث القيمة المعروضة للسعر الإجمالي عند التحميل أو إعادة التحميل
function refreshPrice() {
    let storedTotal = localStorage.getItem("totalPrice")
    totalPrice = storedTotal ? parseFloat(storedTotal) : 0
    // console.log("Total Price after refresh:", totalPrice)
}

refreshPrice() // تحديث السعر الإجمالي عند التحميل

function ADD(id) {
    if (localStorage.getItem("First Name") && localStorage.getItem("Last Name")) {
        let choseItem = Drinks.find((item) => item.id === id)

        // التأكد من أن العدد الافتراضي هو 1 عند الإضافة لأول مرة
        choseItem.count = 1

        // التحقق إذا كان العنصر موجودًا بالفعل في الكارت، لتجنب تكرار الإضافة
        if (!addItem.some(item => item.id === choseItem.id)) {
            addItem = [...addItem, choseItem]
            localStorage.setItem("DrinksInShop", JSON.stringify(addItem))

            // تحديث السعر الإجمالي
            let price = parseFloat(choseItem.price.replace('$', ''))
            totalPrice += price
            localStorage.setItem("totalPrice", totalPrice)

            // تحديث العرض مباشرةً بعد الإضافة
            updateDrinkDisplay(addItem)
        }
    } else {
        window.location = "login.html"
    }
}

let ShoppingCartIcon = document.querySelector(".cartIcon")
let ShowHeddin = document.querySelector(".items_drink")

ShoppingCartIcon.addEventListener("click", Show)
function Show() {
    if (titleDrinks.innerHTML != "") {
        if (ShowHeddin.style.display == "block") {
            ShowHeddin.style.display = "none"
        } else {
            ShowHeddin.style.display = "block"
        }
    }
}

// countPlusAndMinus...................................................................................................
function updateDrinkDisplay(drinks) {
    titleDrinks.innerHTML = ""
    drinks.forEach((ele) => {
        titleDrinks.innerHTML += `<p>${ele.title}
                                    <i class="fas fa-minus text-danger fs-6 m-lg-0 countMinus" onClick="minusDrink(${ele.id})"></i>
                                    <span class="count">${ele.count}</span>
                                    <i class="fas fa-plus  text-primary fs-6 m-lg-0 countPlus" onClick="plusDrink(${ele.id})"></i>
                                    </p>`
    })
    badge.innerHTML = drinks.length
    badge.style.display = drinks.length ? "block" : "none"
}

function plusDrink(id) {
    let xPlus = localStorage.getItem("DrinksInShop") ? JSON.parse(localStorage.getItem("DrinksInShop")) : []
    let price

    xPlus.forEach((ele) => {
        if (ele.id == id) {
            price = parseFloat(ele.price.replace('$', '')) // الحصول على السعر
            totalPrice += price // زيادة السعر الإجمالي
            ele.count += 1
        }
    })
    updateDrinkDisplay(xPlus)
    localStorage.setItem("DrinksInShop", JSON.stringify(xPlus))
    localStorage.setItem("totalPrice", totalPrice) // localStorage تحديث السعر الإجمالي في 
}

function minusDrink(id) {
    let xMinus = localStorage.getItem("DrinksInShop") ? JSON.parse(localStorage.getItem("DrinksInShop")) : []

    xMinus.forEach((ele, index) => {
        if (ele.id == id) {
            price = parseFloat(ele.price.replace('$', '')) // الحصول على السعر
            ele.count -= 1
            if (ele.count === 0) {
                totalPrice -= price // تقليل السعر الإجمالي
                xMinus.splice(index, 1)
            } else {
                totalPrice -= price // تقليل السعر الإجمالي
            }
        }
    })
    updateDrinkDisplay(xMinus)
    localStorage.setItem("DrinksInShop", JSON.stringify(xMinus))
    localStorage.setItem("totalPrice", totalPrice) // localStorage تحديث السعر الإجمالي في 
}

// favourite.............................................................................................................
let countFvColor = 0
let addItemfav = localStorage.getItem("favinShop") ? JSON.parse(localStorage.getItem("favinShop")) : []

// الحفاظ على حالة الأيقونات الملونة عند تحميل الصفحة
function restoreFavIcons() {
    addItemfav.forEach(item => {
        let iconFvColor = document.querySelector(`#favcolor-${item.id}`)
        if (iconFvColor) {
            iconFvColor.classList.add('text-danger') // تلوين أيقونة المفضلة
        }
    })
}

// استدعاء الوظيفة عند التحميل
restoreFavIcons()

function fav(id) {
    if (localStorage.getItem("First Name") && localStorage.getItem("Last Name")) {
        let choseItem = Drinks.find((item) => item.id === id)
        let iconFvColor = document.querySelector(`#favcolor-${choseItem.id}`)

        if (addItemfav.some(item => item.id === choseItem.id)) {
            addItemfav = addItemfav.filter(item => item.id !== choseItem.id)
            iconFvColor.classList.remove('text-danger')
            countFvColor-- // تقليل عدد العناصر المفضلة
        } else {
            addItemfav = [...addItemfav, choseItem]
            iconFvColor.classList.add('text-danger')
            countFvColor++ // زيادة عدد العناصر المفضلة
        }
        localStorage.setItem("favinShop", JSON.stringify(addItemfav)) // localStorage حفظ المفضلة في 
    } else {
        window.location = "login.html"
    }
}


// search.............................................................................................................
let searchMode = 'name'

function getSearchMood(selectedValue) {
    let search = document.querySelector(".form-control")
    if (selectedValue === 'name') {
        searchMode = 'name'
    } else {
        searchMode = 'price'
    }
    search.placeholder = 'Search By ' + searchMode
    search.focus()
    search.value = ''
    drawDrinks()
}

function searchDrinks(value) {
    let results = '' // مصفوفة لتخزين النتائج
    for (let i = 0; i < Drinks.length; i++) {

        if (searchMode == 'name') {
            if (Drinks[i].title.includes(value)) {
                results += `
                    <div class="col-12 col-sm-4">
                        <div class="card card1 mx-auto" style="width: 18rem;">
                            <img src="${Drinks[i].imageUrl}" class="card-img-top" alt="${Drinks[i].title} coffee">
                            <div class="font card-body z-1">
                                <h5 class="fw-bold">Name: ${Drinks[i].title}</h5>
                                <p fw-bold>Price: ${Drinks[i].price}</p>
                                <p fw-bold>Rating: ${Drinks[i].rate}</p>
                                <div class="action d-flex justify-content-between align-items-center">
                                    <button class="btn btn-outline-primary" id="purchase-${Drinks[i].id}" data-price="${Drinks[i].price}" onclick="ADD(${Drinks[i].id})">Shop Coffee</button>
                                    <i id="favcolor-${Drinks[i].id}" class="fas fa-heart ms-auto fs-4 text-secondary colorfav" onclick="fav(${Drinks[i].id})"></i>
                                </div>
                            </div>
                        </div>
                    </div>`
            }
        } else {
            if (Drinks[i].price.includes(value)) {
                results += `
                    <div class="col-12 col-sm-4">
                        <div class="card card1 mx-auto" style="width: 18rem;">
                            <img src="${Drinks[i].imageUrl}" class="card-img-top" alt="${Drinks[i].title} coffee">
                            <div class="font card-body z-1">
                                <h5 class="fw-bold"> Name: ${Drinks[i].title}</h5>
                                <p fw-bold>Price: ${Drinks[i].price}</p>
                                <p fw-bold>Rating: ${Drinks[i].rate}</p>
                                <div class="action d-flex justify-content-between align-items-center">
                                    <button class="btn btn-outline-primary" id="purchase-${Drinks[i].id}" data-price="${Drinks[i].price}" onclick="ADD(${Drinks[i].id})">Shop Coffee</button>
                                    <i id="favcolor-${Drinks[i].id}" class="fas fa-heart ms-auto fs-4 text-secondary colorfav" onclick="fav(${Drinks[i].id})"></i>
                                </div>
                            </div>
                        </div>
                    </div>`
            }
        }
    }
    AllDrink.innerHTML = `<div class="row g-3 mb-3">${results}</div>`
}