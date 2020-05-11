$(document).ready(function () {
    //alert("ghj");
    $(".inner").addClass("animated fadeInLeft");

    $(".selection").change(function () {
        if (document.getElementById("selection").value == "Collection") {

            $("#head6").hide();
            $("#selection2").hide();
            $(".button2").hide();


        } else {

            $("#head6").show();
            $("#selection2").show();
            $(".button2").show();
        }
    });

    $("#calculateDelivery").click(function () {
        let deliveryMethods = document.getElementById('selection').value;
        let deliveryOptions = document.getElementById('selection2').value;
        let cartCost = parseFloat(sessionStorage.getItem("totalCost"));

        if (deliveryMethods === "Delivery") {
            //if deliveryMethods is equal to "Delivery" then exercute the code
            switch (deliveryOptions) {
                case "Basic":
                    cartCost = cartCost + 50;
                    break;
                case "Standard":
                    cartCost = cartCost + 150;
                    break;
                case "Premium":
                    cartCost = cartCost + 250;
                    break;
                default:
                    alert("Please select a delivey method");
                    break;
            }
            cartCost += (cartCost * VAT / 100);
        }
        document.getElementById("basketTotal").innerHTML = cartCost;
    });


    $(".btn").css("font-style", "italic");
    $("#myCoupon").click(function () {

        let input = document.getElementById("input").value;
        if (input > 0) {
            let cartCost = parseFloat(sessionStorage.getItem("totalCost"));
            cartCost = cartCost - 200;
            cartCost += (cartCost * VAT / 100);
            document.getElementById("basketTotal").innerHTML = cartCost;
        } else {
            alert("Invalid coupon number");
        }
    });


    $(".hoverBtn").hover(function () {
        $("#tableHover").toggleClass("active")
    });








});