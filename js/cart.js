let carts = document.querySelectorAll('.theBtn');
const VAT = 15;
let products = [{
        //these are all the the products on my html
        name: 'COD Advanced Warfare',
        tag: "https://wallpapercave.com/wp/wp5398449.jpg",
        price: 699.99,
        inCart: 0

    },
    {
        name: 'Far Cry 5',
        tag: "https://wallpapercave.com/wp/wp3279279.jpg",
        price: 899.99,
        inCart: 0

    },
    {
        name: 'Far Cry New Dawn',
        tag: "https://wallpapercave.com/wp/wp5075232.jpg",
        price: 1299.99,
        inCart: 0

    },
    {
        name: 'Grand Theft Auto V',
        tag: "https://wallpapercave.com/wp/wp1811846.jpg",
        price: 859.99,
        inCart: 0

    },
    {
        name: 'Need For Speed Heat',
        tag: "https://wallpapercave.com/wp/wp4601537.jpg",
        price: 859.99,
        inCart: 0

    }
];

for (let i = 0; i < carts.length; i++) {
    carts[i].addEventListener('click', () => {
        cartNum(products[i]);
        totalCost(products[i]);
    })

}

function onLoadCartNum() {
    //this is when the user reloads the page the number next to the cart will still be displayed
    let productNum = sessionStorage.getItem("cartNum");
    if (productNum) {
        document.querySelector('#itemsInCart').textContent = productNum;
    }
}

function cartNum(product) {
    //this is used to display the number of items the user has clicked/added to the cart which is displayed next to the word cart on the nav bar 
    let productNum = sessionStorage.getItem("cartNum");
    productNum = parseFloat(productNum);
    if (productNum) {
        //if there where products on our local storage then add 1
        sessionStorage.setItem("cartNum", productNum + 1);
        document.querySelector('#itemsInCart').textContent = productNum + 1;
    } else {
        //if not then its the first one '1'
        sessionStorage.setItem("cartNum", 1);
        document.querySelector('#itemsInCart').textContent = 1;
    }
    setItems(product);

}


function setItems(product) {
    let cartProducts = sessionStorage.getItem("productsInCart");
    cartProducts = JSON.parse(cartProducts);
    if (cartProducts != null) {
        if (cartProducts[product.tag] === undefined) {
            cartProducts = {
                ...cartProducts,
                [product.tag]: product
            }
        }
        cartProducts[product.tag].inCart += 1;
    } else {
        product.inCart = 1;
        cartProducts = {
            [product.tag]: product
        }
    }
    sessionStorage.setItem("productsInCart", JSON.stringify(cartProducts))
}

function totalCost(item) {
    //console.log("price is ",item.price)
    let cartCost = sessionStorage.getItem("totalCost");

    if (cartCost != null) {
        //if the cart has items already then add the items in the cart with the new item that has been selected
        cartCost = parseFloat(cartCost);
        item.price = parseFloat(item.price);
        sessionStorage.setItem("totalCost", cartCost + item.price);
        alert("Your carts total cost is:" + "\n" + "R" + parseFloat(cartCost + item.price));

    } else {
        //if not then then add the item prices to the total cost
        sessionStorage.setItem("totalCost", item.price)
        alert("Your carts total cost is:" + "\n" + "R" + item.price);
    }

}



let container2 = document.querySelector(".container2");
let cartCost = parseFloat(sessionStorage.getItem("totalCost"));
cartCost += (cartCost * VAT / 100);

function displayCart() {
    let cartItems = sessionStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems);
    let container = document.querySelector(".products");
    if (cartItems && container) {
        //if the container on the html page exists then execute the code
        container.innerHTML = '';
        Object.values(cartItems).map(item => {
            container.innerHTML +=
                //this is where i display the content on the page
                `
                
                <tr class="tableRow" scope="row">
                    <td class"tableData"><img src="${item.tag}">${item.name}</td>
                    <td class="td">R${item.price}</td>
                    <td class="td">${item.inCart}</td>
                    <td class="td">R${item.inCart*item.price}</td>
                </tr>            
                `;
        });
        container2.innerHTML += "<h6 class='basketName'>Total: R<span id='basketTotal'>" + cartCost + "</span> </h5>";
    }
}





function confirmOrder() {
    let productNum = sessionStorage.getItem("cartNum");
    productNum = parseFloat(productNum);
    let result = Math.random().toString(36).substring(7);
    if (productNum > 0) {
        alert("Your Order was successful" + "\n" + "Reference is: #441" + result)

    } else {
        alert("Please select a product to confirm an order");
    }

}


onLoadCartNum();
displayCart();