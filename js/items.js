// استدعاء الكورسات المخزنة في المتجر
const DrinksInShop = localStorage.getItem("DrinksInShop") // استدعاء القيم المخزنة
const AllDrink = document.querySelector(".Drinks") // سيتم هنا إضافة الكورسات

// إذا كانت الكورسات موجودة، رسمها
if (DrinksInShop) {
    const item = JSON.parse(DrinksInShop) // تحويل البيانات من JSON
    drawDrinks(item) // رسم الكورسات إذا كانت البيانات موجودة
}

// دالة لرسم الكورسات في الصفحة
function drawDrinks(Drinks) {
    const x = Drinks.map((item) => {
        return `
            <div class="col-md-6" id="drink-${item.id}"> <!-- إضافة بادئة 'drink-' للـ ID -->
                <div class="card mb-3" style="max-width: 540px;">
                    <div class="row g-0">
                        <div class="col-md-4">
                            <img src="${item.imageUrl}" class="card-img-top" alt="${item.title} coffe">
                        </div>
                        <div class="col-md-8">
                            <div class="card-body font">
                                <h5 class="fw-bold"> Name: ${item.title}</h5>
                                <p class="fw-bold">Price: ${item.price}</p>
                                <p class="fw-bold">Rating: ${item.rate}</p>
                                <div class="action d-flex justify-content-between align-items-center font">
                                    <div class="plusAndMinus">
                                        <i class="fas fa-minus text-danger colorfav countMinus" onclick="minusDrink(${item.id})"></i>
                                        <span class="count" id="countNum-${item.id}">${item.count}</span>
                                        <i class="fas fa-plus text-primary colorfav countPlus" onclick="plusDrink(${item.id})"></i>
                                    </div>
                                    <button class="btn btn-outline-danger" onclick="Remove(${item.id})">Delete Item</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `
    }).join('')
    AllDrink.innerHTML = `<div class="row">${x}</div>` // إضافة الكورسات إلى الصفحة
}

// الدالة Remove تستخدم لإزالة عنصر من الصفحة بناءً على الـ ID الخاص به
function Remove(id) {
    // حذف العنصر من DOM
    const removedItem = document.getElementById(`drink-${id}`)
    if (removedItem) {
        const priceText = removedItem.querySelector('p').textContent // احصل على النص الموجود في الفقرة
        const price = parseFloat(priceText.split(': ')[1]) // احصل على الرقم فقط
        removedItem.remove() // إزالة العنصر من الواجهة

        // تحديث البيانات في localStorage
        const DrinksInShop = localStorage.getItem("DrinksInShop")
        if (DrinksInShop) {
            const items = JSON.parse(DrinksInShop)
            // حذف العنصر من المصفوفة
            const updatedDrinks = items.filter(drink => drink.id !== id)
            // تخزين البيانات المحدثة في localStorage
            localStorage.setItem("DrinksInShop", JSON.stringify(updatedDrinks))

            // تحديث السعر الإجمالي بعد الحذف
            let getTotalPrice = parseFloat(localStorage.getItem("totalPrice")) || 0
            getTotalPrice -= price // تقليل السعر
            localStorage.setItem("totalPrice", getTotalPrice) // تخزين السعر الجديد

            // تحديث العرض
            updateTotalPrice() // تحديث السعر المعروض
        }
    }
}

// استدعاء updateTotalPrice لعرض السعر عند تحميل الصفحة
updateTotalPrice()

function updateTotalPrice() {
    // الحصول على السعر الإجمالي من localStorage أو تعيينه إلى 0 إذا لم يكن موجودًا
    const getTotalPrice = parseFloat(localStorage.getItem("totalPrice")) || 0

    const showPrice = document.querySelector(".totalprice")
    const priceSpan = showPrice.querySelector("span")

    if (getTotalPrice > 0) {
        showPrice.style.display = "block" // إظهار السعر
        priceSpan.innerHTML = getTotalPrice + " $" // عرض السعر
        console.log("Current total price: " + getTotalPrice)
    } else {
        showPrice.style.display = "none" // إخفاء العنصر إذا لم تكن هناك قيمة
    }
}

