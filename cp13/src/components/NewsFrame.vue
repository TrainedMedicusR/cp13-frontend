<template>
  <div class="container">
  <div>
    <h1>{{newsTitle}}</h1>
  </div>

  <div class="news">
    <div class="picture">
      <img :src="imgPath" alt="">
    </div>
    <div v-if="this.rtl">
      <div class= "newsTextRTL" dir="rtl">
        {{isExpanded ? description : capitalize(description)}}
        <button>
          <span @click = "expandClick" class = "expand">
            {{isExpanded ? "show less": "show more"}}
          </span>
        </button>
      </div>
    </div>

    <div v-else>
      <div class="newsText" dir = "ltr">
        {{isExpanded ? description : capitalize(description)}}
        <button>
          <span @click = "expandClick" class = "expand">
            {{isExpanded ? "show less": "show more"}}
          </span>
        </button>
      </div>
    </div>

  </div>
  </div>
</template>
<script>
import {tempStorage} from "../utils/storage";
export default {
  name: "NewsFrame",

  props: {
    imgPath: String,
    newsTitle: String,
    description: String,
    required: true,
    rtl: false
  },

  data(){
    return{
      isExpanded: true,
    }
  },
  methods:{
    expandClick(){
      this.isExpanded = !this.isExpanded
    },

    capitalize: function(value){
      if(!value) return 'NO!'
      value = value.toString();
      let index = 300;
      while(value.charAt(index)!==' '){
        index--;
      }
      if(value.length >index){
        return value.substr(0,index)
      }else{
        return value
      }
    },
  }
}
</script>

<style scoped>
.container {
  /*border: 1px solid grey;*/
  /*width: 700px;*/
  width: 70%;
  padding: 20px;
  text-align: center;
  align-content: center;
  /*border: 1px solid black;*/
}

.news{
  text-align: center;
  /*border: 1px solid grey;*/
  font-size: 15px;
  /*align-content: center;*/
  margin-bottom: 20px;
  /*display:table-cell;*/
  align-items: center;
}

.newsText{
  margin-top: 12px;
  /*display:inline-block;*/
  text-align: left;
}

.newsTextRTL{
  margin-top: 12px;
  text-align: right;
}

.expand{
  color: cornflowerblue;
}
.picture{
  border: 2px solid grey;
  /*width: 600px;*/
  width: 60%;
  display: inline-block;
  vertical-align: middle;
}

.picture img{
  /*height: 250px;*/
  width: 100%;
  height:100%;
  max-width: 100%;
  max-height: 100%;
  margin: auto;

}
</style>
