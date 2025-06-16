export function getCart(){
    let cart = localStorage.getItem("cart");
    if (cart==null) {
        cart = [];
        localStorage.setItem("cart", JSON.stringify(cart));
        return [];
    }

    cart = JSON.parse(cart);
    return cart;
}

export function addToCart(product, qty){
    let cart = getCart();
    const productIndex = cart.findIndex((cartProduct) => cartProduct.productId === product.productId);

    if (productIndex == -1) {
        cart.push(
            {
                productId: product.productId,
                name: product.name,
                altName: product.altName,
                price: product.price,
                labledPrice: product.labledPrice,
                image: product.images[0],
                quantity: qty
            }
        )
    } else {
        cart[productIndex].quantity += qty;
        if (cart[productIndex].quantity <= 0) {
            cart = cart.filter((cartProduct) => cartProduct.productId !== product.productId);
        }
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    return cart;
}

export function removeFromCart(productId){
    let cart = getCart();
    cart = cart.filter((cartProduct) => cartProduct.productId != productId); 
    localStorage.setItem("cart", JSON.stringify(cart));
    return cart;
}