// دالة لزيادة الكمية
function plusDrink(id) {
    let xPlus = localStorage.getItem("DrinksInShop") ? JSON.parse(localStorage.getItem("DrinksInShop")) : []
    let totalPrice = parseFloat(localStorage.getItem("totalPrice")) || 0

    xPlus.forEach((ele) => {
        if (ele.id == id) {
            price = parseFloat(ele.price.replace('$', '')) // الحصول على السعر
            totalPrice += price // زيادة السعر الإجمالي
            ele.count += 1

            // تحديث الكمية في الصفحة
            document.getElementById(`countNum-${id}`).textContent = ele.count
        }
    })

    localStorage.setItem("DrinksInShop", JSON.stringify(xPlus))
    localStorage.setItem("totalPrice", totalPrice) //localStorage تحديث السعر الإجمالي في 
    updateTotalPrice() // تحديث عرض السعر
}

// دالة لتقليل الكمية
function minusDrink(id) {
    let xMinus = localStorage.getItem("DrinksInShop") ? JSON.parse(localStorage.getItem("DrinksInShop")) : []
    let totalPrice = parseFloat(localStorage.getItem("totalPrice")) || 0

    xMinus.forEach((ele, index) => {
        if (ele.id == id) {
            price = parseFloat(ele.price.replace('$', '')) // الحصول على السعر
            ele.count -= 1
            if (ele.count <= 0) { // إذا كانت الكمية أقل من أو تساوي 0
                totalPrice -= price // تقليل السعر الإجمالي
                xMinus.splice(index, 1) // حذف الكورس من المصفوفة
                document.getElementById(`drink-${id}`).remove() // إزالة العنصر من الواجهة
            } else {
                totalPrice -= price // تقليل السعر الإجمالي
                document.getElementById(`countNum-${id}`).textContent = ele.count // تحديث الكمية
            }
        }
    })

    localStorage.setItem("DrinksInShop", JSON.stringify(xMinus))
    localStorage.setItem("totalPrice", totalPrice) // localStorage تحديث السعر الإجمالي في 
    updateTotalPrice() // تحديث عرض السعر
}

// تهيئة Swiper
var swiper = new Swiper(".mySwiper", {
    slidesPerView: 3,
    spaceBetween: 30,
    freeMode: true,
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
})

// رسم الدورات المفضلة
let favinShop = localStorage.getItem("favinShop")
let favDrinks = document.querySelector(".swiper-wrapper") // المكان الذي ستعرض فيه المفضلة

if (favinShop) {
    let itemfav = JSON.parse(favinShop)
    drawDrinksfav(itemfav) // رسم المفضلة إذا كانت البيانات موجودة
}

// دالة لرسم الكورسات المفضلة
function drawDrinksfav(Drinks) {
    let x = Drinks.map((item) => {
        return `
            <div class="swiper-slide" id="fav-${item.id}"> <!-- إضافة بادئة 'fav-' للـ ID -->
                <div class="card card1 mx-auto" style="width: 18rem;">
                    <img src="${item.imageUrl}" class="card-img-top" alt="${item.title}coffee">
                    <div class="font card-body d-flex flex-column">
                        <div class="d-flex justify-content-between align-items-center">
                            <div>
                                <h5 class="fw-bold"> Name: ${item.title}</h5>
                                <p class="fw-bold">Price: ${item.price}</p>
                            </div>
                            <i class="fas fa-heart ms-auto fs-3 text-danger colorfav" onclick="Removefav(${item.id})"></i>
                        </div>
                    </div>
                </div>
            </div>
        `
    }).join('')
    favDrinks.innerHTML = x // إضافة الكورسات المفضلة إلى الصفحة
}

// الدالة Removefav تستخدم لإزالة عنصر من الصفحة بناءً على الـ ID الخاص به
function Removefav(id) {
    let removedItem = document.getElementById(`fav-${id}`) // استخدام الـ ID المضاف
    if (removedItem) {
        removedItem.remove() // إزالة العنصر من الواجهة
    }

    // localStorage تحديث البيانات في 
    let DrinksInShop = localStorage.getItem("favinShop")
    if (DrinksInShop) {
        let item = JSON.parse(DrinksInShop)
        // حذف العنصر من المصفوفة
        let updatefav = item.filter(drink => drink.id !== id)
        // localStorage تخزين البيانات المحدثة في 
        localStorage.setItem("favinShop", JSON.stringify(updatefav))
    }
}