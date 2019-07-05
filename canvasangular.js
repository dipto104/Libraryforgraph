var app = angular.module("demo", []);
		app.controller("testCtrl", function($scope,$http,$window) {
		   $scope.temp = "";
		   $scope.rows = []; // init empty array
		   $scope.datainput =[];
		   $scope.dataconfig =[];

			
		    

			
			

			$scope.myrunner =function(canvasid,inputurl){

				var flag=0;
				
				$http({
				method: 'GET',
				url: 'http://localhost:5000/database'
				}).then(function (data){
				},function (error){
				console.log("big error");
				});

				$http({
					method: 'GET',
					url: inputurl
				}).then(function (data){
				$scope.datainput=data.data;
				console.log($scope.datainput);
				},function (error){
				console.log("big err");
				});
				
				
				$http({
					method: 'GET',
					url: 'Data/config.json'
				}).then(function (config){
				$scope.dataconfig=config.data;
				$scope.init(canvasid);//this is the previous function 
				console.log($scope.datainput);
				},function (error){
				console.log("config error");
				});

						
			}
				

				

			
		
		

			$scope.refresh = function(){
				location.reload();				
			}

			

			
			$scope.init = function(canvasid) {
				

				var json=JSON.parse(JSON.stringify($scope.datainput));

				var jsonconfig=JSON.parse(JSON.stringify($scope.dataconfig));

				$scope.mybody = {
					
					"background-color" : jsonconfig[5].value
					//"background-image": "Img/Back1.jpg"
					
				}
				
				//var json=JSON.parse($scope.datainput);
				//console.log(json[0].status);

				var n = $scope.givenNumber;

				var cheight=jsonconfig[3].value;
				var cwidth=jsonconfig[4].value;

				$scope.rows = [];
				var newx;
				var newy;
				
				for(var k=0;k<=1;k++){
					var c = document.getElementById(canvasid);
					c.width=cwidth;
					c.height=cheight;
					
					var ctx = c.getContext("2d");
					ctx.clearRect(0, 0, cwidth, cheight);
					//console.log(cwidth);
					//console.log(cheight);

					/*var background = new Image();
					background.src = "Img/Back1.jpg";
					
					// Make sure the image is loaded first otherwise nothing will draw.
					background.onload = function(){
						ctx.drawImage(background,0,0);   
					}*/


					var maxwidth=0;
					var maxvalue=0;
					var textwidth=0;
					
					ctx.scale(cwidth/1920,cheight/1080);
					//ctx.translate(-100,-50);

					//var verlegth=[];
					var horlength=[];
					//ctx.scale(1,1);
					var verlegth=0;
					

					var totalvalue=0;
					var statuswidth=0;

					for(var i=0;i<json.length;i++){//printing the status and value member of json
						var tempfont=jsonconfig[2].value+' '+jsonconfig[1].value+' '+jsonconfig[0].value;
						ctx.font = tempfont;
						
						var strings=json[i].status+"("+json[i].value+")";
						var statustring=json[i].status;

						if(ctx.measureText(statustring).width>statuswidth){
							statuswidth=ctx.measureText(statustring).width;
						}	

						if(ctx.measureText(strings).width>maxwidth){
							maxwidth=ctx.measureText(strings).width;
							var tempstr=json[i].status;
							textwidth=ctx.measureText(tempstr).width;
						} 

						if(Number(json[i].value)>maxvalue){
							maxvalue=Number(json[i].value);      //updating the max value of json
						}
						totalvalue=totalvalue+Number(json[i].value);
						

					}

					for(var i=0;i<json.length;i++){
						strings=json[i].status;
						var tempval=(statuswidth-ctx.measureText(strings).width);
						ctx.fillText(strings, 100+tempval, 45*(i+1));
					}
					maxvalue=maxvalue+maxvalue+maxwidth+100+5;//maxvalue is the higest range of pixel of bar
					
					var barsize=Number(jsonconfig[7].value);         //size of the small bar
					var nbar=0;				//number of bar
					var vpix=20			//vertical start pixel at for bar
					var scaleing=1;         //scaling number for dynamic page
					if(maxvalue>c.width){
						scaleing=maxvalue/(1920-maxwidth-100-5);			
					}
					
					//console.log(maxvalue);
					//console.log(scaleing);


					var imagePaper = new Image();
					imagePaper.src = "Img/bar4.jpg";

					imagePaper.onload = function(){
						vpix=25;
						for(var i=0;i<json.length;i++){
							var hpix=textwidth+100+15; //horizontal pixel start at for bar
							
							var value=Number(json[i].value) ;
							//scaleing=1;
							nbar=((value)/barsize)/scaleing; //number of required bar
							nbar=parseInt(nbar);
							//console.log(nbar)


							
							for(var j=0;j<nbar;j++){
								ctx.drawImage(imagePaper,hpix,vpix,barsize,barsize);
								//ctx.fillRect(hpix,vpix,barsize,barsize);
								hpix+=barsize*1.2;
							}


							var tempvalue1=(Number(json[i].value)/totalvalue)*100
							tempvalue1=tempvalue1.toFixed(2);
							var tempvalue="("+tempvalue1+"%)";
							ctx.fillText(tempvalue, hpix, 45*(i+1));

							horlength.push(hpix+75);//something needs to be done here for alignment
							vpix+=45;
						}
					}
					



					//console.log(horlength);
					var maxhorlength=0;
					for(var a=0;a<horlength.length;a++){
						if(maxhorlength<Number(horlength[a])){
							maxhorlength=Number(horlength[a]);
						}
					}
					//console.log("hello "+maxhorlength);
					verlegth=vpix-80+50;

					if(jsonconfig[6].value=="centerleft"){
						newx=-100;
						newy=(1080-verlegth)/2;
					}
					else if(jsonconfig[6].value=="center"){
						newx=(1920-maxhorlength)/2;
						newy=(1080-verlegth)/2;
					}
					else if(jsonconfig[6].value=="centerright"){
						newx=1920-maxhorlength+80;
						newy=(1080-verlegth)/2;
					}

					else if(jsonconfig[6].value=="topleft"){
						newx=-100;
						newy=-50;
					}
					else if(jsonconfig[6].value=="topright"){
						newx=1920-maxhorlength+80;;
						newy=-50;
					}
					else if(jsonconfig[6].value=="bottomleft"){
						newx=0;
						newy=1080-verlegth+20;
					}
					else if(jsonconfig[6].value=="bottomright"){
						newx=1920-maxhorlength+80;;
						newy=1080-verlegth+20;
					}


					


					//newx=(1920-maxhorlength)/2
					//newy=(1080-verlegth)/2;
			
				
			
				
					//console.log(verlegth);
				
		}	
				
			  
			
   }

   
   //$scope.myrunner();
 
		});
