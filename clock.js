var dom = document.getElementById('clock');
var ctx = dom.getContext("2d");
var width = ctx.canvas.width;
var height = ctx.canvas.height;
var r = width/2;
var rem = width/200;/*比例，用于将时钟等比例放大或缩小*/

function drawbackground(){
	ctx.save();
	ctx.translate(r,r);/*重新映射画布上的 (0,0) 位置*/
	ctx.beginPath();
	ctx.lineWidth = 10 * rem;
	ctx.fillStyle = "#5b4e63";
	ctx.fill();
	ctx.arc(0,0,r-ctx.lineWidth/2,0,2*Math.PI,false);
	var gradient = ctx.createLinearGradient(0,0,150*rem,0);
	gradient.addColorStop("0","#a184f3");
	gradient.addColorStop("0.8","purple");
	ctx.strokeStyle = gradient;
	ctx.stroke();


	// 画小时数
	var hourNumbers = [3,4,5,6,7,8,9,10,11,12,1,2];//因为圆的开始角是从表盘数字3的位置开始的
	ctx.font = 18 * rem +"px Arial";/*规定小时数的字体*/
	ctx.textAlign = "center";/*左右对齐*/
	ctx.textBaseline = "middle";/*上下对齐*/
	hourNumbers.forEach(function(number,i){
		var rad = 2*Math.PI/12 * i;/*每个小时数的角度*/
		var x = Math.cos(rad) * (r - 30 * rem);/*小时数的横坐标*/
		var y = Math.sin(rad) * (r - 30 * rem);/*小时数的纵坐标*/
		ctx.fillText(number,x,y);/*在对应坐标点填上数字*/
	});

	// 画60个点
	for(var i = 0;i < 60;i++){
		var rad = 2*Math.PI/60 * i;
		var x = Math.cos(rad) * (r - 18 * rem);
		var y = Math.sin(rad) * (r - 18 * rem);
		ctx.beginPath();
		   // 如果是小时数，则为大点
		if(i % 5 ===0){
			ctx.fillStyle = "orange";
			ctx.arc(x,y,3 * rem,0,2*Math.PI,false);
		}else{
			// 如果不是小时数，则为小点
			ctx.fillStyle = "#b8a1fa";
			ctx.arc(x,y,2 * rem,0,2*Math.PI,false);
		}
		ctx.fill();/*填充成实心圆*/
	}
}
 
// 画时针
function drawHour(hour,minute){
	ctx.save();/*保存住当前状态*/
	ctx.beginPath();
	var rad = 2*Math.PI/12 * hour;/*定义弧度*/
	var mrad = 2*Math.PI/12/60 *minute;/*因为时针的角度跟分针也有关系*/
	ctx.rotate(rad + mrad);/*旋转指针到指定点数*/
	ctx.lineWidth = 4 * rem;
	ctx.lineCap = "round";/*让针头是圆的*/
	ctx.moveTo(0,10 * rem);/*时针的起点，从中心点往下10像素开始*/
	ctx.lineTo(0,-r/2);/*时针的终点，正数朝下，负数朝上*/
	ctx.strokeStyle = "#a95fdd";
	ctx.stroke();
	ctx.restore();/*清空之前的设置，为下一个措施准备*/
}

// 画分针
function drawMinute(minute){
	ctx.save();
	ctx.beginPath();
	var rad = 2*Math.PI/60 * minute;
	ctx.rotate(rad);	
	ctx.lineWidth = 3 * rem;
	ctx.lineCap = "round";
	ctx.moveTo(0,10 * rem);
	ctx.lineTo(0,-r+30 * rem);
	ctx.stroke();
	ctx.restore();
}

// 画秒针
function drawSecond(second){
	ctx.save();
	ctx.beginPath();
	ctx.fillStyle = "#c14543";
	var rad = 2*Math.PI/60 * second;
	ctx.rotate(rad);
	//因为秒针由尾部到头部是由粗到细
	ctx.moveTo(-2 * rem,20 * rem);
	ctx.lineTo(2 * rem,20 * rem);
	ctx.lineTo(1 * rem,-r+18 * rem);
	ctx.lineTo(-1 * rem,-r+18 * rem);
	ctx.fill();
	ctx.restore();
}

// 画中心圆点
function drawDot(){
	ctx.beginPath();
	ctx.arc(0,0,3 * rem,0,2*Math.PI,false);
	ctx.fillStyle = "#fff";
	ctx.fill();
}
// 让针动起来
function draw(){
	ctx.clearRect(0,0,width,height);/*清空之前针走的痕迹*/
	var now = new Date();
	var hour = now.getHours();
	var minute = now.getMinutes();
	var second = now.getSeconds();
	drawbackground();
	drawHour(hour,minute);
	drawMinute(minute);
	drawSecond(second);
	drawDot();
	ctx.restore();
}
// 每秒走一下
setInterval(draw,1000);