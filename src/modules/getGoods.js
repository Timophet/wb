const getGoods = ()=>{
	
	const links = document.querySelectorAll('.navigation-link');
	//console.log(links)
	
	
	const loadData = ()=>{
		fetch('https://wild-a7747-default-rtdb.firebaseio.com/db.json')
		.then( (res)=> res.json())
		.then((data) =>{
			localStorage.setItem('goods', JSON.stringify(data));
			//console.log(data);
			//return data;
			
		})
	}
	
	
	
	
	const getData = ()=>{
		console.log(localStorage.getItem('goods'));
		//const goods = JSON.parse(localStorage.getItem('goods'));
		//console.log(goods);
	};
	
	links.forEach((link)=>{
		loadData();
		link.addEventListener('click', (event)=>{
			event.preventDefault();
			getData();
		})
	})
	
	
}

export default getGoods;