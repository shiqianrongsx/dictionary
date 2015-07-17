$(document).ready(function(){
/*--------------------------------------a.html--------------------------------------*/
	$('#letter-a').click(function(event){
		event.preventDefault();
		$('#dictionary').hide().load('a.html',function(){
			$(this).slideDown(1000);
		});
	});
/*--------------------------------------b.json--------------------------------------*/
	$('#letter-b').click(function(event){
		event.preventDefault();
		$.getJSON('b.json',function(data){
			var html='';
			$.each(data,function(entryIndex,entry){
				html+='<div class="entry">';
				html+='<h3 class="term">'+entry.term+'</h3>';
				html+='<div class="part">'+entry.part+'</div>';
				html+='<div class="definition">'+entry.definition;
				if(entry.quote){
					html+='<div class="quote">'
					/*for(var i=0;i<entry.quote.length;i++){
						html+='<div class="quote-line">'+entry.quote[i]+'</div>';
					}*/
					$.each(entry.quote,function(lineIndex,line){
						html+='<div class="quote-line">'+line+'</div>';
					})					
				}
				if(entry.author){
					html+='<div class="quote-author">'+entry.author+'</div></div>';
				}
				html+='</div></div></div>';
			});
			$('#dictionary').html(html);
		});
	}); 
/*--------------------------------------c.js--------------------------------------*/
	$('#letter-c').click(function(event){
		event.preventDefault();
		$.getScript('c.js');//自动注入<script>标签
	});
/*--------------------------------------d.xml--------------------------------------*/
	/*data为xml*/
	$('#letter-d').click(function(event){
		event.preventDefault();
		$.get('d.xml',function(data){
			var html='';
			$(data).find('entry').each(function(){
				$entry=$(this);
				html+='<div class="entry">';
				html+='<div class="term">'+$entry.attr('term')+'</div>';
				html+='<div class="part">'+$entry.attr('part')+'</div>';
				html+='<div class="definition">'+$entry.find('definition').text();
				var $quote=$entry.find('quote');
				if($quote){
					html+='<div class="quote">';
					$quote.find('line').each(function(){
						html+='<div class="quote-line">'+$(this).text()+'</div>';
					});
					if($quote.attr('author')){
						html+='<div class="author">'+$quote.attr('author')+'<div>';
					};
					html+='</div>';
				}
				html+='</div></div>';
			});
			$('#dictionary').html(html);
		});
	});
/*--------------------------------------e.php--------------------------------------*/
	//第一种：使用.load()
	/*$('#letter-e a').click(function(event){
		event.preventDefault();
		$('#dictionary').load('e.php?term='+$(this).text());
	});*/
	//第二种：使用$.get()全局函数:取得指定的URL的纯文本文件，根据服务器提供的MIME类型知道响应的是HTML
	/*$('#letter-e a').click(function(event){
		event.preventDefault();
		var requestDate={term:$(this).text()};
		$.get('e.php',requestDate,function(data){
			$('#dictionary').html(data);
		});
	});*/
	//第三种：$.post()
	/*$('#letter-e a').click(function(event){
		event.preventDefault();
		var requestDate={term:$(this).text()};
		$.get('e.php',requestDate,function(data){
			$('#dictionary').html(data);
		});
	});*/
	//第四种：.load:接受到包含数据的对象时默认使用post方法发送请求
	$('#letter-e a').click(function(event){
		event.preventDefault();
		var requestDate={term:$(this).text()};
		$('#dictionary').load('e.php',requestDate);
	});
/*--------------------------------------f.php--------------------------------------*/
//显示包含搜索内容的单词
	$('#letter-e form').submit(function(event){ //submit绑定当表单元素被提交时调用的事件处理程序
		event.preventDefault();//阻止了默认的提交表单的方式
		var requestDate={term:$(this).find('input').val()};
		//var requestDate=$(this).serialize();
		$.get('f.php',requestDate,function(data){
			$('#dictionary').html(data);			
		});

	});
/*----------------------------------------关注请求-------------------------------------------*/
/*
.ajaxStart()和.ajaxStop()只能由$(document)调用，这些函数是全局的，因为无论创建他们的代码位于何处，当Ajax通信发生时，都需要调用他们。
*/
	var $loading=$('<div id="loading">Loading...</div>').insertBefore('#dictionary');
	$(document).ajaxStart(function(){
		$loading.show();
	}).ajaxStop(function(){
		$loading.hide();
	});
/*-------------------------------单击词条名显示或隐藏相应的解释---------------------------------*/
/*
	$('h3.term').click(function(event){
		$(this).siblings('.definition').slideToggle();	
	});
	这段代码虽然看起来正常，但在现有的代码基础上单击没有什么结果。因为在添加click处理程序的时候，词条还没有添加到文档中。而且即使已经
	把click处理程序添加到词条元素，只要一单击其他字母，这些处理程序仍然会丢失绑定。
*/
//事件委托的本质就是把事件处理程序绑定到祖先元素，而这个祖先元素始终不变
	$('body').click(function(event){
		if($(event.target).is('h3.term')){
			$(event.target).siblings('.definition').slideToggle();
		}		
	});
/*----------------------------------------------g.html------------------------------------------------*/
	$('#letter-g a').click(function(event){
		event.preventDefault();
		$('#dictionary').load('g.html .entry');
	})
});