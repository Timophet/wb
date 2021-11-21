const cart = function(){

	
	const cartBtn = document.querySelector(".button-cart");
	const cart = document.getElementById("modal-cart");
	const modalClose = document.querySelector(".modal-close")

	

	cartBtn.addEventListener('click', function(){
		cart.style.display = "flex";
	})

	modalClose.addEventListener('click', function()
	{
		cart.style.display = "";
	})
}
export default cart;