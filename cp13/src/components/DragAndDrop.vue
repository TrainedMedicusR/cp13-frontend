<template>
  <div>
    <div class = 'container'>
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
           @dragover.prevent>
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
    <switch-button :response=JSON.stringify(responseJSON)>

    </switch-button>
  </div>

</template>


<script>

import {tempStorage} from "../utils/storage";
import SwitchButton from "./SwitchButton";

export default {
  name: "DragAndDrop",
  components: {SwitchButton},
  data () {
    return {
      responseJSON: {},
      isExpanded:false,
      msg:"dcfvgbhnjrcvcrxcdtfvgybgyvtrctfvgtbynuj",
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

  methods: {
    initPage() {
      let jsonQuestion = tempStorage.getQuestionJSON(this.$route.params.id);
      console.log("tempStorage: "+JSON.stringify(jsonQuestion));
      let jsonObj = JSON.parse(JSON.stringify(jsonQuestion));
      console.log("msg:"+JSON.stringify(jsonObj.description));
      this.msg = jsonObj.description;
      console.log("isExpanded:"+JSON.stringify(jsonObj.isExpanded));
      this.isExpanded = jsonObj.isExpanded;
      console.log("panels:"+JSON.stringify(jsonObj.panels));
      this.panels = jsonObj.panels;
      console.log("items:"+JSON.stringify(jsonObj.items));
      this.items = jsonObj.items;
      this.responseJSON.questionid=jsonObj.order;
      this.responseJSON.items=this.items;
      console.log("Current Response: "+JSON.stringify(this.responseJSON));
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
      console.log("Updated Response!: "+JSON.stringify(this.responseJSON))
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
    height: 180px;
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
