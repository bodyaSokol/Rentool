const api_url="https://rentool.trex-studio.ru";

window.onload = function() {
	setTimeout(() => document.querySelector('.preloader').classList.add("preloader-remove"), 500);
};

function createIndex(){
let categories = data.filter(item => item.rootCategory==null);
categories.forEach((item)=>{
	var footer_item=document.createElement('div');
	footer_item.className='footer_item';
	document.querySelector('.footer_list').appendChild(footer_item);
	//next
	var footer_category=document.createElement('a');
		footer_category.className='footer_category';
		footer_category.href=`subcategory.html#${item.id}`;
		footer_category.innerHTML=item.name;
		footer_item.appendChild(footer_category);
		// next
		var footer_ul=document.createElement('ul');
		footer_item.appendChild(footer_ul);
		// next
			let subcategories=data.filter(item2 => item2.rootCategory!=null);
			subcategories = subcategories.filter(item2 => item2.rootCategory.id==item.id)
			subcategories.forEach((subitem)=>{
				var subcategory_li=document.createElement('li');
				var footer_subcategory=document.createElement('a');
 			footer_subcategory.className='footer_subcategory';
 			footer_subcategory.href=`products_list.html#${subitem.id}`;
 			footer_subcategory.innerHTML=`- ${subitem.name}`;
 			footer_ul.appendChild(subcategory_li);
 			subcategory_li.appendChild(footer_subcategory);
			})
		// Categories In Top
		var category=document.createElement('a');
	category.className='category_block';
	category.href=`subcategory.html#${item.id}`;
	category.style.backgroundImage=`url('${api_url}${item.photo.url}')`;
	var grey=document.createElement('div');
	grey.className='category_footer';
	grey.innerHTML = item.name;
	document.querySelector('.categories').appendChild(category);
	category.appendChild(grey);
	// Categories In Top
});
}



function createSubcategory() {
	$.get(`${api_url}/categories`, function(data) {
		let categories = data.filter(item => item.rootCategory==null);
		categories.forEach((item)=>{
			var footer_item=document.createElement('div');
			footer_item.className='footer_item';
			document.querySelector('.footer_list').appendChild(footer_item);
			//next
			var footer_category=document.createElement('a');
	 		footer_category.className='footer_category';
 			footer_category.href=`subcategory.html#${item.id}`;
 			footer_category.innerHTML=item.name;
 			footer_item.appendChild(footer_category);
 			// next
 			var footer_ul=document.createElement('ul');
 			footer_item.appendChild(footer_ul);
 			// next
 				let subcategories=data.filter(item2 => item2.rootCategory!=null);
 				subcategories = subcategories.filter(item2 => item2.rootCategory.id==item.id)
 				subcategories.forEach((subitem)=>{
 					var subcategory_li=document.createElement('li');
	 				var footer_subcategory=document.createElement('a');
		 			footer_subcategory.className='footer_subcategory';
		 			footer_subcategory.href=`products_list.html#${subitem.id}`;
		 			footer_subcategory.innerHTML=`- ${subitem.name}`;
		 			footer_ul.appendChild(subcategory_li);
		 			subcategory_li.appendChild(footer_subcategory);
 				})
		});
		// TOP PART
		let subcategoryId = location.hash.substring(1);
		let relative = data.find(item => item.id == subcategoryId);
		document.querySelector('.category_name_heading').innerHTML=relative.name;
		document.querySelector('.category_name').innerHTML=relative.name;
		relative.childrenCategories.forEach((item_id)=>{
			let child = data.find(item => item.id == item_id);
			var category=document.createElement('a');
			category.className='category_block';
			category.href=`products_list.html#${item_id}`;
			category.style.backgroundImage =`url('${api_url}${child.photo.url}')`;
			var grey=document.createElement('div');
			grey.className='category_footer';
			grey.innerHTML = child.name;
			document.querySelector('.categories').appendChild(category);
			category.appendChild(grey);
		});
		// TOP PART
	});
}
///////////////////////////модалка номера телефона//////////////////////////////
document.getElementById("order_call").addEventListener('click', function(e) {
	document.querySelector('.modal_order_call').style.display="flex";
});

document.getElementById("buttonxphone").addEventListener('click', function(e) {
	document.querySelector('.modal_order_call').style.display="none";
});
///////////////////////////модалка номера телефона//////////////////////////////
// search_input
// search_button
function do_search(){
	var search_input=document.querySelector('.search_input').value;
	if(search_input){
		sessionStorage.setItem('search_value', search_input);
		window.location.href = `search.html#${search_input}`;
	}
}
document.querySelector('.search_button').addEventListener("click",function(){
	do_search();
})
document.querySelector('.search_input').addEventListener("keypress",function(e){
    if (e.key === 'Enter') {
    	do_search();
    }
})
var search_in_session=sessionStorage.getItem('search_value');
if(search_in_session){
	document.querySelector('.search_input').value=`${search_in_session}`;
}


document.querySelector('.bucket_list_wrap_close').addEventListener("click",function(e){
	document.querySelector('.modal_bucket_list').style.display="none";
})
document.querySelector('.bucket_wrap').addEventListener("click",function(e){
	document.querySelector('.modal_bucket_list').style.display="flex";
})

