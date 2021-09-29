<template>
  <div class="wrapper">
    <news-frame :newsTitle="newsTitle" :imgPath="imgPath" :description="newsDetails">
    </news-frame>

    <div class="container">
      <div class="ele question">
        <!-- This section are all question buttons like share,like,check. -->
        <div class = "QuestionButtons">
          <div class = "buttoninline" v-for="item in this.questionbutton" v-bind:key="item.id">
            <div v-if="item.title=='share'">
              <button class="btn-primary btn-lg" v-on:click="response('share')">
                <i class="glyphicon glyphicon-share"></i>  Share
              </button>
            </div>
            <div v-else-if="item.title==='check'">
              <button class="btn-secondary btn-lg" v-on:click="response('check')">
                <i class="glyphicon glyphicon-question-sign"></i>  Check
              </button>
            </div>
            <div v-else-if="item.title==='like'">
              <button class="btn-info btn-lg" v-on:click="response('like')">
                <i class="glyphicon glyphicon-heart"></i> Like
              </button>
            </div>
            <div v-else-if="item.title==='skip'">
              <button class="btn-skip btn-lg" v-on:click="response('skip')">
                <i class="glyphicon glyphicon-forward"></i> Skip
              </button>
            </div>
            <div v-else>
              <button class="btn-success btn-lg" v-on:click="response(item.title)">
                {{item.title}}
              </button>
            </div>



          </div>
        </div>
        <hr>
      </div>
    <SwitchButton :response=responseJSON>
    </SwitchButton>
    </div>

  </div>

</template>

<script>

import {tempStorage} from "../../utils/storage";
import SwitchButton from "../SwitchButton";
import NewsFrame from "../NewsFrame";
export default {
  name: 'ButtonQuestion',
  components: {SwitchButton,NewsFrame},
  data () {
    return {
      responseJSON:'',
      host:location.hostname,
      description:"",
      newsTitle: '',
      imgPath:'',
      newsDetails:'',
      questionbutton:[{title:"share"}, {title:"like"}, {title:"check"}, {title:"skip"}]
    }
  },
  mounted(){
    this.initPage();
  },
  methods: {
    initPage() {
      let jsonQuestion = tempStorage.getQuestionJSON(this.$route.params.id);
      console.log("backend_data: "+JSON.stringify(jsonQuestion));

      let jsonObj = JSON.parse(JSON.stringify(jsonQuestion));

      console.log("description: "+JSON.stringify(jsonObj.description));
      this.description = jsonObj.description;

      console.log("questionbutton: "+JSON.stringify(jsonObj.questionbutton));
      this.questionbutton = jsonObj.questionbutton;

      this.newsTitle = jsonObj.newsTitle;

      this.imgPath = jsonObj.img;

      this.newsDetails = jsonObj.newsDescription;
    },

    response: function (msg) {
      this.responseJSON = JSON.stringify({"answer": msg});
      // console.log("Current_Response: "+this.responseJSON);
    }
  }
}


</script>

<style scoped>
body {
  background-color: #EFF2F5;
}

.container {
  width: 700px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
  align-content: center;
}

.wrapper{
  text-align: center;
}

.ele {
  width: 40%;
  /*height: 400px;*/
}

.ele:nth-child(3n+1) {
  width: 100%;
}

.question{
  width: 60%;
  background-color: white;
  text-align: center;
}

.buttoninline{
  margin: 20px auto;
  margin-right:9px;
  display:inline-block;
}


.btn-skip {
  text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.2);
  -webkit-box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.15), 0 1px 1px rgba(0, 0, 0, 0.075);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.15), 0 1px 1px rgba(0, 0, 0, 0.075);
  background-image: -webkit-linear-gradient(top, #B4CDDE 0%, #B4CDDE 100%);
  background-image: -o-linear-gradient(top, #B4CDDE 0%, #B4CDDE 100%);
  background-image: linear-gradient(to bottom, #B4CDDE 0%, #B4CDDE 100%);
  background-repeat: repeat-x;
  border-color: #B4CDDE;
}
.btn-skip:hover,
.btn-skip:focus{
  background-color: #B4CDDE;
  background-position: 0 -15px;
}
</style>