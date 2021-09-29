<template>
  <div class="container">
    <header class = 'consent'>
      {{text}}
    </header>
    <hr>
    <button class='agreeButton' v-on:click="agreeConsent"
            @mousehover="hover=true"
            @mouseleave="hover=false">I Agree</button>

    <button class='disagreeButton' v-on:click="disagreeConsent"
            @mousehover="hover=true"
            @mouseleave="hover=false">I Disagree</button>
  </div>
</template>

<script>

export default {
  name: "ConsentPage",

  props:{
    text:String
  },

  data(){
    return{
      isExpanded:true,
    }
  },

  mounted(){
    this.initPage();
  },

  methods:{
    initPage() {

    },
    expandClick(){
      this.isExpanded = !this.isExpanded;
    },

    capitalize: function(value){
      if(!value) return 'NO!'
      value = value.toString();
      if(value.length >500){
        return value.substr(0,10)
      }else{
        return value
      }
    },

    agreeConsent(){
      this.$emit('consentValue',true);
    },
    disagreeConsent() {
      alert("Thank you!");
    }

  }

}
</script>

<style scoped>
.consent{
  font-family: Arial,serif;
  font-size: 20px;
  width: 100%;
  background-color: white;
  text-align: center;
}
.expand{
  color: cornflowerblue;
}
.container{
  display: contents;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.agreeButton{
  position: absolute;
  left: 40%;
  transform: translate(-50%,-50%);
}

.disagreeButton{
  position: absolute;
  left: 60%;
  transform: translate(-50%,-50%);
}

.disagreeButton:hover,.agreeButton:hover{
  background: #337ab7;
}
</style>