function generate_bucket(){
	let bucket = localStorage.getItem('bucket');
	bucket=JSON.parse(bucket);
	if(!bucket){
		bucket=[];
	}
	document.querySelector(".bucket_list").innerHTML="";
	document.querySelector('.bucket_price').innerHTML=`0`;
	document.querySelector('.bucket_length').innerHTML=`${bucket.length}`;
	var text="";
	bucket.forEach((item)=>{
		var template = document.createElement('div');
		template.className="bucket_item";
		template.innerHTML = `<div class="bucket_item_img" style="background-image:url(img/232.png)"></div> <div class="bucket_item_info"> <img class="bucket_item_delete_button"src="img/bin.png" alt=""> <span class="bucket_item_result_price"><span class="bucket_item_result_price_stoimost">Стоимость: </span><span class="bucket_item_result_price_numbers">900₽</span></span> <div> <h3 class="bucket_item_name_h3">Миксер аккумуляторный Metabo RW 18 LTX 120 без АКК И ЗУ,RS-R2</h3> <p class="bucket_item_info_article">Артикул:1</p> </div> <div> <span class="bucket_item_price">900₽</span> <div class="discount_amount">20%</div> </div> <div> <span class="days_amount_text">Дней аренды</span> <div class="days_amount_area days_amount_area_bucket"> <button class="button_min">-</button> <span class="days_amount">1</span> <button class="button_plus">+</button> </div> </div> </div>`;
		template.querySelector(".bucket_item_name_h3").innerHTML=item.name;
		template.querySelector(".bucket_item_info_article").innerHTML=`Артикул: ${item.id}`;

		if(item.photos.length>0){
			template.querySelector(".bucket_item_img").style.backgroundImage=`url('${api_url}/uploads/${item.photos[0].url}')`;
		}else{
			template.querySelector(".bucket_item_img").style.backgroundImage=`url(img/tool.jpg)`;
		}
		
		template.querySelector(".days_amount").innerHTML=item.quantity;
		var discount=0;
		if(item.quantity>=10){
			discount=20;
		}else if(item.quantity>=5){
			discount=10;
		}else{
			template.querySelector(".discount_amount").style.display="none";
		}
		template.querySelector(".discount_amount").innerHTML=`${discount}%`;
		var price=item.prices[0].price;
		discount=(100-discount)*0.01;
		price=price*discount;
		template.querySelector(".bucket_item_price").innerHTML=`${price}₽`;
		template.querySelector(".bucket_item_result_price_numbers").innerHTML=`${price*item.quantity}₽`;
	
		let final_price = document.querySelector('.bucket_price').textContent;
		final_price=Number(final_price);
		final_price=final_price+Number(price*item.quantity);
		document.querySelector('.bucket_price').innerHTML=`${final_price}`;
		text=`%0A${text}%0AИнструмент: ${item.name}%0AКолличествор дней: ${item.quantity}%0AЦена: ${item.prices[0].price}₽ за ед.%0AСтоимость с учётом скидки: ${price*item.quantity}₽%0A------------------------------------------`;

		template.querySelector(".bucket_item_delete_button").addEventListener("click",function(){
			for(var i = 0; i < bucket.length; i++) {
				var obj_id = bucket[i].id;
				if (obj_id== item.id) {
					bucket.splice(i, 1);
					break;
				}
			}
			bucket = JSON.stringify(bucket);
			localStorage.setItem('bucket', bucket);
			generate_bucket();
		})
		template.querySelector(".button_plus").addEventListener("click",function(){
			var days_amount=template.querySelector(".days_amount").textContent;
			days_amount=Number(days_amount);
			days_amount=days_amount+1;
			for(var i = 0; i < bucket.length; i++) {
				var obj_id = bucket[i].id;
				if (obj_id== item.id) {
					bucket[i].quantity=days_amount;
					bucket = JSON.stringify(bucket);
					localStorage.setItem('bucket', bucket);
					generate_bucket();
					break;
				}
			}
			generate_bucket();
		})
		template.querySelector(".button_min").addEventListener("click",function(){
			var days_amount=template.querySelector(".days_amount").textContent;
			if(days_amount>1){
				days_amount=Number(days_amount);
				days_amount=days_amount-1;
				for(var i = 0; i < bucket.length; i++) {
					var obj_id = bucket[i].id;
					if (obj_id== item.id) {
						bucket[i].quantity=days_amount;
						bucket = JSON.stringify(bucket);
						localStorage.setItem('bucket', bucket);
						generate_bucket();
						break;
					}
				}
				generate_bucket();
			}
		})
		document.querySelector(".bucket_list").appendChild(template);
	})
	if(bucket.length==0){
		var template = document.createElement('div');
		template.className="bucket_item";
		template.innerHTML = `<div class="empty_bucket"><h3>Ваша корзина пуста.</h3><p>Выбирай товар, нажимай "Добавить в корзину" и они появятся здесь 😉</p></div>`;
		document.querySelector(".bucket_list").appendChild(template);
		document.querySelector("#final_price_button").style.backgroundColor="grey";
		document.querySelector("#final_price_button").style.color="white";
		document.querySelector("#final_price_button").href="#";
		document.querySelector("#final_price_button").style["pointer-events"]="none";
	}else if(bucket.length>0){
		document.querySelector("#final_price_button").style.backgroundColor="#FFFF00";
		document.querySelector("#final_price_button").style.color="black";
		document.querySelector("#final_price_button").href="orderconfirmation.html";
		document.querySelector("#final_price_button").style["pointer-events"]="auto";
	}
	if(window.location.pathname=="/orderconfirmation.html"){
		var result_price=document.querySelector(".bucket_price").textContent;
        document.querySelector(".order_type_price").innerHTML=result_price;
        let final_price = document.querySelector('.bucket_price').textContent;
        text=`%0A${text}%0AИтог:${final_price}₽`;
       document.querySelector("#sended_text_to_php").value=`${text}`;  
    }
}
generate_bucket();