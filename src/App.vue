<template>
  <div id="app">
    <div id="agendaCont">

      <div class="box" id="agendaHeader" @click="start">
        <div id="text" style="">
          <h2>{{time | time('hh:mm:ss A')}}</h2>
        </div>
        <div id="ticker" v-if="agenda.tEnd">
          <div
            ref="tickerItm"
            v-for="(i, k) in agenda.items"
            :key="k" />
        </div>
      </div>

      <!--
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
        <div class="agendaItem" @click="current = idx" :class="{'current': idx == current, 'done': idx > current}" v-for="(item, idx) in itemsRev" :key="idx">
          <div style="z-index: 9999; position: relative;">
            <span class="title">{{item.title}}</span>
            <span class="time">{{item.time}} {{item.time == 1 ? 'minute' : 'minutes'}}</span>
            <span class="date time">{{item.dF}}{{i}}</span>
          </div>
          <div ref="ticker" class="ticker" v-if="idx == current"></div>
        </div>
      </div>
      -->

    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import moment from 'moment';
import Agenda from './classes/Agenda';

@Component({
  components: {}
})
export default class App extends Vue {
  private agenda = new Agenda();
  private tick: any = null;
  private time = new Date();
  private current = 0;

  private startTime!: Date;

  private d: any;
  private i = 0;
  private adding = true;

  get itemsRev(){
    return this.items.slice().reverse();
  }

  /*
  get startTime(){
    return moment(this.startTimeDate).format('HH:mm')
  }
  */

  mounted(){
    for(let i = 0; i < 10; i++){
      this.agenda.addItem('test', 10);
    }
    // this.d = moment(this.startTimeDate);
    this.tick = setInterval(() => this.timeTick(), 1000);
  }

  public timeTick(){
    // Main Clock
    this.time = new Date();

    /*
    this.i ++;
    const curt = this.items[this.current].time;
    const cur = new Date();
    const diff = moment().diff(this.items[this.current].date, 's') + 57;
    // const diffr = (diff) * (60 / curt);
    // const diffr = diff / (60 * curt);
    const diffr = (this.i/10);
    console.log(diff);
    // console.log(diffr);

    if(this.$refs.ticker){
      if(diff >= 0){
        this.$refs.ticker[0].style.width = (diffr * window.innerWidth) + "px";
      }
    }
    */
  }

  public start(){
    // On start event record the start time
    // this.startTimeDate = new Date();
    this.startTime = new Date();
  }

  public end(){
    // On End event record the end time

    // If tasks are unfinished label as DNF
  }

  public addItem(){
    const _item: any = Object.assign({}, this.itemInp);
    _item.date = this.d.add(_item.time, 'm');
    _item.dF = _item.date.format('hh:mm:ss')

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
      position: relative;
      max-height: 100px;
      background-color:#666;
      color: #FFF;
      align-items: center;
      justify-content: center;
      }
      #agendaHeader #text{
        position: relative;
        z-index:9999;
        }
      #agendaHeader #ticker{
        position: absolute;
        width: 100%;
        height: 100%;
        left: 0px;
        top: 0px;
        }
        .tickerContainer div{
          float:left;
          color:#000;
          border-right: 2px solid;
          width: 10px;
          height: 100%;
          position:relative;
          background-color:#F00;
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
        height: 100%;
        position: absolute;
        left: 0px;
        top: 0px;
        background-color:#F0F;
        }
</style>
