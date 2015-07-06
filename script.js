function $(id){
	return typeof id === 'string' ? document.getElementById(id) : id;
}

function getCookie(name) {    
	if(document.cookie.indexOf(name) == -1) { return 0; }
	else { return 1; }    
}

if(getCookie("followSuc")) { $('micro').style.display = 'none'; }

else { $('micro').style.display = 'block'; }

$('remind').onclick = function(){
	document.cookie="followSuc=abc";
	$('micro').style.display = 'none';
}

window.onload=function(){ 
	var index = 0;
	var timer = null;
	var spans = $('btn').getElementsByTagName('span');
	var as = $('img').getElementsByTagName('a');
	for(var i = 0;i < spans.length;i ++){
		as[i].id = i;
		spans[i].id = i;

		as[i].onmouseover = function(){ 
			 clearInterval(timer);
		}
		as[i].onmouseout = function(){  
			timer = setInterval(autoPlay,5000);    
		}

		spans[i].onmouseover = function(){  
			clearInterval(timer);
      		changeOption(this.id);
		}
		spans[i].onmouseout = function(){  
			timer = setInterval(autoPlay,5000);    
		}
	}
	if(timer){
		clearInterval(timer);
		timer = null;
	} 
	timer = setInterval(autoPlay,5000);
	function autoPlay(){
		index ++;
		if(index >= spans.length){
	    	index = 0;
		}
	changeOption(index);
	}
	function changeOption(curIndex){
		for(var j = 0;j < spans.length;j ++){
			spans[j].className = '';
			as[j].style.display = 'none';
		}
	spans[curIndex].className = 'select';
	as[curIndex].style.display = 'block';
	index = curIndex;
	}

	$('cpsj').onclick = function(){
		$('bcyy').className = '';
		$('prg').style.display = 'none';
		$('prd').style.display = 'block';
		this.className = "clk";
		a_prd_jax();
	}
	$('bcyy').onclick = function(){
		$('cpsj').className = '';
		$('prg').style.display = 'block';
		$('prd').style.display = 'none';
		this.className = "clk";
		a_prg_jax();
	}


	$('pic-vid').onclick = function(){
		this.style.background = 'black';
		$('cover').style.display = 'block';
		$('video').style.display = 'block';
		$('video').autoplay=true;
		$('video').play();
		$('close').style.display = 'block';
	}

	$('exit').onclick = function(){
		$('cover').style.display = 'none';
		$('login').style.display = 'none';
	}

	$('watch').onclick = function(){
		$('cover').style.display = 'block';
		$('login').style.display = 'block';
	}

	$('close').onclick = function(){
		$('pic-vid').style.background = 'url(./img/video.png)';
		$('cover').style.display = 'none';
		$('video').pause();
		$('video').style.display = 'none';
		this.style.display = 'none';
	}

	// ajax

	function ajax(obj) {
		var xhr = (function () {
			if (typeof XMLHttpRequest != 'undefined') {
				return new XMLHttpRequest();
			} else if (typeof ActiveXObject != 'undefined') {
				var version = [
											'MSXML2.XMLHttp.6.0',
											'MSXML2.XMLHttp.3.0',
											'MSXML2.XMLHttp'
				];
				for (var i = 0; version.length; i ++) {
					try {
						return new ActiveXObject(version[i]);
					} catch (e) {
						//跳过
					}	
				}
			} else {
				throw new Error('您的系统或浏览器不支持XHR对象！');
			}
		})();
		obj.url = obj.url + '?rand=' + Math.random();
		obj.data = (function (data) {
			var arr = [];
			for (var i in data) {
				arr.push(encodeURIComponent(i) + '=' + encodeURIComponent(data[i]));
			}
			return arr.join('&');
		})(obj.data);
		if (obj.method === 'get') obj.url += obj.url.indexOf('?') == -1 ? '?' + obj.data : '&' + obj.data;
		if (obj.async === true) {
			xhr.onreadystatechange = function () {
				if (xhr.readyState == 4) {
					callback();
				}
			};
		}
		xhr.open(obj.method, obj.url, obj.async);
		if (obj.method === 'post') {
			xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
			xhr.send(obj.data);	
		} else {
			xhr.send(null);
		}
		if (obj.async === false) {
			callback();
		}
		function callback() {
			if (xhr.status == 200) {
				obj.success(xhr.responseText);			//回调传递参数
			} else {
				alert('获取数据错误！错误代号：' + xhr.status + '，错误信息：' + xhr.statusText);
			}	
		}
	}

	function a_prd_jax(){
		ajax({
		method : 'get',
		url : 'http://study.163.com/webDev/couresByCategory.htm',
		data : {
			'pageNo':'1',
			'psize':'180',//一次性请求全部的课程（点击翻页再请求会更好？）
			'type':'10'
		},
		success : function(data) {
			var _data= JSON.parse(data);
			var qDiv = document.getElementById("prd");
			qDiv.innerHTML = "";
			for(i=0;i<20;i++){
				var qqDiv = document.createElement("div");
				qDiv.appendChild(qqDiv);
				qqDiv.innerHTML = "<span class='bigPhotoUrl' style='background:url("+_data.list[i].bigPhotoUrl+")center/100% 100%'></span><p class='name'>"+_data.list[i].name+"</p><p class='categoryName'>"+_data.list[i].categoryName+"</p><p class='learnerCount'><span></span>"+_data.list[i].learnerCount+"</p><p class='price'>￥"+_data.list[i].price+"</p>";
			}
			$('pages').onclick = function(event){
				event = event || window.event;
				var target = event.target || event.srcElement;
				if(target.className == 'page'){
					var a = document.getElementsByClassName('page');
					for(var i=0;i<a.length;i++){
						a[i].className = 'page';
					}
					target.className = 'page select';
					_data.pagination.pageIndex = target.innerHTML;
					qDiv.innerHTML = "";
					for(i=_data.pagination.pageIndex*20;i<_data.pagination.pageIndex*20+20;i++){
						var qqDiv = document.createElement("div");
						qDiv.appendChild(qqDiv);
						qqDiv.innerHTML = "<span class='bigPhotoUrl' style='background:url("+_data.list[i].bigPhotoUrl+")center/100% 100%'></span><p class='name'>"+_data.list[i].name+"</p><p class='categoryName'>"+_data.list[i].categoryName+"</p><p class='learnerCount'><span></span>"+_data.list[i].learnerCount+"</p><p class='price'>￥"+_data.list[i].price+"</p>";
					}					
				}
			}
		},
		async: true
		});
	}

	function a_prg_jax(){
		ajax({
		method : 'get',
		url : 'http://study.163.com/webDev/couresByCategory.htm',
		data : {
			'pageNo':'1',
			'psize':'180',
			'type':'20'
		},
		success : function(data) {
			var _data= JSON.parse(data);
			var oDiv = document.getElementById("prg");
			oDiv.innerHTML = "";
			for(i=0;i<20;i++){
				var ooDiv = document.createElement("div");
				oDiv.appendChild(ooDiv);
				ooDiv.innerHTML = "<div><span class='bigPhotoUrl' style='background:url("+_data.list[i].bigPhotoUrl+")center/100% 100%'></span><p class='name'>"+_data.list[i].name+"</p><p class='categoryName'>"+_data.list[i].categoryName+"</p><p class='learnerCount'><span></span>"+_data.list[i].learnerCount+"</p><p class='price'>￥"+_data.list[i].price+"</p></div>";
			}
			$('pages').onclick = function(event){
					event = event || window.event;
					var target = event.target || event.srcElement;
					if(target.className == 'page'){
						var a = document.getElementsByClassName('page');
						for(var i=0;i<a.length;i++){
							a[i].className = 'page';
						}
						target.className = 'page select';
						_data.pagination.pageIndex = target.innerHTML;
						oDiv.innerHTML = "";
						for(i=_data.pagination.pageIndex*20;i<_data.pagination.pageIndex*20+20;i++){
							var ooDiv = document.createElement("div");
							oDiv.appendChild(ooDiv);
							ooDiv.innerHTML = "<span class='bigPhotoUrl' style='background:url("+_data.list[i].bigPhotoUrl+")center/100% 100%'></span><p class='name'>"+_data.list[i].name+"</p><p class='categoryName'>"+_data.list[i].categoryName+"</p><p class='learnerCount'><span></span>"+_data.list[i].learnerCount+"</p><p class='price'>￥"+_data.list[i].price+"</p>";
						}					
					}
			}
		},
		async: true
		});
	}

	function a_hot_jax(){
		ajax({
		method : 'get',
		url : 'http://study.163.com/webDev/hotcouresByCategory.htm',
		// data : { },
		success : function(data) {
			var _data= JSON.parse(data);

			var oDiv = document.getElementById("hot-classes");
			oDiv.innerHTML = "";
			var r = Math.round(Math.random()*10);
			for(i=r;i<r+10;i++){
				var ooDiv = document.createElement("div");
				oDiv.appendChild(ooDiv);
				ooDiv.innerHTML = "";
				ooDiv.innerHTML = "<sanp class='smallPhotoUrl' style='background: url("+_data[i].smallPhotoUrl+")center/100% 100% no-repeat; width: 50px; height: 50px; display: inline-block;'></span><p class='name'>"+_data[i].name+"</p><p class='learnerCount'><span></span>"+_data[i].learnerCount+"</p>";
				}
			
		
		},
			async : true
		});
	}


	$('submit').onclick = function(){
		var uesrName = md5($('user').value);
		var passWord = md5($('psw').value);
		ajax({
		method : 'get',
		url : 'http://study.163.com/webDev/login.htm',
		data : {
			'userName': uesrName,
			'password': passWord
		},
		success : function(data) {
			if(data==1){
				$('cover').style.display = 'none';
				$('login').style.display = 'none';
				$('watch').innerHTML = "√ 已关注";
				$('watch').onclick = function(){return 0;}
				$('watch').style.background = "gray";
			}
		},
		async: true
		});
	}
a_prd_jax();
a_prg_jax();
a_hot_jax();








	
}