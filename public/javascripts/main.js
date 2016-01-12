
function nextABC(v){
  switch (v) {
    case "A":
    return "B";
    case "B":
    return "C";
    case "C":
    return "A";
    default:
    return v;
  }
}

function panClick(that){
  var element = $(that);
  if(element.attr("data-disabled")==true){
    return;
  }
  var x = element.attr("data-x");
  var y = element.attr("data-y");
  checkerboard.disabled(x,y);
  console.log(  element.attr("data-xy")+"  x:"+x+"  y:"+y);
}

function Plate(x,y,place,stop) {
  var props={
    x:{value:x,enumerable:true,writable:false,configurable:false},
    y:{value:y,enumerable:true,writable:false,configurable:false},
    place:{value:place,enumerable:true,writable:false,configurable:false},
    stop:{value:stop===true?true:false,enumerable:true,writable:true,configurable:false},
    isOccupy:{value:false,enumerable:true,writable:true,configurable:false}
  };

  if(this instanceof Plate){
    Object.defineProperties(this,props);
  }else{
    return Object.create(Plate.prototype,props);
  }
}
Object.defineProperties(Plate.prototype,{
  setStop:{
    value:function(){
      this.stop = true;
    }
  },
  occupy:{
    value:function(bool){
      if(this.stop){
        return;
      }
      this.isOccupy = bool==true?true:false;
    }
  }
});


