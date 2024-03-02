window.addEventListener("load",function(event){var el=document.getElementById('order-vue');if(el!==null){bindOrder();}});var bindOrder=function(){window.VueComponent=window.VueComponent||{};window.VueComponent.Order=new Vue({el:'#order-vue',data:{currency:'',translate:{},loading:false,cart:{items:[],summary:{},subscription:0},payments:[],address:{fields:[]},order:{address:{delivery:{is_company_active:0,country:'',gender:''},invoice:{is_company_active:0,country:'',gender:''},},payment:'',accept_agb_subscription:0},errors:{},mobileProps:{mode:"international",disabledFetchingCountry:false,validCharactersOnly:true,disabled:false,disabledFormatting:false,required:false,enabledCountryCode:false,enabledFlags:true,preferredCountries:["AT","DE"],onlyCountries:[],inputClasses:"LoNotSensitive",ignoredCountries:[],autocomplete:"off",maxLen:16,wrapperClasses:"",dropdownOptions:{disabledDialCode:false},inputOptions:{showDialCode:true}}},methods:{checkout:function(event){if(this.loading==true){return;}
this.loading=true;var _this=this;Virtara.Order.checkout(_this.order,function(response){if(response.status){let r=response.data;switch(r.id){case 1:window.location.href=Virtara.path+'/'+sys_links.ORDER_COMPLETE;break;case 2:window.location.href=r.data.url;break;}}else{if(['required_payment_method','out_of_stock','error_system'].includes(response.message)){swal({title:_this.translate['warning'],text:_this.translate[response.message],type:"warning",showCancelButton:false,confirmButtonColor:'#DD6B55',confirmButtonText:_this.translate['ok'],cancelButtonText:_this.translate['cancel'],closeOnConfirm:false,});}}
_this.loading=false;_this.fillErrors(response.data);});},deleteItem:function(index){var _this=this;Virtara.Cart.deleteItem(index,function(cart){_this.loadCart();});},loadAddress:function(addressId){var _this=this;Virtara.Address.fields(function(data){_this.address.fields=data;});},loadAddressField:function(field){var is_company=this.order.address.delivery['is_company_active'];if(is_company&&['name','surname'].indexOf(field)>-1){return false;}
if(!is_company&&['tax_office','tax_number','company'].indexOf(field)>-1){return false;}
return true;},loadCart:function(cb){var _this=this;Virtara.Order.load(function(order){_this.cart.items=order.cart.items;_this.cart.summary=order.cart.summary;_this.cart.subscription=order.cart.subscription;if(typeof cb=='function'){cb(order);}});},loadPayment:function(){var _this=this;Virtara.Payment.load(function(list){_this.payments=list;_this.order.payment=list[0].code;});},updatePaymentMethod:function(code){var _this=this;Virtara.Payment.update(code,function(list){_this.order.payment=code;_this.loadCart();if(dataLayer){let productArr=[];for(var i=0;i<_this.cart.items.length;i++){productArr.push({'name':_this.cart.items[i].name,'id':_this.cart.items[i].id,'variant':_this.cart.items[i].variant_name.join(' '),'price':_this.cart.items[i].sale_price.toFixed(2),'brand':_this.cart.items[i].brand,'position':(i+1),});}
dataLayer.push({'eventCategory':'Enhanced Ecommerce','eventAction':'Checkout','eventLabel':'Cart View','ecommerce':{'checkout':{'actionField':{'step':3,'option':code},'products':productArr}},'event':'eec.cart'});}});},updateZone:function(key,index){if(key==='gender'){return false;}
var _this=this;if(key!=='city'){Virtara.Address.changeZone(this.order.address.delivery[key],function(r){_this.loadCart();if(dataLayer){let productArr=[];for(var i=0;i<_this.cart.items.length;i++){productArr.push({'name':_this.cart.items[i].name,'id':_this.cart.items[i].id,'variant':_this.cart.items[i].variant_name.join(' '),'price':_this.cart.items[i].sale_price.toFixed(2),'brand':_this.cart.items[i].brand,'position':(i+1),});}
dataLayer.push({'eventCategory':'Enhanced Ecommerce','eventAction':'Checkout','eventLabel':'Cart View','ecommerce':{'checkout':{'actionField':{'step':2,'option':_this.order.address.delivery[key]},'products':productArr}},'event':'eec.cart'});}});}
var code=this.order.address.delivery[key];switch(key){case 'country':Virtara.Address.getByCountry(code,function(r){_this.address.fields[index+1].options=r;});break;case 'state':Virtara.Address.getByState(code,function(r){_this.address.fields[index+1].options=r;});break;}},fillErrors:function(errors){var result={};if(Array.isArray(errors)){for(var i=0;i<errors.length;i++){result[errors[i].key]=errors[i].text;}
if(errors.length>0){let offset=$('#'+errors[0].key).offset().top;$("html, body").animate({scrollTop:offset},1000);}}
this.errors=result;},empty:function(mixedVar){var undef;var emptyValues=[undef,null,false,0,'','0']
for(let i=0;i<emptyValues.length;i++){if(mixedVar===emptyValues[i]){return true;}}
return false;},checkMail:function(mail){return window.Virtara.Tools.validateEmail(mail);},sumItem:function(item){let total=0;if(item.subscription_active==0){total+=item.sale_price;}
for(var i=0;i<item.fees.length;i++){if(item.fees[i].price_affect==1){total+=item.fees[i].price;}}
return total;},format:function(number){let a=number.toFixed(2);a=a.toString();return a.replace('.',',');}},created:function(){this.translate=Virtara.Locale.all();this.currency=Virtara.Locale.getCurrencyIcon();let _self=this;this.loadCart(function(order){if(typeof order.address.delivery.name!=='undefined'){_self.order.address.delivery=order.address.delivery;_self.order.address.invoice=order.address.invoice;_self.order.email=order.email;}
_self.loadPayment();});this.mobileProps.placeholder=this.translate['address_mobile_phone'];this.loadAddress(0);}});}