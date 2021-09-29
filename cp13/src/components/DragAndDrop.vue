<template>
  <div>
    <div class = 'container'>

      <news-frame :newsTitle="newsTitle" :imgPath="imgPath" :description="newsDetails">

      </news-frame>

      <div class = 'question'>
        {{isExpanded ? msg : capitalize(msg)}}
        <button>
          <span @click = "expandClick" class = "expand">
            {{isExpanded ? "show less": "show more"}}
          </span>
        </button>
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
    <switch-button :response=response>

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

      this.imgPath = jsonObj.img;

      this.newsDetails = jsonObj.newsDescription;
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

.qid{
  font-family: Times New Roman,serif;
  font-size: 30px;
  width: 100%;
  background-color: white;
  text-align: center;
}
.question{
  font-family: Arial,serif;
  font-size: 20px;
  width: 100%;
  background-color: white;
  text-align: center;
}
.expand{
  color: cornflowerblue;
}
.drop-zone {
  background-color: rgb(224, 192, 132);
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
  background-color: rgb(161, 197, 239);
  border-radius:6px 6px 6px 6px;
  margin-bottom: 10px;
  padding: 5px;
  display:inline-block;
  vertical-align: middle;
  margin-left: 50px;
  text-align: -webkit-center;
}
.drag-el:hover{
  background: #337ab7;
}
.next {
  text-align: center;
}
</style>
