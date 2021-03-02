const products = [
    {
        name: 'Nike Dri-FIT',
        colors: '3 Colours',
        price: '27.99',
        category: "Men's t-shirt",
        productId: 0,
        description: `The Nike Dri-FIT Men's Training T-Shirt <br>
                      combines sweat-wicking fabric with a non-<br>
                      restrictive fit and feel that helps keep you<br>
                      comfortable throughout your entire workout.<br><br>`,
        image: 'front/0.jpg',
        images: ['ProductImages/0-1.jpg',
                 'ProductImages/0-2.jpg',
                 'ProductImages/0-3.jpg',
                 'ProductImages/0-4.jpg']
    },
    {
        name: 'The Tech',
        colors: '5 Colours',
        price: '99.99',
        category: "Men's hoodie",
        productId: 1,
        description: `The Nike Sportswear Tech Fleece Full-Zip Hoodie <br>
                      is made from a double-sided spacer fabric for <br>added
                      warmth without extra weight. A slightly taller collar
                      in the hood helps keep you dry<br> in cold, wet weather.`,
        image: 'front/1.jpg',
        images: ['ProductImages/1-1.jpg',
                 'ProductImages/1-2.jpg',
                 'ProductImages/1-3.jpg',
                 'ProductImages/1-4.jpg']
    },
    {
        name: 'Nike Jumpman',
        colors: '1 Colour',
        price: '32.99',
        category: "Men's t-shirt",
        productId: 2,
        description: `The Jordan Jumpman T-Shirt is made from soft,<br>
                      comfortable fabric for easy, all-day comfort.<br>
                      A large printed Jumpman says it all without words.
                      <br><br><br>`,
        image: 'front/2.jpg',
        images: ['ProductImages/2-1.jpg',
                 'ProductImages/2-2.jpg',
                 'ProductImages/2-3.jpg',
                 'ProductImages/2-4.jpg']
    },
    {
        name: 'Jordan HBR',
        colors: '2 Colours',
        price: '77.99',
        category: "Men's jacket",
        productId: 3,
        description: `A vision of flight. Bold colour combos and distinct<br>
                      design lines set the Jordan Jumpman Air Jacket <br>apart.
                      It's made from lightweight woven fabric that's partially 
                      lined with mesh.<br>A drawcord-adjustable hem customises the fit.`,
        image: 'front/3.jpg',
        images: ['ProductImages/3-1.jpg',
                 'ProductImages/3-2.jpg',
                 'ProductImages/3-3.jpg',
                 'ProductImages/3-4.jpg']
    },
    {
        name: 'Nike Polo',
        colors: '2 Colours',
        price: '27.99',
        category: "Men's t-shirt",
        productId: 4,
        description: `This isn't your average polo—it's The Nike Polo<br> Rafa.
                      Every detail, from its innovative, sweat-wicking fabric
                      to the hints of orange has been <br>thoughtfully crafted
                      to meet the needs of the everyday you.`,
        image: 'front/4.jpg',
        images: ['ProductImages/4-1.jpg',
                 'ProductImages/4-2.jpg',
                 'ProductImages/4-3.jpg',
                 'ProductImages/4-4.jpg']
    },
    {
        name: 'Dri-FIT Strike',
        colors: '3 Colours',
        price: '82.99',
        category: "Men's hoodie",
        productId: 5,
        description: `The Jordan AJ4 Graphic Fleece Pullover Hoodie<br>
                      uses a midweightFrench terry that's softly <br>
                      brushed on the inside. Bold colour-blocking and graphics,
                      plus a toggle on the hood drawcord<br> drive distinction.`,
        image: 'front/5.jpg',
        images: ['ProductImages/5-1.jpg',
                 'ProductImages/5-2.jpg',
                 'ProductImages/5-3.jpg',
                 'ProductImages/5-4.jpg']
    },
    {
        name: 'Jordan Air',
        colors: '3 Colours',
        price: '64.99',
        category: "Men's hoodie",
        productId: 6,
        description: `Adjust on the fly. The Jordan Jumpman Air Pullover
                      Hoodie has a toggle on the drawcord<br> that you can
                      quickly slide up or down to adjust<br> the hood opening.
                      <br><br>`,
        image: 'front/6.jpg',
        images: ['ProductImages/6-1.jpg',
                 'ProductImages/6-2.jpg',
                 'ProductImages/6-3.jpg',
                 'ProductImages/6-4.jpg']
    },
    {
        name: 'Therma Run',
        colors: '4 Colour',
        price: '49.99',
        category: "Men's shirt",
        productId: 7,
        description: `The Nike Dri-FIT Strike Drill Top is made from stretchy,
                      sweat-wicking fabric that keeps you<br> fast and dry.
                      The slim design and<br>thumbholes create a streamlined fit for speed.
                      <br><br>`,
        image: 'front/7.jpg',
        images: ['ProductImages/7-1.jpg',
                 'ProductImages/7-2.jpg',
                 'ProductImages/7-3.jpg',
                 'ProductImages/7-4.jpg']
    },
    {
        name: 'Air Max 2.0',
        colors: '3 Colours',
        price: '99.99',
        category: "Men's hoodie",
        productId: 8,
        description: `Stay comfortable before and after working out<br> in theJordan Air
                      Therma Hoodie. It's made from warm, flexible performance
                      fabric that's <br>comfortable and easy to move in.<br><br>`,
        image: 'front/8.jpg',
        images: ['ProductImages/8-1.jpg',
                 'ProductImages/8-2.jpg',
                 'ProductImages/8-3.jpg',
                 'ProductImages/8-4.jpg']
    }
] ;


