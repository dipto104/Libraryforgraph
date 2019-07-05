var app = angular.module("demo", []);
    app.controller("testCtrl", function($scope) {


        var input=[{"status":"PAY_FAIL","value":6248},{"status":"PAY_SUCCESS","value":868},{"status":"PM_REQUESTED","value":11199},{"status":"PAY_INIT","value":992}] ;


        var config=[
        {"type":"font_name","value":"Calibri"},
        {"type":"font_size","value":"25px"},
        {"type":"font_style","value":"Bold"},
        {"type":"canvas_height","value":"800"},
        {"type":"canvas_width","value":"800"},
        {"type":"background_color","value":"white"},
        {"type":"alignment","value":"center"},
        {"type":"bar_size","value":"25"},
        {"type":"bar_space","value":1.2},
        {"type":"bar_image_src","value":"Img/bar4.jpg"}
        ] ;



        var input2=[{"status":"PAY_FAIL","value":200},{"status":"PAY_SUCCESS","value":400},{"status":"PM_REQUESTED","value":400},{"status":"PAY_INIT","value":600}];
        
        $scope.myfn=function(){

            var chart=new imagechart();

            chart._$myrunner('myCanvas',input,config);
            chart._$myrunner('myCanvas2',input2,config);
        }


        $scope.myfn();
        
});