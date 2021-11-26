const getGoods = ()=>{
	
	const links = document.querySelectorAll('.navigation-link');
	
	const viewAllBtn = document.querySelector('a.more');

		
	

	const renderGoods = (goods) => {
		//console.log(goods);
		const goodsContainer = document.querySelector('.long-goods-list');
		//console.dir(goodsContainer);
		goodsContainer.innerHTML ='';
		
		goods.forEach((good) => {


			const goodBlock = document.createElement('div');
			goodBlock.classList.add('col-lg-3') 
			goodBlock.classList.add('col-sm-6') 

			goodBlock.innerHTML = `
				<div class="goods-card">
					<span class="label ${good.label ? null : 'd-none'}">${good.label}</span>
					<!-- /.label --><img src="db/${good.img}" alt="${good.name}" class="goods-image">
					<h3 class="goods-title">${good.name}</h3>
					<p class="goods-description">${good.description}</p>
					<button class="button goods-card-btn add-to-cart" data-id="${good.id}">
					<span class="button-price">$${good.price}</span>
					</button>
						</div>
				
			`
			goodsContainer.append(goodBlock);
		})


	}

	
	
	const getData = (linkValue, category)=>{
		//console.log(linkValue, category)
		fetch('https://wild-a7747-default-rtdb.firebaseio.com/db.json')
		.then( (res)=> res.json())
		.then((data) =>{
			const array = category ? data.filter((item) => item[category] === linkValue) : data
			//console.dir(array);


			localStorage.setItem('goods', JSON.stringify(array));
			//console.log(data);
			//return data;
			if(window.location.pathname !== "/goods.html") {
				
				window.location.href = "/goods.html"
				
			}
			else
			{
				renderGoods(array);
			}
		})
	}
	
	
	
	
	links.forEach((link)=>{
		link.addEventListener('click', (event)=>{
			event.preventDefault();
			const linkValue = link.textContent;
			const category = link.dataset.field;
			getData(linkValue, category);
			
			
		})
		  //console.log(localStorage.getItem('goods'));
		
	})
	
	if(localStorage.getItem('goods') && window.location.pathname === "/goods.html"){

		renderGoods(JSON.parse(localStorage.getItem('goods')));
	}
	

	if(viewAllBtn){
		viewAllBtn.addEventListener('click', ()=>{
			getData();
		})
	}


}

export default getGoods;