//Assigning an onclick function for the buttons in the header, rendering the front page.
let homeButton = document.querySelectorAll('.home') ;
for ( let i = 0; i < homeButton.length; i ++ ) {
    homeButton[i].onclick = () => pageHandler('front') ;
}
//Assigning onlcik function on the cart button and also targeting the item number indicator on the cart icon.
//The innerHTML of the indicator is taken from the variable cartItems, which is hidden when the value is 0.
let cartButton = document.querySelector('#cart') ;
cartButton.onclick = () => pageHandler('cart') ;
let cartNumber = document.querySelector('#cartNumber') ;
let cartItems = 0 ;

//Those state is used for orienting the back button on the cart page.
let state = 0 ; 

//2 empty arrays initialized for handling the cart items.
let cartArray = [] ;
let quantitiesArray = [] ;

//This function is controlling the animation and switching between the page views. Uses switch statemtns and takes arguments from the buttons which is asigned to.
function pageHandler(pageId) {
    let footer = document.querySelector('footer') ;
    let content = document.querySelector('#content') ;
    if ( pageId == 'cart' ) {
        cartButton.style.transform = 'scale(1.2)' ;
            setTimeout( function () {
                cartButton.style.transform = 'scale(1)'
            }, 50) ;
        } ;
    footer.style.marginTop = '800px' ;
    content.style.left = '150px' ;
    content.style.opacity = '0.1' ;
    setTimeout( function() {
        content.style.opacity = '0' ;
        content.style.left = '-1700px' ;
    }, 200 ) ;
    setTimeout( function() {
        content.style.left = '0px'
        footer.style.marginTop = '' ;
        content.style.opacity = '1' ;
        switch ( pageId ) {
            case 'front': frontPage() ;        
            break ;
            case 'cart': cartPage() ;
            break ;
            default: productPage(pageId) ;
        } ;
    }, 500 ) ;
}

