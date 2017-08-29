"use strict";!function(){var e=window.innerWidth,t=window.innerHeight,o={title:"SPACECRAFT",frameRate:30,bgColor:"#38c",canvas:document.getElementById("gameBox"),size:800,ratio:1,playing:!1,best:localStorage.getItem("highScore")||0,score:0,gameTime:0,firing:!1,fire_init:!1,roundedRect:function(e,t,n,a,l,s,i){o.context.save(),o.context.translate(e,t),o.context.beginPath(),o.context.moveTo(l,0),o.context.arcTo(n,0,n,a,l),o.context.arcTo(n,a,0,a,l),o.context.arcTo(0,a,0,0,l),o.context.arcTo(0,0,n,0,l),"stroke"===i?(o.context.strokeStyle=s,o.context.stroke()):(o.context.fillStyle=s,o.context.fill()),o.context.closePath(),o.context.restore()},ellipse:function(e,t,n,a,l){var s=1,i=1,r=n>a?(i=a/n,n):(s=n/a,a);o.context.save(),o.context.scale(s,i),o.context.beginPath(),o.context.arc(e/s,t/i,r,0,2*Math.PI,!1),o.context.fillStyle=l,o.context.fill(),o.context.closePath(),o.context.restore()},star:function(e,t,n,a,l){var s=.5*-Math.PI,i=2*Math.PI/5*2;o.context.save(),o.context.translate(e,t),o.context.beginPath();for(var r=0;r<6;r++){var c=s+i*r,u=Math.cos(c)*n,x=Math.sin(c)*n;o.context.lineTo(u,x)}"stroke"===l?(o.context.strokeStyle=a,o.context.stroke()):(o.context.fillStyle=a,o.context.fill()),o.context.closePath(),o.context.restore()},heart:function(e,t,n,a,l){o.context.save(),o.context.translate(e,t),o.context.beginPath(),o.context.fillStyle="#fff",o.context.arc(n/4,-n/4,n/4,Math.PI,Math.atan2(2,3)),o.context.lineTo(0,n/2),o.context.arc(-n/4,-n/4,n/4,Math.PI-Math.atan2(2,3),2*Math.PI),o.context.strokeStyle=a,o.context.stroke(),"stroke"===l?(o.context.strokeStyle=a,o.context.stroke()):(o.context.fillStyle=a,o.context.fill()),o.context.closePath(),o.context.restore()},arrowkey:function(e,t,n,a){o.roundedRect(e,t+.175*n,.3*n,.3*n,.1*n,a),o.roundedRect(e,t+.52*n,.3*n,.3*n,.1*n,a),o.roundedRect(e-.35*n,t+.52*n,.3*n,.3*n,.1*n,a),o.roundedRect(e+.35*n,t+.52*n,.3*n,.3*n,.1*n,a)},role:{size:20,sightSize:10,color:"#fff",healthSize:20,healthX:20,healthY:20,healthW:40,healthH:20,healthPos:90,healthDist:5,healthColor:"#fff",healthRadius:5,health:3,maxLevel:3,level:0,x:0,y:0,radian:0,weapon:["gun1","gun2","shotgun1","shotgun2"],moving:[!1,!1,!1,!1],invisible:!1,fade:function(){o.role.color="rgba(255, 255, 255, .6)",o.role.invisible=!0;for(var e=[.4,.2,.4,.6],t=0,n=0;n<12;n++)!function(n){setTimeout(function(){o.role.color="rgba(255, 255, 255, "+e[n%4]+")"},100*t),t++,n%4==2&&(t+=2)}(n);setTimeout(function(){o.role.color="#fff",o.role.invisible=!1},2e3)},showHealth:function(){o.context.save(),o.context.translate(o.role.healthX,o.role.healthY),o.context.fillStyle=o.role.healthColor,o.context.font=o.role.healthSize+"px sans-serif",o.context.fillText("HEALTH:",0,o.role.healthSize);for(var e=0;e<o.role.health;e++)o.roundedRect(o.role.healthPos+e*(o.role.healthW+o.role.healthDist),3,o.role.healthW,o.role.healthH,o.role.healthRadius,o.role.healthColor);o.context.restore()},move:function(){o.role.moving.map(function(e,t){e&&[function(){o.role.y<=o.role.size||(o.role.y-=5)},function(){o.role.x>=o.canvas.width-o.role.size||(o.role.x+=5)},function(){o.role.y>=o.canvas.height-o.role.size||(o.role.y+=5)},function(){o.role.x<=o.role.size||(o.role.x-=5)}][t]()}),o.role.radian=o.calcRadian(o.role.x,o.role.y,o.evntX,o.evntY),o.context.save(),o.context.translate(o.role.x,o.role.y),o.context.rotate(o.role.radian+.5*Math.PI),o.context.beginPath(),o.context.moveTo(-o.role.size/2,o.role.size/2-2),o.context.lineTo(-1,.3*o.role.size),o.context.lineTo(-1,-o.role.size/2),o.context.moveTo(1,-o.role.size/2),o.context.lineTo(1,.3*o.role.size),o.context.lineTo(o.role.size/2,o.role.size/2-2),o.context.fillStyle=o.role.color,o.context.fill(),o.context.closePath(),o.context.restore()},aiming:function(){o.context.save(),o.context.translate(o.evntX,o.evntY),o.context.fillStyle="#fff",o.context.fillRect(-o.role.sightSize,-1,o.role.sightSize/2,2),o.context.fillRect(o.role.sightSize/2,-1,o.role.sightSize/2,2),o.context.fillRect(-1,-o.role.sightSize,2,o.role.sightSize/2),o.context.fillRect(-1,o.role.sightSize/2,2,o.role.sightSize/2),o.context.restore()}},foe:{size:12,color:"#f90",speed:3,growth:200,foeNumX:-100,foeNumY:20,foeNumSize:20,foes:[],foeUpdate:function(e){e.radian=o.calcRadian(e.x,e.y,o.role.x,o.role.y),e.speedX=o.foe.speed*Math.cos(e.radian),e.speedY=o.foe.speed*Math.sin(e.radian),e.x+=e.speedX,e.y+=e.speedY,!o.role.invisible&&o.calcDistance(e.x,e.y,o.role.x,o.role.y)<o.role.size&&(o.foe.setPostion(e),o.role.health--,o.role.fade(),o.role.level&&o.role.level--,o.createAudio("./sound/explode.wav"),!o.role.health&&o.end()),o.context.save(),o.context.translate(e.x,e.y),o.context.rotate(e.radian+.5*Math.PI),o.ellipse(0,0,o.foe.size,.5*o.foe.size,o.foe.color),o.context.restore()},setPostion:function(e){switch(Math.floor(4*Math.random())){case 0:e.x=Math.random()*o.canvas.width,e.y=0;break;case 1:e.x=Math.random()*o.canvas.width,e.y=o.canvas.height;break;case 2:e.x=0,e.y=Math.random()*o.canvas.height;break;case 3:e.x=o.canvas.width,e.y=Math.random()*o.canvas.height}},getFoe:function(){var e={radian:0};o.foe.setPostion(e),o.foe.foes.push(e)},update:function(){o.foe.foes.map(function(e){o.foe.foeUpdate(e)})},showFoe:function(){o.context.save(),o.context.translate((o.canvas.width+o.foe.foeNumX)%o.canvas.width,o.foe.foeNumY),o.context.fillStyle=o.foe.color,o.context.font=o.foe.foeNumSize+"px sans-serif",o.context.fillText("FOES: "+o.foe.foes.length,0,o.foe.foeNumY),o.context.restore()}},barrage:{color:"#fff",speed:10,frame:10,bullets:[],bulletUpdate:function(e){e.x+=e.speedX,e.y+=e.speedY,o.foe.foes.map(function(t){if(o.calcDistance(e.x,e.y,t.x,t.y)<=o.foe.size){if(e.x=-5,!o.bonus.exist&&!Math.floor(Math.random()*o.bonus.probability)){var n=Math.floor(Math.random()*o.bonus.probability)?"star":"heart";o.bonus.getBonus(n,t.x,t.y)}o.score+=100,o.foe.setPostion(t)}}),o.context.fillStyle=o.barrage.color,o.context.fillRect(e.x-2,e.y-2,4,4)},getBullet:function(e,t,n){var a={};if(a.x=o.role.x,a.y=o.role.y,a.radian=o.calcRadian(a.x,a.y,o.evntX,o.evntY)+o.angleToRadian(e),t||n){var l=o.calcDistance(0,0,t||0,n||0),s=o.calcRadian(0,0,t||0,n||0);a.x+=Math.sin(s+a.radian)*l,a.y-=Math.cos(s+a.radian)*l}a.speedX=o.barrage.speed*Math.cos(a.radian),a.speedY=o.barrage.speed*Math.sin(a.radian),o.barrage.bullets.push(a)},update:function(){o.barrage.bullets=o.barrage.bullets.filter(function(e){return o.barrage.bulletUpdate(e),!(e.y<0||e.x<0||e.x>o.canvas.width||e.y>o.canvas.height)})}},bonus:{size:20,bgcolor:"#fff",color:"#38c",probability:20,starColor:"#fc6",heartColor:"#f90",exist:!1,item:"",star:!1,heart:!1,update:function(){var e=o.bonus.item;if(o.roundedRect(o.bonus[e].x-.5*o.bonus.size,o.bonus[e].y-.5*o.bonus.size,o.bonus.size,o.bonus.size,.1*o.bonus.size,o.bonus.bgcolor),"star"===e&&o.star(o.bonus[e].x,o.bonus[e].y,.4*o.bonus.size,o.bonus.starColor),"heart"===e&&o.heart(o.bonus[e].x,o.bonus[e].y,.6*o.bonus.size,o.bonus.heartColor),o.calcDistance(o.bonus[e].x,o.bonus[e].y,o.role.x,o.role.y)<.85*(o.role.size+o.bonus.size)){switch(e){case"star":o.role.level<o.role.weapon.length-1&&o.role.level++;break;case"heart":o.role.health<3&&o.role.health++}o.bonus[e]=!1,o.bonus.exist=!1}},getBonus:function(e,t,n){var a={};a.x=t,a.y=n,o.bonus[e]=a,o.bonus.item=e,o.bonus.exist=!0,clearTimeout(o.bonus.timeout),o.bonus.timeout=setTimeout(function(){o.bonus[e]=!1,o.bonus.exist=!1},8e3)}},fire:function(){clearInterval(o.firing),o.firing=setInterval(function(){if(o.fire_init%10==0){switch(o.role.weapon[o.role.level]){case"gun1":o.barrage.getBullet(0);break;case"gun2":o.barrage.getBullet(0,-10,0),o.barrage.getBullet(0,10,0);break;case"shotgun1":o.barrage.getBullet(0),o.barrage.getBullet(9),o.barrage.getBullet(-9);break;case"shotgun2":o.barrage.getBullet(0),o.barrage.getBullet(6),o.barrage.getBullet(-6),o.barrage.getBullet(12),o.barrage.getBullet(-12);break;default:o.barrage.getBullet(0)}try{o.createAudio("./sound/"+o.role.weapon[o.role.level]+".wav")}catch(e){console.log(e)}}o.fire_init++},30)},keyEvent:{w:function(){o.role.moving[0]=!0},d:function(){o.role.moving[1]=!0},s:function(){o.role.moving[2]=!0},a:function(){o.role.moving[3]=!0},w_up:function(){o.role.moving[0]=!1},d_up:function(){o.role.moving[1]=!1},s_up:function(){o.role.moving[2]=!1},a_up:function(){o.role.moving[3]=!1},arrowup:function(){o.role.moving[0]=!0},arrowright:function(){o.role.moving[1]=!0},arrowdown:function(){o.role.moving[2]=!0},arrowleft:function(){o.role.moving[3]=!0},arrowup_up:function(){o.role.moving[0]=!1},arrowright_up:function(){o.role.moving[1]=!1},arrowdown_up:function(){o.role.moving[2]=!1},arrowleft_up:function(){o.role.moving[3]=!1},escape:function(){o.end()}},audios:!1,angleToRadian:function(e){return e===+e&&2*Math.PI*e/360},calcRadian:function(e,t,o,n){return Math.atan2(t-n,e-o)+Math.PI},calcDistance:function(e,t,o,n){return Math.pow(Math.pow(n-t,2)+Math.pow(o-e,2),.5)},showScore:function(){o.context.save(),o.context.translate(o.canvas.width/2,o.role.healthY),o.context.fillStyle=o.role.healthColor,o.context.font=o.role.healthSize+"px sans-serif",o.context.fillText("SCORE: "+o.score,0,o.role.healthY),o.context.restore()},createAudio:function(e){o.audios=document.createElement("audio");var t=document.createElement("source");t.type="audio/ogg",t.src=e,o.audios.autoplay="autoplay",o.audios.controls="controls",o.audios.volume=.2,o.audios.appendChild(t),o.audios.play()},consoleBox:{w:240,h:300,r:8,color:"#fff",bgcolor:"#246",titleSize:28,bestSize:18,infoSize:14,ctrlInfo:"move",starInfo:"upgrade",aimInfo:"aim",heartInfo:"repair",view:function(){this.x=(o.canvas.width-o.consoleBox.w)/2,this.y=(o.canvas.height-o.consoleBox.h)/2,o.roundedRect(o.consoleBox.x,o.consoleBox.y,o.consoleBox.w,o.consoleBox.h,o.consoleBox.r,o.consoleBox.bgcolor),o.context.save(),o.context.translate(o.consoleBox.x,o.consoleBox.y),o.context.fillStyle=o.consoleBox.color,o.context.font=o.consoleBox.titleSize+"px sans-serif";var e=o.context.measureText(o.title).width;o.context.fillText(o.title,(o.consoleBox.w-e)/2,o.consoleBox.titleSize+20),o.context.translate(0,60),o.context.font=o.consoleBox.bestSize+"px sans-serif";var t=o.best?"BEST: "+o.best:"not play yet",n=o.context.measureText(t).width;o.context.fillText(t,(o.consoleBox.w-n)/2,o.consoleBox.bestSize+20),o.context.translate(0,40),o.context.fillStyle=o.consoleBox.color,o.context.font=o.consoleBox.infoSize+"px sans-serif";var a="SCORE: "+o.score,l=o.context.measureText(a).width;o.context.fillText(a,(o.consoleBox.w-l)/2,o.consoleBox.bestSize+20),o.context.save(),o.context.fillStyle=o.consoleBox.color,o.context.translate(40,60),o.arrowkey(0,0,o.bonus.size,o.bonus.bgcolor),o.context.fillText(o.consoleBox.ctrlInfo,o.bonus.size+5,o.consoleBox.infoSize),o.context.translate(-5,35),o.ellipse(o.bonus.size/2.5,o.bonus.size/2,o.bonus.size/3,o.bonus.size/2.2,o.bonus.bgcolor),o.context.beginPath(),o.context.moveTo(o.bonus.size/2.5,0),o.context.lineTo(o.bonus.size/2.5,o.bonus.size/3),o.context.closePath(),o.context.strokeStyle="#246",o.context.stroke(),o.context.fillStyle="#fff",o.context.fillText(o.consoleBox.aimInfo,o.bonus.size+10,o.consoleBox.infoSize),o.context.translate(85,-35),o.roundedRect(0,0,o.bonus.size,o.bonus.size,.1*o.bonus.size,o.bonus.bgcolor),o.star(o.bonus.size/2,o.bonus.size/2,.4*o.bonus.size,o.bonus.starColor),o.context.fillText(o.consoleBox.starInfo,o.bonus.size+10,o.consoleBox.infoSize),o.context.translate(0,35),o.roundedRect(0,0,o.bonus.size,o.bonus.size,.1*o.bonus.size,o.bonus.bgcolor),o.heart(o.bonus.size/2,o.bonus.size/2,.6*o.bonus.size,o.bonus.heartColor),o.context.fillText(o.consoleBox.heartInfo,o.bonus.size+10,o.consoleBox.infoSize),o.context.restore(),o.context.translate(20,140),o.consoleBox.start={top:o.consoleBox.y+240,right:o.consoleBox.x+220,bottom:o.consoleBox.y+276,left:o.consoleBox.x+20},o.roundedRect(0,0,200,36,o.consoleBox.r,"#f90"),o.context.font=o.consoleBox.infoSize+"px sans-serif";var s=o.context.measureText("START").width;o.context.fillText("START",(o.consoleBox.w-40-s)/2,o.consoleBox.infoSize+9),o.context.restore()}},start:function(){this.context=this.canvas.getContext("2d"),this.canvas.view_width=e,this.canvas.view_height=t,e/t>o.ratio?this.canvas.view_width=t*o.ratio:this.canvas.view_height=e/o.ratio,this.canvas.setAttribute("style","width:"+this.canvas.view_width+"px; height:"+this.canvas.view_height+"px;"),this.canvas.width=o.size,this.canvas.height=o.size*o.ratio,this.role.x=this.canvas.width/2,this.role.y=this.canvas.height/2,this.context.fillStyle=this.bgColor,this.context.fillRect(0,0,this.canvas.width,this.canvas.height),this.consoleBox.view()},clear:function(){o.context.fillStyle=o.bgColor,o.context.fillRect(0,0,o.canvas.width,o.canvas.height),o.gameTime++,!(o.gameTime%o.foe.growth)&&o.foe.getFoe(),o.role.move(),o.role.aiming(),o.role.showHealth(),o.barrage.update(),o.showScore(),o.foe.update(),o.foe.showFoe(),o.bonus.exist&&o.bonus.update()},reset:function(){o.score>(localStorage.getItem("highScore")||0)&&(o.best=o.score,localStorage.setItem("highScore",o.score)),o.bonus[o.bonus.item]=!1,o.bonus.exist=!1,o.foe.foes=[],o.barrage.bullets=[],o.fire_init=!1,clearInterval(o.firing),o.role.health=3,o.role.level=0,o.context.fillStyle=o.bgColor,o.context.fillRect(0,0,o.canvas.width,o.canvas.height),o.consoleBox.view(),o.canvas.style.cursor="default",o.score=0},end:function(){clearInterval(o.intervalClear),o.playing=!1,setTimeout(o.reset,0)}};o.canvas.addEventListener("mousedown",function(e){if(o.playing)o.fire(e);else if(o.evntX>o.consoleBox.start.left&&o.evntX<o.consoleBox.start.right&&o.evntY>o.consoleBox.start.top&&o.evntY<o.consoleBox.start.bottom){o.playing=!0;for(var t=5;t;)o.foe.getFoe(),t--;o.canvas.style.cursor="none",o.createAudio("./sound/start.wav"),clearInterval(o.intervalClear),o.intervalClear=setInterval(o.clear,o.frameRate)}}),o.canvas.addEventListener("mouseup",function(e){o.fire_init=!1,clearInterval(o.firing)}),o.canvas.addEventListener("mousemove",function(e){o.evntX=e.offsetX*o.canvas.width/o.canvas.view_width,o.evntY=e.offsetY*o.canvas.height/o.canvas.view_width}),o.runEvent=function(e){o.keyEvent.hasOwnProperty(e)&&o.keyEvent[e](e)},document.addEventListener("keydown",function(e){o.runEvent(e.key.toLowerCase())}),document.addEventListener("keyup",function(e){o.runEvent(e.key.toLowerCase()+"_up")}),o.start()}();