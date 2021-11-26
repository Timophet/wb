import getGoods from "./getGoods";

const cart = function(){

	
	const cartBtn = document.querySelector(".button-cart");
	const cart = document.getElementById("modal-cart");
	const modalClose = document.querySelector(".modal-close")
	const goodsContainer = document.querySelector('.long-goods-list')
 	const cartTable = document.querySelector('.cart-table__goods');

	const cartTotal = document.querySelector('.card-table__total');
	const modalForm = document.querySelector('.modal-form')
	

	const addToCart = (id) => {
		const goods = JSON.parse(localStorage.getItem('goods'));
		const good = goods.find(good => good.id === id);
		const cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : []

		if(cart.some(good => good.id === id)){
			//console.log('есть в корзине')
			cart.find(good => good.id === id).count++;
			//good.count = 1;
		}
		else
		{
			//console.log('нет в корзине')
			good.count = 1;
			cart.push(good)
		}
		//console.log(cart);

		localStorage.setItem('cart', JSON.stringify(cart));


	} 

	const deleteCartItem = (id) => {
		const cart = JSON.parse(localStorage.getItem('cart'))

		const newCart = cart.filter(good => {
			return good.id !== id
		})
		localStorage.setItem('cart', JSON.stringify(newCart));
		renderCartGoods(JSON.parse(localStorage.getItem('cart')));		

	}

	const addCartCount = (id) => {
		const cart = JSON.parse(localStorage.getItem('cart'))
		console.log(cart)
		cart.find(good => good.id === id).count++;

		localStorage.setItem('cart', JSON.stringify(cart));
		renderCartGoods(JSON.parse(localStorage.getItem('cart')));		

	}
	const delCartCount = (id) => {
		const cart = JSON.parse(localStorage.getItem('cart'))
		console.log(cart)
		cart.find(good => good.id === id).count--;
		if(cart.find(good => good.id === id).count <= 0){
			deleteCartItem(id)
		}
		else{
			localStorage.setItem('cart', JSON.stringify(cart));
			renderCartGoods(JSON.parse(localStorage.getItem('cart')));	
		}
			

			

	}

	const renderCartGoods = (goods) =>{
		let total = 0;
		cartTable.innerHTML ='';
		goods.forEach(good => {
			console.log(good);
			
			
			const subtotal = good.count * good.price;
			total += subtotal;
			const tr = document.createElement('tr')
			
			
			
			tr.addEventListener(('click'), (e)=>{
				
				//console.log(e.target.parentNode.parentNode.dataset.id);
				//const goodId = e.target.parentNode.parentNode.dataset.id;

				if(e.target.classList.contains('cart-btn-plus')){
					
					//count++;
					addCartCount(good.id);


				}else if(e.target.classList.contains('cart-btn-minus')){
					delCartCount(good.id)	
				} else if(e.target.classList.contains('cart-btn-delete')){
					deleteCartItem(good.id);
				}

			})
			
			tr.dataset.id = good.id;
			
			
			tr.innerHTML = `
				<td>${good.name}</td>
				<td>${good.price}$</td>
				<td><button class="cart-btn-minus"">-</button></td>
				<td>${good.count}</td>
				<td><button class=" cart-btn-plus"">+</button></td>
				<td>${subtotal}</td>
				<td><button class="cart-btn-delete"">x</button></td>
			
			`
			cartTable.append(tr);


		});	
		cartTotal.innerHTML = total + '$';	
		//console.log(total);
	}



	modalForm.addEventListener(('submit'), (e) => {
		e.preventDefault();

		const cartArray = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : []
		const customerName = document.getElementsByName('nameCustomer')[0];
		const customerPhone = document.getElementsByName('phoneCustomer')[0];
		//console.log(customerPhone.value);

		//console.log('submit')
		fetch('https://jsonplaceholder.typicode.com/posts', {
			method: 'POST', 
			body: JSON.stringify({
				cart: cartArray,
				name: customerName.value, 
				phone: customerPhone.value 

			})

		})
		cart.style.display = "";

	})



	cartBtn.addEventListener('click', function(){
		
		const cartArray = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : []
		//console.log(cartArray)
		renderCartGoods(cartArray);
		cart.style.display = "flex";
	})

	modalClose.addEventListener('click', function()
	{
		cart.style.display = "";
	})

	cart.addEventListener(('click'), (e)=>{
		
		
		if(!e.target.closest('.modal') && e.target.classList.contains('overlay')){
			cart.style.display = "";

		}
		

	})

	window.addEventListener(('keydown'), (e)=>{
		
		
		if(e.key === 'Escape'){
			cart.style.display = "";

		}
		

	})


	if(goodsContainer)
	{
		goodsContainer.addEventListener('click', (e)=>{
			
			if(e.target.closest('.add-to-cart'))
			{
				
				const ButtonToCart = e.target.closest('.add-to-cart')
				const goodId = ButtonToCart.dataset.id;
				addToCart(goodId);
				
			}
			
		})
	}
}
export default cart;