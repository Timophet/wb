const getGoods = ()=>{
	
	const links = document.querySelectorAll('.navigation-link');
	//console.log(links)
	
	
	const getData = ()=>{
		fetch('https://wild-a7747-default-rtdb.firebaseio.com/db.json')
		.then( (res)=> res.json())
		.then((data) =>{
			localStorage.setItem('goods', JSON.stringify(data));
			//console.log(data);
			//return data;
			
		})
	}
	
	
	
	
	links.forEach((link)=>{
		getData();
		link.addEventListener('click', (event)=>{
			event.preventDefault();
			getData();
			const goods = JSON.parse(localStorage.getItem('goods'));
			console.log(goods);
		})
		  //console.log(localStorage.getItem('goods'));
		
	})
	
	
}

export default getGoods;