//Calling immediately the frontPage, so by default index.html has the frontPage content.
frontPage() ;
function frontPage() {
    state = 0 ;
    state2 = 0 ;
    let content = document.querySelector('#content') ;
    content.innerHTML = `
        <aside id="filters">
        <h1 class="filters">Categories</h1>
        <ul id="categories">
            <li><button>All Products</button></li>
            <li><button>T-Shirts</button></li>
            <li><button>Shirts</button></li>
            <li><button>Trousers</button></li>
            <li><button>Jeans</button></li>
            <li><button>Shoes</button></li>
            <li><button>Accessories</button></li>
        </ul>
        <h1 class="filters">Filter by</h1>
        <ul id="filter">
            <li><button>Extra Small</button></li>
            <li><button>Small</button></li>
            <li><button>Medium</button></li>
            <li><button>Large</button></li>
            <li><button>Extra Large</button></li>
            <li><button>2Extra Large</button></li>
        </ul>
        <h1 class="filters">Brands</h1>
        <ul>
            <li><button>Adidas</button></li>
            <li><button>Dickies</button></li>
            <li><button>Gucci</button></li>
            <li><button>Lacoste</button></li>
            <li><button>Levi's</button></li>
            <li><button>Nike</button></li>
            <li><button>Puma</button></li>
            <li><button>Supreme</button></li>
        </ul>
        </aside>
        <div id="pictures">
        
        </div>` ;


    //There are 3 rows with products on the page and they are created and appended with this loop.
    for ( let i = 0; i < 3; i ++ ) {
        let container = document.querySelector('#pictures') ;
        let row = document.createElement('div') ;
        row.classList.add('row') ;
        container.append(row) ;
            //For each row there are 3 items, so this inside loop is appending them.
            for ( а = 0; а < 3; а ++ ) {
                let cell = document.createElement('div') ;
                cell.classList.add('cell') ;
                let img = document.createElement('img') ;
                img.classList.add('img') ;
                let details = document.createElement('div') ;
                details.classList.add('details') ;
                let name = document.createElement('h3') ;
                name.classList.add('name') ;
                let colors = document.createElement('t') ;
                colors.classList.add('colors') ;
                let price = document.createElement('t') ;
                price.classList.add('price') ;
                let buyButton = document.createElement('button') ;
                buyButton.classList.add('buyButton') ;
                buyButton.innerHTML = `<i class="fas fa-cart-plus fa-2x"></i>`
                row.append(cell) ;
                cell.append(img, details) ;
                details.append(name, colors, price, buyButton) ;
            } ;
    } ;   

    //Targeting all elements created with class img and their info...
    let images = document.querySelectorAll('.img') ;
    let name = document.querySelectorAll('.name') ;
    let colors = document.querySelectorAll('.colors') ;
    let prices = document.querySelectorAll('.price') ;
    let buyButtons = document.querySelectorAll('.buyButton') ;

    //This loop is with the length of the targeted images array and puts the img paths and info from the products array.
    //On each of the images is assigned an onclick function, that passes the number of the loop as argument to the pageHandler function.
    //On all of the cart buttons is assigned addToCart function and again the number of the loop is passed.
    for ( let i = 0; i < images.length; i ++ ) {
        images[i].src = "front/" + i + ".jpg" ;
        name[i].innerHTML = products[i].name ;
        colors[i].innerHTML = products[i].colors ;
        prices[i].innerHTML = "€" + products[i].price ;
        images[i].onclick = () => pageHandler(i) ;
        buyButtons[i].onclick = () => addToCart(i) ;
    } ;

    //This function takes an argument from the pressed button and based on that, takes item from products array
    //and pushes it to the cartArray. Also animates the cart icons and adds 1 to the cartNumber which makes the count visible.
    //The quantitiesArray is used when the cartPage is loaded. This function just pushes 1 when an item is added.
    function addToCart(index) {
        let buyButtons = document.querySelectorAll('.buyButton') ;
        cartButton.style.transform = 'scale(1.2)' ;
        buyButtons[index].style.transform = 'scale(1.2)' ;
            setTimeout( function() {
                cartButton.style.transform = 'scale(1)' ;
                buyButtons[index].style.transform = 'scale(1)' ;
            }, 50) ;
        cartArray.push(products[index]) ;
        cartItems ++ ;
        quantitiesArray.push(1) ;
        cartNumber.innerHTML = cartItems ;
        cartNumber.classList.remove("hidden") ;
    }
    console.log(__dirname) ;
}//End of frontPage function