var checkerboard = {
  cat:{x:5,y:6},
  arr:[],
  map:{self:{},children:[]},
  minTree:{},
  haveArr:[],
  init :function(){
    var obstacleNumber = 0;
    for (var i=0;i<11 ;i++) {
      var xy;
      if(i%2==0){
        xy = "B";
      }else{
        xy="C";
      }
      var topVal = (i*60);
      for (var j=1;j<12;j++) {
        var leftVal = (j*70);
        xy = nextABC(xy);
        if(i%2==0){
          leftVal +=35;
        }
        var stop = false;
        if(obstacleNumber<10&&Math.floor(Math.random()*10)===i&&(this.cat.x!=i||this.cat.y!=j)){
          obstacleNumber++;
          stop = true;
        }
        var plate = new Plate(i,j,xy,stop);
        if(i===this.cat.x&&j===this.cat.y){
          this.cat.place = xy;
          plate.occupy(true);
        }
        this.arr.push(plate);
      }
    }
  },
  refreshView:function(elementId){
    if(!elementId){
      elementId = "#main";
    }else{
      elementId="#"+elementId;
    }
    $(elementId).empty();
    for(var i=0,len=this.arr.length;i<len;i++){
      var itemPlate = this.arr[i];
      var leftVal = (itemPlate.y*70);
      if(itemPlate.x%2==0){
        leftVal +=35;
      }
      var fill = itemPlate.stop?"#6B8E23":"#CCFF33";
      var topVal = (itemPlate.x*60);
      var disabled = itemPlate.stop;
      if(itemPlate.isOccupy){
        fill = "#000000";
        disabled = true;
      }
      $(elementId).append('<svg onclick="panClick(this)" data-disabled='+disabled+' data-sn='+i+' data-xy='+itemPlate.place+' data-x='+itemPlate.x+' data-y='+itemPlate.y+' style="left:'+leftVal+'px;top:'+topVal+'px;" width="70px" height="70px"><circle cx="35" cy="35" r="30" stroke="black" stroke-width="2" fill='+fill+'/></svg>');
    }
  },
  disabled:function(x,y){
    if(!(x&&y)){
      //TODO
      // throw new Error("Illegal Argument Exception ： x->"+x+" y->"+y);
    }
    for (var i=0,len=this.arr.length;i<len;i++) {
      var itemPlate = this.arr[i];
      if(itemPlate.stop){
        continue;
      }
      if(itemPlate.x==Number.parseInt(x)&&itemPlate.y==Number.parseInt(y)){
        itemPlate.setStop();
        this.findMinTree();
        this.refreshView();
        return;
      }
    }
  },
  occupy:function(x,y){
    if(this.cat.x==Number.parseInt(x)&&this.cat.y===Number.parseInt(y)){
      //TODO error
      throw new Error("Illegal Argument Exception in cat： x->"+x+" y->"+y);
    }
    for (var i=0,len=this.arr.length;i<len;i++) {
      var itemPlate = this.arr[i];
      if(itemPlate.x==Number.parseInt(x)&&itemPlate.y==Number.parseInt(y)){
        this.cat.x = itemPlate.x;
        this.cat.y = itemPlate.y;
        itemPlate.occupy(true);
      }else{
        itemPlate.occupy(false);
      }
    }
    this.refreshView();
  },
  findPlate(x,y){
    for (var i=0,len=this.arr.length;i<len;i++) {
      var itemPlate = this.arr[i];
      if(itemPlate.x==Number.parseInt(x)&&itemPlate.y==Number.parseInt(y)){
        return itemPlate;
      }
    }
    return null;
  },catNext(x,y,place){
    //TODO err
    return findPlate(x,y)!=null;
  },getNear(root){
    var near = [];
    near.push(this.findPlate(root.x,root.y-1));
    near.push(this.findPlate(root.x,root.y+1));
    near.push(this.findPlate(root.x+1,root.y));
    near.push(this.findPlate(root.x-1,root.y));
    if(root.x%2===0){
      near.push(this.findPlate(root.x+1,root.y+1));
      near.push(this.findPlate(root.x-1,root.y+1));
    }else{
      near.push(this.findPlate(root.x+1,root.y-1));
      near.push(this.findPlate(root.x-1,root.y-1));
    }
    return near;
  },diguei(mapNode,plate,parent){
    //排除走过的路
      console.log("=====diguei=====");
      mapNode.parent = parent;
      mapNode.self = plate;
      mapNode.plateChildren = [];
        var near =  this.getNear(plate);
      for(var i=0,len=near.length;i<len;i++){
          var nearItem = near[i];
          if(!nearItem){
            return mapNode;
          }

          if(!nearItem.stop&&this.haveArr.indexOf(nearItem.x+"-"+nearItem.y)===-1){
            this.haveArr.push(nearItem.x+"-"+nearItem.y);
            mapNode.plateChildren.push(nearItem);
          }
      }

      return false;
    },findMinTree(){
        this.haveArr = [];

    console.log("findMinTree");
    var catPlate =  this.findPlate(this.cat.x,this.cat.y);
    var rootNode = {};
    var returnNode = this.diguei(rootNode,catPlate,null);

     var childrenArr = [rootNode];
      if(!returnNode){

        while(true){
            childrenArr[0].children = [];
            for(var i=0,len=childrenArr[0].plateChildren.length;i<len;i++){
              childrenArr[0].children[i] = {};
              returnNode = this.diguei(childrenArr[0].children[i],childrenArr[0].plateChildren[i],childrenArr[0]);
                  if(returnNode){
                  console.log("returnNode");
                  console.log(returnNode);
                  console.log("root");
                  console.log(rootNode);
                    var parentNode = returnNode.parent;
                    var nextNode = returnNode.self;
                    var step=0;
                    console.log("parentNode");
                    console.log(parentNode);
                    while(true){
                      step++;
                      if(parentNode.parent){
                        nextNode = parentNode.self;
                        parentNode = parentNode.parent;
                      }else{
                        break;
                      }
                    }
                    console.log(parentNode);
                    console.log("nextNode ");
                    console.log(nextNode);
                    console.log("step "+step);
                    this.occupy(nextNode.x,nextNode.y);
                    return ;
                  }else{

            }
}
            var node = childrenArr[0];
            childrenArr.splice(0,1);
            for (var i=0,len=node.children.length;i<len;i++) {
              childrenArr.push(node.children[i]);
            }

          if(childrenArr.length<1){
            console.log("围住！");
            if(rootNode.plateChildren.length<1){
                console.log("堵死！");
                alert("堵死！");
            }else{
                this.occupy(rootNode.plateChildren[0].x,rootNode.plateChildren[0].y);
            }
            return;
          }
        }

    }else{
        alert("跑了！！");
        console.log("跑了！！");
    }
  },
  print : function(){
    console.log(this.arr);
  }
}

checkerboard.init();
// checkerboard.print();
checkerboard.refreshView();




                        // for (var i=0;i<10 ;i++) {
                        //   var xy;
                        //   if(i%2==0){
                        //     xy = "B";
                        //   }else{
                        //     xy="C";
                        //   }
                        //   var topVal = (i*60);
                        //   for (var j=1;j<13;j++) {
                        //   var leftVal = (j*70);
                        //     xy = nextABC(xy);
                        //     if(i%2==0){
                        //       leftVal +=35;
                        //     }
                        //        $("#main").append('<svg onclick="panClick(this)" data-xy='+xy+' data-x='+i+' data-y='+j+' style="left:'+leftVal+'px;top:'+topVal+'px;" ><circle cx="43" cy="50" r="30" stroke="black" stroke-width="2" fill="red"/></svg>');
                        //     }
                        //   }
