const search = function(){

	const input = document.querySelector(".search-block > input");
	const searchBtn = document.querySelector(".search-block > button");
	
	console.dir(input);
	console.dir(searchBtn);
	searchBtn.addEventListener('click', ()=>{
		console.log(input.value)
	})
	
	
}
export default search;