//This function takes an argument from the pageHandler function, depending on the clicked image and based on that, reads the picture paths and description
//for the product from the products array. Changes the content of the whole page with the product view.
//Changes the state, so that if we move to the cart from here, the back button on the cart page will know where to bring us.
function productPage(index) {
    state = index ;
    let content = document.querySelector('#content') ;
    content.innerHTML = `
            <div id = "navbar">
            <button id="move"><i class="fas fa-chevron-left"></i> Go back</button>
            <button class="navi">Categories</button>
            </select>
            <button class="navi">Filter by</button>
            <button class="navi">Brand</button>
            <button class="navi">Search</button>
            </div>
            <div id="contents">
                <div id="Description">
                <h1 id="catName"></h1>
                <h1 id="name"></h1>
                <h1 id="price"></h1>
                <div id="size">
                    <button class="size sizeOn">S</button>
                    <button class="size">M</button>
                    <button class="size">L</button>
                    <button class="size">XL</button>
                    <button class="size">2XL</button>
                </div>
                <p1 id="description"></p1>
                <button id="addToCart">Add to Cart</button>
                <button id="favourite">Favourite <i class="far fa-heart"></i></button>
            </div>
            <div id="photos">
                <img class ="img" src="">
                <img class ="img" src="">
                <img class ="img" src="">
                <img class ="img" src="">
            </div>
        </div>` ;

    //Targeting the back button on the page and assigning function.
    let move = document.querySelector('#move') ;
    move.onclick = () => pageHandler('front') ;

    let naviButtons = document.querySelectorAll('.navi') ;
    for ( let i = 0; i <naviButtons.length; i ++ ) {
        naviButtons[i].onclick = () => pageHandler('front') ;
    } ;

    //Function for changing the background of the size buttons.
    let sizeButtons = document.querySelectorAll('.size') ;
    for ( let i = 0; i < sizeButtons.length; i ++ ) {
        sizeButtons[i].onclick = () => changeSize(sizeButtons[i]) ;
    } ;
    function changeSize(button) {
        for ( let i = 0; i < sizeButtons.length; i ++ ) {
            sizeButtons[i].classList.remove('sizeOn') ;
        } ;
        button.classList.add('sizeOn') ;
    }

    //Different add to cart function for the button in product view. Does the same thing, but also calls the cartPage.
    let addItemToCart = document.querySelector('#addToCart') ;
    addItemToCart.onclick = () => addInCart() ;
    function addInCart() {
        cartArray.push(products[index]) ;
        cartItems ++ ;
        quantitiesArray.push(1) ;
        cartNumber.innerHTML = cartItems ;
        cartNumber.classList.remove("hidden") ;
        pageHandler('cart') ;
    }

    //Targeting the elements on the page that need info from the products array.
    let images = document.querySelectorAll('.img') ;
    let category = document.querySelector('#catName') ;
    let label = document.querySelector('#name') ;
    let price = document.querySelector('#price') ;
    let description = document.querySelector('#description') ;
    //Looping for the picture paths.
    for ( let i = 0; i < images.length; i ++ ) {
        images[i].src = "ProductImages/" + index + "-" + i + ".jpg";
    }
    category.innerHTML = products[index].category ;
    label.innerHTML = products[index].name ;
    price.innerHTML = "€" + products[index].price
    description.innerHTML = products[index].description ;
}
//End of productPage function

