// Function to calculate the total price of items in a shopping cart
function calculateTotalPrice(items) {
	var total = 0;
	for (var i = 0; i < items.length; i++) {
		total += items[i].price;
	}
	return total;
}

// Function to find an item in the cart by name
function findItemByName(items, name) {
	for (var i = 0; i < items.length; i++) {
		if (items[i].name === name) {
			return items[i];
		}
	}
	return null;
}

// Function to apply a discount to all items
function applyDiscount(items, discountPercentage) {
	for (var i = 0; i < items.length; i++) {
		items[i].price =
			items[i].price - items[i].price * (discountPercentage / 100);
	}
}

// Function to print the receipt
function printReceipt(items) {
	console.log("Receipt:");
	for (var i = 0; i < items.length; i++) {
		console.log(items[i].name + ": $" + items[i].price.toFixed(2));
	}
	console.log("Total: $" + calculateTotalPrice(items).toFixed(2));
}

// Example usage
var shoppingCart = [
	{ name: "Apple", price: 1.0 },
	{ name: "Banana", price: 0.5 },
	{ name: "Orange", price: 1.25 },
];

console.log("Initial cart:");
printReceipt(shoppingCart);

var item = findItemByName(shoppingCart, "Banana");
if (item) {
	console.log("Found item: " + item.name + " - $" + item.price.toFixed(2));
}

applyDiscount(shoppingCart, 10);

console.log("Cart after discount:");
printReceipt(shoppingCart);
