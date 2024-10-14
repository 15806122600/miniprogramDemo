export const getLucky = function(arr) {
    var leng = 0;
    for(var i=0; i<arr.length; i++){
        leng+=arr[i]                                     //获取总数
        //console.log("leng=>"+leng)
    }
    for(var i=0; i<arr.length; i++){
        var random = parseInt(Math.random()*leng);       //获取 0-总数 之间的一个随随机整数
        console.log("random=>"+random)
        console.log("arr[i]=>"+arr[i])
        if(random<arr[i]){
            return i                                     //如果在当前的概率范围内,得到的就是当前概率
        }
        else {
            leng-=arr[i]                                 //否则减去当前的概率范围,进入下一轮循环
        }
    }
}

export const getRand = function(obj){
    this.obj = obj;
    return this.init();
}

//取得结果
getRand.prototype.init = function(){
    var result = null;
    var self = this;
    var obj = this.obj;
    var sum = this.sum('prob');	//几率总和
    for(var i in obj){
        var rand = parseInt(Math.random()*sum);
        if(rand<=obj[i].prob){
            result = obj[i];
            break;
        }else{
            sum-=obj[i].prob;
        }
    }
    return result;
};

//获取几率总和
getRand.prototype.sum = function(key){
    var self = this;
    var obj = this.obj;
    var sum=0;
    for(var i in obj){
        sum+=obj[i][key];
    }
    return sum;
};