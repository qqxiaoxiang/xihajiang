
new Vue({
	el: '#example',
	data: {
		y1:true,
		y2:false,
		y3:false,
		postData:{type:'2'},
		commentList: [1],
		animate: false,
		flag:false,
		timer:'',
		phoneAll:'12345678911',
		jpList:[],
		phoneList:[],
		stop:null,
		phoneAll1:""
	},
	created: function () {
		that=this;
		document.onkeydown = function (e) {
			
			let _key = window.event.keyCode;
			console.log(_key)
			//enter
			if (_key === 13) {
				console.log("点击了enter ")
				that.y1=!that.y1;
				that.y3=!that.y3;
				// console.log(that.y3);
				// that.getData();
			}
			//ESC
			if (_key === 27) {
				
				console.log("点击了ESC ");
				
				that.y1=!that.y1;
				that.y2=!that.y2;
				that.getComment();
				
				
			}
			//space
			if (_key === 32) {
				console.log("点击了space") 
				that.getData();

				//that.getCommentList()
				
				//console.log(that.stop,'a');
				
			}
			
			
			
		}

		
		
	 },

	methods: {
		// 获取抽奖手机号列表
		getCommentList() {
			var that = this;
			var postData={};
			$.ajax({
				type: "POST",
				url: "https://api.jamyo.net/hiphopjust/admin/sportsVideo/shanweiDrawList",
				dataType: 'json',
				contentType: 'application/json',
				data: JSON.stringify(postData),
				success: function (res) {
					//console.log(res,2);
					
					
					//console.log(that.stop,11);
					
					var i=0;
					that.phoneList=res.data;
					console.log(that.phoneList);
					var timer1=setInterval(function(){
						
						that.phoneAll=that.phoneList[i].phone;
						i++;
						if(i>=that.phoneList.length){i=0;}

					},100);
					setTimeout(function(){
						clearInterval(timer1);
						console.log('5秒到了')
					},4900);

				
				
				},
				error: function (res) {
					console.log(res)
				}
			})
		},
		// 确定中奖号码函数
		getData() {
            var that = this
			$.ajax({
				type: "POST",
				url: "https://api.jamyo.net/hiphopjust/admin/sportsVideo/shanweiDraw",
				dataType: 'json',
				contentType: 'application/json',
				data: JSON.stringify(that.postData),
				success: function (res) {
					console.log(res,23);
					that.stop=res.data;
					console.log(that.stop,24);

					if(that.stop!==null){
					
						setTimeout(function(){
							that.phoneAll=that.phoneAll1;
						},5000);
						that.getCommentList();
					}else{alert('活动已结束');return}
					
				// 	if(that.stop==null){
				// 		console.log('数据请求完毕啦');
				// 		//alert(res.msg);
				// 		return
				// }

				that.phoneAll1=res.data.phoneAll;

					// console.log(res.data.phoneAll)
					// that.phoneAll=res.data.phoneAll;
				},
				error: function (res) {
					console.log(res)
				}
			})
		},
		// 获取中奖号码列表并渲染
		getComment() {
            var that = this
			$.ajax({
				type: "POST",
				url: "https://api.jamyo.net/hiphopjust/admin/sportsVideo/shanweiDrawList",
				dataType: 'json',
				contentType: 'application/json',
				data: JSON.stringify(that.postData),
				success: function (res) {
					console.log(res,1)
					that.jpList=res.data;
				},
				error: function (res) {
					console.log(res)
				}
			})
		},

		
	}
})
