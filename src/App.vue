<template>
  <div id="app">
    <div id="agendaCont">

      <div class="box" id="agendaHeader" @click="start">
        <h2>{{time}}</h2>
        <!--
        <form @submit.prevent="setStart">
          <span>started:</span> <input type="time" v-model="startTime">
        </form>
        -->
      </div>

      <div class="box" id="agendaInput" v-show="adding">
        <form @submit.prevent="addItem">
          <label id="titleInp" for="title" style="position: relative;">
            <span style="position: absolute; left: 10px; top: -20px;">title</span>
            <input name="title" autocomplete="off" v-model="itemInp.title" type="text" placeholder="title">
          </label>
          <label id="minuteInp" for="title" style="position: relative;">
            <span style="position: absolute; left: 10px; top: -20px;">mins</span>
            <input v-model="itemInp.time" type="number" min="0" step="1" placeholder="time">
          </label>
          <input type="submit" />
        </form>
      </div>

      <div class="box" id="agendaBody">
        <!-- item widget -->
        <div class="agendaItem" @click="current = idx" :class="{'current': idx == current, 'done': idx > current}" v-for="(item, idx) in itemsRev" :key="idx">
          <div style="z-index: 9999; position: relative;">
            <span class="title">{{item.title}}</span>
            <span class="time">{{item.time}} {{item.time == 1 ? 'minute' : 'minutes'}}</span>
            <span class="date time">{{item.date}}</span>
          </div>
          <div ref="ticker" class="ticker" v-if="idx == current"></div>
        </div>
      </div>
    </div>

  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import moment from 'moment';

@Component({
  components: {}
})
export default class App extends Vue {
  private itemInp = {
    title: '',
    time: 1
  }
  private items: any = [];
  private current = 20;
  private timer = new Date();
  private tick: any = null;
  private timeObj = {
    start: new Date(),
    end: new Date()
  };
  private d: any;
  private i = 0;
  private adding = true;

  get itemsRev(){
    return this.items.slice().reverse();
  }

  get time(){
    return moment(this.timer).format('hh:mm:ss A');
  }

  get startTime(){
    return moment(this.timeObj.start).format('HH:mm')
  }

  mounted(){
    this.d = moment(this.timeObj.start);
    this.tick = setInterval(() => this.timeTick(), 1000);
  }

  public timeTick(){
    this.i ++;
    this.timer = new Date();
    const diff = this.d.diff(this.timeObj.start, 's');

    if(this.$refs.ticker){
      this.$refs.ticker[0].style.width = Math.round((this.i/diff) * window.innerWidth) + "px";
    }

  }

  public start(){
    console.log('started.')
    this.timeObj.start = new Date();
  }

  public addItem(){
    const _item: any = Object.assign({}, this.itemInp);
    _item.date = this.d.add(_item.time, 'm').format('hh:mm');

    this.items.push(_item);
  }

  public remItem(i: number){
    this.items.splice(i, 0);
  }
}
</script>

<style>
*{
  margin: 0px;
  padding: 0px;
}
html, body{
  width: 100%;
  height: 100%;
  }
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100%;
  width: 100%;
  overflow: hidden;
  }
  #agendaStart{
    border-bottom: 1px solid;
    min-height: 30px;
    max-height: 30px;
    }

  #agendaCont{
    height: 100%;
    width: 100%;
    display: flex;
    flex-flow: column;
    }
    #agendaCont .box{
      flex: 1;
      border-bottom: 1px solid;
      display: flex;
      }
    #agendaHeader{
      max-height: 100px;
      background-color:#666;
      color: #FFF;
      align-items: center;
      justify-content: center;
      }

    #agendaInput{
      max-height: 85px;
      min-height: 85px;
      border-bottom: 1px solid;
      }
      #agendaInput form{
        display: flex;
        flex:1;
        padding: 30px 10px 20px 10px;
        }
        #agendaInput input{
          margin: 0px 5px;
          padding: 10px;
          }
        #agendaInput input[type=submit]{
          height: 44px;
        }
        #agendaInput input[type=text],
        #agendaInput input[type=number]{
          height: 20px;
          }
        #titleInp{
          flex:1;
          display: flex;
          }
          #titleInp input{
            flex:1;
            height:100%;
          }
        #minuteInp{
          width: 70px
          }
        #minuteInp input{
          width: 40px
          }

    #agendaBody{
      overflow-y: auto;
      flex-flow: column;
      }
      #agendaBody .agendaItem{
        border-bottom: 1px solid;
        padding: 10px;
        min-height: 20px;
        position: relative;
        }
      #agendaBody .done{
        background-color:#ccc;
        color:#999;
        }
      #agendaBody .current{
        position: sticky;
        bottom: 0px;
        top: 0px;
        background-color:#F00;
        }
      #agendaBody .date{
        color:#222 !important;
        font-weight: bold;
        }
      #agendaBody .time{
        color:#666;
        width: 100px;
        text-align: right;
        display: inline-block;
        float: right;
        }

      .ticker{
        width: 90px;
        height: 100%;
        position: absolute;
        left: 0px;
        top: 0px;
        background-color:#F0F;
        }
</style>
