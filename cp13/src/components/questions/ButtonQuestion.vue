<template>
  <div class="wrapper">
    <p style="text-align:right">
    <news-frame :rtl="this.rtl" :newsTitle="this.newsTitle" :imgPath="this.imgPath" :description="this.newsDetails"></news-frame>
    </p>
<!--    style="direction:rtl; unicode-bidi:bidi-override;"-->
    <div class="container">
      <div class="ele question" align="right">
        <p style="text-align:right">
        {{this.description}}
        </p>
        <!-- This section are all question buttons like share,like,check. -->
        <div class = "QuestionButtons">
          <div v-if="this.rtl">
            <div class = "buttoninline" v-for="(item, i) in this.question_button" v-bind:key="item.id">
                <button :id = "i" style="direction:rtl; unicode-bidi:bidi-override;"  class="btn-skip btn-lg" v-on:click="response(item.title,i)">
                  {{item.title}}
                </button>
            </div>
          </div>
          <div v-else>
            <div class = "buttoninline" v-for="(item, i) in this.question_button" v-bind:key="item.id">
              <div v-if="item.title==='share'">
                <button :id = "i" class="btn-skip btn-lg" v-on:click="response('share',i)">
                  <i class="glyphicon glyphicon-share"></i>  Share
                </button>
              </div>
              <div v-else-if="item.title==='check'">
                <button :id = "i" class="btn-skip btn-lg" v-on:click="response('check',i)">
                  <i class="glyphicon glyphicon-question-sign"></i>  Check
                </button>
              </div>
              <div v-else-if="item.title==='like'">
                <button :id = "i" class="btn-skip btn-lg" v-on:click="response('like',i)">
                  <i class="glyphicon glyphicon-heart"></i> Like
                </button>
              </div>
              <div v-else-if="item.title==='skip'">
                <button :id = "i" class="btn-skip btn-lg" v-on:click="response('skip',i)">
                  <i class="glyphicon glyphicon-forward"></i> Skip
                </button>
              </div>
              <div v-else>
                <button :id = "i" class="btn-skip btn-lg" v-on:click="response(item.title,i)">
                  {{item.title}}
                </button>
              </div>
            </div>
          </div>

        </div>
        <hr>
      </div>
    <SwitchButton :requireANS="requireANS" :response=responseJSON>
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
      question_button:[{title:"share"}, {title:"like"}, {title:"check"}, {title:"skip"}],
      requireANS:false,
      rtl:false
    }
  },
  mounted(){
    this.initPage();
    this.$forceUpdate()
  },
  methods: {
    initPage() {
      this.rtl = "true" === tempStorage.getRTL(this.$route.params.id);
      let jsonQuestion = tempStorage.getQuestionJSON(this.$route.params.id);

      let jsonObj = JSON.parse(JSON.stringify(jsonQuestion));

      this.description = jsonObj.description;

      this.question_button = jsonObj.question_button;

      this.newsTitle = jsonObj.newsTitle;

      this.imgPath = jsonObj.img;

      this.newsDetails = jsonObj.newsDescription;
      this.requireANS = jsonObj.Required;

      this.rtl = jsonObj.right_to_left;

      let  json_History= tempStorage.getQuestionAnswerJSON(this.$route.params.id);
      if (JSON.stringify(json_History) !== "{}"){
        this.responseJSON = JSON.stringify(json_History);
        document.getElementById(json_History.answer).focus();
      }

    },

    response: function (msg,id) {
      this.responseJSON = JSON.stringify({"answer": id,"result":msg});
    }
  }
}


</script>

<style scoped>
body {
  background-color: #EFF2F5;
}

.container {
  width: 100%;
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
  background-repeat: repeat-x;
  border-color: #B4CDDE;
}
.btn-skip:hover{
  background-color: #B4CDDE;
}
.btn-skip:active{
  background-color: #3497d9;
}
.btn-skip:focus{
  background-color: #3497d9;
}

</style>