//cartPage function, changes content of the page and the state used for the back button on the product page.
function cartPage() {
    let content = document.querySelector('#content') ;
    content.innerHTML = `
        <button id="goBack"><i class="fas fa-chevron-left"></i> Go back</button>

        <h1 id="shopping">Your shopping cart</h1>

        <div id="bill">
            <h2 id="summary">Order Summary</h2>
            <div id="billTable">
                <div class="rows">
                    <h3 class="cells">Items value:</h3>
                    <h3 id="subTotal" class="cellz"></h3>
                </div>
                <div class="rows">
                    <h3 class="cells">Shipping:</h3>
                    <h3 id="shipping" class="cellz"></h3>
                </div>
                <div class="rows">
                    <h3 class="cells">VAT(included):</h3>
                    <h3 id="vat" class="cellz"></h3>
                </div>
                <div class="rows">
                    <h3 class="cells total">Total:</h3>
                    <h3 id="total" class="total" class="cellz"></h3>
                </div>
                <div>
                    <button id="checkOut" class="hidden">Check out</button>
                </div>
            </div>
        </div>
        <div id="tableTable">
            <div class="tableCell">
                <div id="shopContainer">
            
                </div> 
            </div>
                <div class="tableCell">
                    <br>
                    <p1>We offer free shipping for orders above €100.</p1>
                    <br>
                    <br>
                    <p1>Standard shipping is €5.</p1>
                    <br>
                    <br>
                    <p2>Contact us:</p2><br>
                    <p2> +358 44 123 456</p2>
                    <br>
                    <p2>contact@support-atk.com</p2>
                    <br>
                    <p2></p2>    
                </div>` ;

    //Based on the length of the cartArray, this function creates all the needed HTML elements and appends them to the shopContainer div.
    //After the loop, it calls the calculatePrice function for the checkout info.
    createBasket() ;
    function createBasket() {
        for ( let i = 0; i < cartArray.length; i ++ ) {
            let shopContainer = document.querySelector('#shopContainer') ;
            let itemRow = document.createElement('div') ;
            itemRow.classList.add('itemRow') ;
            itemRow.id = 'itemRow' + i
            let item = document.createElement('div') ;
            item.classList.add('item') ;
            let img = document.createElement('img') ;
            img.classList.add('itemImage') ;
            img.src = cartArray[i].image ;
            let stats = document.createElement('div') ;
            stats.classList.add('stats') ;
            let itemName = document.createElement('h2') ;
            let itemNameText = document.createTextNode(cartArray[i].name) ;
            let itemPrice = document.createElement('h2') ;
            let itemPriceText = document.createTextNode("€" + cartArray[i].price) ;
            let quantityText = document.createElement('h2') ;
            quantityText.innerHTML = "Quantity:" ;
            let quantity = document.createElement('input') ;
            quantity.classList.add("quantity") ;
            quantity.type = "number"
            quantity.value = quantitiesArray[i] ;
            let remove = document.createElement('button') ;
            remove.classList.add('remove') ;
            remove.innerHTML = `<i class="far fa-trash-alt"></i>`

            shopContainer.append(itemRow) ;
            itemRow.append(item) ;
            item.append(img) ;
            itemRow.append(stats) ;
            stats.append(itemName, itemPrice, quantityText, quantityText, quantity, remove) ;
            itemName.append(itemNameText) ;
            itemPrice.append(itemPriceText) ;
            
        } ;
        calculatePrice() ;
    } ;

    //The back button uses the state value to to know where you were prior to the cart.
    let moveBack = document.querySelector('#goBack') ;
    moveBack.onclick = () => backView() ; 
    function backView() {
        if ( state == 0 ) {
            pageHandler('front') ;
        } else {
            pageHandler(state) ;
        } ;
    } ;
    
    //This loop targets all images and remove buttons in the cart, assigning a function and also assigning onchange function to the
    //quantity fields, passing the value of the changed quantity and the number of the loop.
    for ( let i = 0; i < cartArray.length; i ++ ) {
        let quantities = document.querySelectorAll('.quantity') ;
        let removeButtons = document.querySelectorAll('.remove') ;
        let productImages = document.querySelectorAll('.itemImage') ;
        productImages[i].onclick = () => pageHandler(cartArray[i].productId) ;
        removeButtons[i].onclick = () => deleteItem(i) ;
        quantities[i].onchange = () => addToQa(quantities[i].value, i) ;
        
    } ;

    //The onchange fuction prevents the quantity to be lowered under 0 and also is changing the value in the quantitiesArray
    //those values are used to formulate the price in real time.
    function addToQa(change, indexChange) {
        let quantities = document.querySelectorAll('.quantity') ;
        if ( change < 0 ) {
            quantitiesArray[indexChange] = 0 ;
            quantities[indexChange].value = 0 ;
        } else {
            quantitiesArray[indexChange] = change ;
        } ;
        calculatePrice() ;
    } ;

    //This function targets the info fields for the bill, calculates prices and changes the innerHTML of the checkout fields.
    function calculatePrice() {
        let colectivePrice = 0 ;
        for ( let i = 0; i < cartArray.length; i ++ ) {
            let checkOut = document.querySelector('#checkOut') ;
            let subtotal = document.querySelector('#subTotal') ;
            let shipping = document.querySelector('#shipping') ;
            let total = document.querySelector('#total') ;
            let vat = document.querySelector('#vat') ;
            colectivePrice += Number(cartArray[i].price)*quantitiesArray[i] ;
            subtotal.innerHTML = "€" + colectivePrice.toFixed(2) ;
            vat.innerHTML = "€" + (colectivePrice*0.2).toFixed(2) ;
                if ( colectivePrice < 100 && colectivePrice > 0 ) {
                    shipping.innerHTML = "€" + 5 ;
                    total.innerHTML = "€" + (colectivePrice + 5).toFixed(2) ;
                    checkOut.classList.remove('hidden') ;
                } else if ( colectivePrice == 0 ){
                    shipping.innerHTML = "€" + (0).toFixed(2) ;
                    total.innerHTML = "€" + (0).toFixed(2) ;
                    checkOut.classList.add('hidden') ;
                } else {
                    shipping.innerHTML = "Free" ;
                    total.innerHTML = "€" + colectivePrice.toFixed(2) ;
                    checkOut.classList.remove('hidden') ;
                } ;
        } ;
    } ;

    //Deleting items from the basket removes them visualy, but the cart and quantity arrays keep the same length and have empty spaces in them,
    //which messes the other functions. On each press of a remove button, this function creates two empty buffer arrays that are used to transfer
    //only the not empty fields, deletes the content of the array and brings back the items from the buffers, so that the cart array and the
    //quantities array dont have empty fields.
    function deleteItem(index) {
            cartButton.style.transform = 'scale(1.2)' ;
            setTimeout( function () {
                cartButton.style.transform = 'scale(1)'
            }, 50) ;
            let quantityBuffer = [] ;
            let cartBuffer = [] ;
            let selected = document.querySelector('#itemRow' + index) ;
            selected.remove() ;
            cartItems -- ;
            delete cartArray[index] ;
            delete quantitiesArray[index] ;
            cartNumber.innerHTML = cartItems ;
            if ( cartItems == 0 ) {
                cartNumber.classList.add('hidden') ;
            } ;
            for (let i = 0; i < cartArray.length; i ++) {
                if (cartArray[i] != null) {
                    cartBuffer.push(cartArray[i]) ;
                } ;
            } ;
            cartArray = [] ;
            for ( let i = 0; i < cartBuffer.length; i ++ ) {
                cartArray.push(cartBuffer[i]) ;
            } ;
            for (let i = 0; i < quantitiesArray.length; i ++) {
                if (quantitiesArray[i] != null) {
                    quantityBuffer.push(quantitiesArray[i]) ;
                } ;
            } ;
            quantitiesArray = [] ;
            for ( let i = 0; i < quantityBuffer.length; i ++ ) {
                quantitiesArray.push(quantityBuffer[i]) ;
            } ;
            cartPage() ;
        } ;
} ;







