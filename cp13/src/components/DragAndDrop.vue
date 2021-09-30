<template>
  <div>
    <div class = 'container'>

      <news-frame :newsTitle="newsTitle" :imgPath="imgPath" :description="newsDetails">

      </news-frame>

      <div class = 'question'>
        {{msg}}
      </div>
      <hr>

      <div v-for = 'panel in panels' :key='panel.id' class='drop-zone'
           @drop = 'onDrop($event,panel.id)'
           @dragenter.prevent
           @dragover.prevent
           :style="{height: dynamicHeight}">
        <hr>
        <h6>{{panel.info}}</h6>
        <hr>
        <div v-for='item in panelListItem(panel.id)' :key='item.title' class='drag-el' draggable="true"
             @dragstart = 'startDrag($event,item)'
             @mousehover="hover=true"
             @mouseleave="hover=false"
        >
          <span>{{ item.title }}</span>
        </div>
      </div>
    </div>
    <switch-button :requireANS="requireANS" :response=response>

    </switch-button>
  </div>

</template>


<script>

import {tempStorage} from "../utils/storage";
import SwitchButton from "./SwitchButton";
import NewsFrame from "./NewsFrame";

export default {
  name: "DragAndDrop",
  components: {SwitchButton, NewsFrame},
  data () {
    return {
      response: "",
      responseJSON:{},
      isExpanded:true,
      msg:"dcfvgbhnjrcvcrxcdtfvgybgyvtrctfvgtbynuj",
      newsTitle: '',
      imgPath:'',
      newsDetails:'',
      requireANS:false,
      panels: [
        {
          info: "Waiting for classification",
          id: 0
        },
        {
          info: "This is class 1",
          id: 1
        },
        {
          info: "This is class 2",
          id: 2
        }
      ],
      items: [
        {
          id: 0,
          title: 'Item A Item A',
          list: 0
        },
        {
          id: 1,
          title: 'Item B',
          list: 0

        },

        {
          id: 2,
          title: 'Item C',
          list: 0
        }]
    }
  },

  mounted(){
    this.initPage();
  },

  computed:{
    dynamicHeight() {
      return this.items.length*70+'px';
    }
  },

  methods: {
    initPage() {
      let jsonQuestion = tempStorage.getQuestionJSON(this.$route.params.id);
      let jsonObj = JSON.parse(JSON.stringify(jsonQuestion));
      this.msg = jsonObj.description;
      this.isExpanded = jsonObj.isExpanded;
      this.panels = jsonObj.panels;
      this.items = jsonObj.items;
      this.newsTitle = jsonObj.newsTitle;
      this.requireANS = jsonObj.Required;
      console.log("requiredJSON: "+this.requireANS);

      this.imgPath = jsonObj.img;
      this.newsDetails = jsonObj.newsDescription;

      if(JSON.stringify(tempStorage.getQuestionAnswerJSON(this.$route.params.id))!=="{}"){
        let jsonQuestionH = tempStorage.getQuestionAnswerJSON(this.$route.params.id);
        let jsonObjH = JSON.parse(JSON.stringify(jsonQuestionH));
        this.items = jsonObjH.answers;
        this.responseJSON.answers = this.items
        this.response = JSON.stringify(this.responseJSON)
      }
    },
    expandClick(){
      this.isExpanded = !this.isExpanded
    },

    capitalize: function(value){
      if(!value) return 'NO!'
      value = value.toString();
      if(value.length >10){
        return value.substr(0,10)
      }else{
        return value
      }
    },

    startDrag: (evt, item) => {
      evt.dataTransfer.dropEffect = 'move'
      evt.dataTransfer.effectAllowed = 'move'
      evt.dataTransfer.setData('itemID', item.id)
    },

    onDrop (evt, list) {
      const itemID = evt.dataTransfer.getData('itemID')
      const item = this.items.find(item => item.id == itemID)
      item.list = list
      this.responseJSON.answers = this.items
      this.response = JSON.stringify(this.responseJSON)
    },

    panelListItem: function (value) {
      return this.items.filter(item => item.list === value)
    }
  }

}
</script>

<style scoped>

.question{
  font-family: Arial,serif;
  font-size: 20px;
  width: 100%;
  background-color: white;
  text-align: center;
}

.drop-zone {
  background-color: #EFF2F5;
  border-radius:6px 6px 6px 6px;
  margin-bottom: 10px;
  align-items: center;
}
.drop-zone > h6 {
  height:3%;
  text-align: center;
}
.drop-zone > hr {
  height:1%;
}

.drag-el {
  width:auto;
  background-color: #5DB3EC;
  border-radius:6px 6px 6px 6px;
  margin-bottom: 10px;
  padding: 5px;
  display:inline-block;
  vertical-align: middle;
  margin-left: 50px;
  text-align: -webkit-center;
}
.drag-el:hover{
  background-color: #dfeefc;
}

</style>
