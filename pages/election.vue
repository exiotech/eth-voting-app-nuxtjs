<template>
  <div>
    <div>
      <p  id="title">Election</p>
    </div>
    <section class="container">
      <div class="watch" v-show="data.election_isOpen">
        <span class="countdown_title">Until the end left</span>
        <div class="countdown"></div>
      </div>
      <table>
        <tr>
          <th>#</th>
          <th>Candidate name</th>
          <th>Kargaxos</th>
        </tr>
        <tr v-for="candidate in data.candidates" :key="candidate.id">
          <td>{{candidate.id}}</td>
          <td>{{candidate.candidate_name}}</td>
          <td>{{candidate.kargaxos}}</td>
        </tr>
      </table>
      <form v-show="data.election_isOpen" class="form-group" @submit.prevent="submit">
        <select class="form-control select" v-model="form.id">
          <option :value="candidate.id" :key="candidate.id" v-for="candidate in data.candidates">{{candidate.candidate_name}}</option>
        </select>
        <nav class="nav">
          <button type="submit" class="btn btn-dark">Vote</button>
        </nav>
      </form>
    </section>
    <p class="my_accont">Your account</p>
  </div>
</template>

<script>
import axios from 'axios';
import moment from 'moment';
import { mapGetters } from 'vuex';

export default {
  data () {
    return {
      form: {
        id: ''
      }
    };
  },

  computed: {
    ...mapGetters({
      data: 'election/data',
    })
  },

  mounted(){
    var duration = moment.duration({
      'minutes': 5,
      'seconds': 0

    });

    var timestamp = new Date(0, 0, 0, 2, 10, 30);
    var interval = 1;
    var timer = setInterval(function() {
      timestamp = new Date(timestamp.getTime() + interval * 1000);

      duration = moment.duration(duration.asSeconds() - interval, 'seconds');
      var min = duration.minutes();
      var sec = duration.seconds();

      sec -= 1;
      if (min < 0) return clearInterval(timer);
      if (min < 10 && min.length != 2) min = '0' + min;
      if (sec < 0 && min != 0) {
        min -= 1;
        sec = 59;
      } else if (sec < 10 && sec.length != 2) sec = '0' + sec;

      $('.countdown').text(min + ':' + sec);
      if (min == 0 && sec == 0)
        clearInterval(timer);


    }, 1000);
  },

  methods: {
    submit() {
      axios.post('/election',this.form)
      .then(response => {
          console.log(this.form);
      });
    },
  },
}

</script>

<style>
  .countdown {
    font-size: 2em;
    color: #707070;
    text-align: right;
  }
</style>