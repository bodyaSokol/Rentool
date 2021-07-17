<?php
$token = "1727595555:AAH-Y7DKvHj8W-9xwQK5EZdCqiZ6TIp9cD4";
$chat_id = "-574639204";
$phone=$_GET['phone'];
$request_type=$_GET['request_type'];
if($request_type=="product_request"){
    $product_id=$_GET['product'];
    $product_name=$_GET['product_name'];
    $days=$_GET['days'];
    $txt="Новый заказ на товар - <b>$product_name</b>. %0AТовар заказывают на <b>$days дней</b>. %0AНомер заказчика <b>$phone</b> %0AСсылка на товар rentool.ru/product.html%23$product_id";
}else if($request_type=="phone_request"){
    $txt="Пользователь с номером $phone заказал обратный звонок.";
}else if($request_type=="bucket_request"){
    $name=$_GET['name'];
    $address=$_GET['address'];
    $sended_text=$_GET['sended_text'];
    $txt="Пользователь <b>$name</b> с номером <b>$phone</b> сделал заказ из корзины.%0AАдрес:<b>$address</b>$sended_text";
}else{
    $txt="Пустой запрос. Вероятно возникоа ошибка с перезагрузкой страницы ";
}
$sendToTelegram = fopen("https://api.telegram.org/bot{$token}/sendMessage?chat_id={$chat_id}&parse_mode=html&text={$txt}","r");
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" href="css/media.css">
    <title>Rentool</title>
    <link rel="shortcut icon" type="image/png" href="img/favicon.ico"/>
    <meta name="robots" content="none" />
</head>
<body>
    <div class="nav-main">
        <div class="content_line">
            <div class="nav">
                <div class="logo">
                    <a href="index.html"><img src="img/Logo.png" alt="rentool"></a>
                </div>
                <div class="call_us_wrap"><span>Позвони нам </span><a class="call_us" href="tel:+7 (961) 273-93-23">7 (961) 273-93-23</a></div> 
                <div>
                <div  class="write_us_wrap">
                    <div class="write_us">
                        <span>Напиши нам<br></span>
                        <a class="email" href="email:rentool61@mail.ru">rentool61@mail.ru</a>
                    </div>
                    <div class="bucket_wrap">
                        <img src="img/bucket.png" alt="">
                        <div class="bucket_length">0</div>
                    </div>
                </div>
                </div>
            </div>
        </div>
    </div>
    <div class="content_line thanks_block">
        <div class="search">
            <input class="search_input" type="text" placeholder="Поиск по каталогу товаров">
            <button class="search_button">Поиск</button>
        </div> 
        <p>Спасибо за вашу заявку! Менеджер свяжется с вами в течении 5 минут!</p>
        <img src="img/cat_request.png" alt="">
        <a href="index.html" class="yellow_button">Вернуться на главную</a>
    </div>
    <div class="footer">
        <div class="content_line">
            <div class="footer_list">
                <div class="footer_item footer_item_flex">
                    <img src="img/logo2.png" alt="">
                    <a class="yellow_phone" href="tel:+7 (961) 273-93-23">7 (961) 273-93-23</a>
                    <a class="email" href="email:rentool61@mail.ru">rentool61@mail.ru</a>
                    <button href="#" class="get_instrument" id="order_call">Заказать звонок</button>
                    <a href="https://api.whatsapp.com/send?phone=79612739323" class="whats_app_call"><img src="img/whatsapp-messenger.png" alt="">Звонок на Whats'app</a>
                </div>
                <!-- <div class="footer_item">
                    <a href="#" class="footer_category">Электроинструменты:</a>
                    <ul>
                        <li><a href="#" class="footer_subcategory">- Отбойный молоток</a></li>
                    </ul>
                </div> -->
            </div>
            <div class="footer_bottom_list">
                <div class="footer_item footer_item_docs">
                    <a href="law/processing_of_personal_data.html">Пользовательское соглашение</a>
                </div>
                <div class="footer_item footer_item_docs">
                    <a href="law/consent_to_the_processing_of_personal_data.html">Соглашение на обработку данных</a>
                </div>
                <div class="footer_item footer_item_docs footer_item_docs_last">
                    <p>“Rentool” 2021 / © Все права защищены!</p>
                </div>
            </div>
        </div>
    </div>
    <div class="modal_order_call">
        <form class="modal_rent_product" action="handler.php">
            <div id="buttonxphone">x</div>
            <h2>Заказать обратный звонок</h2>
            <input class="phone_input" type="text" name="phone" placeholder="Телефон (89281234567)" required>
            <input class="dispnone request_type" type="text" name="request_type" value="phone_request">
            <input class="phone_submit" type="submit" value="Отправить номер">
            <p>Нажимая кнопку "Отправить номер" подтверждаю, что я ознкомился c <a href="law/processing_of_personal_data.html">Положением об обработке персональных данных</a>, и подтверждает согласие с документом <a href="law/consent_to_the_processing_of_personal_data.html">Согласия на обработку персональных данных</a>.</p>
        </form>
    </div>
    <div class="modal_bucket_list">
        <div class="bucket_list_wrap">
            <img class="bucket_list_wrap_close" src="img/close_button.png">
            <h2>Корзина</h2>
            <div class="bucket_list">
                
            </div>
            <div class="bucket_result">
                 <p>Итого: <span class="bucket_price">80 000</span>₽</p>
                 <a class="yellow_button" id="final_price_button" href="#">Оформить заказ</a>
            </div>
        </div>
    </div>
    <script>localStorage.setItem('bucket', "[]");</script>
    <script src="js/jquery.js"></script>
    <script type="text/javascript" src="js/main.js"></script>
    <script>
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
            });
        // }
    </script>
</body>
</html>