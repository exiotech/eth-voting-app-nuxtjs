<template>
  <div>
    <div class="row justify-content-end">
      <div class="col-12">
        <h2 class="text-center">Election</h2>
      </div>
      <div class="col-auto">
        <div class="watch mb-5" v-show="isElectionOpen">
          <span class="countdown_title">Until the end left:</span>
          <div class="countdown">20:00</div>
        </div>
      </div>
    </div>
    <section class="container">
      <table class="table">
        <thead>
          <tr>
            <th>#</th>
            <th>Candidate name</th>
            <th>Votes</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="candidate in sortedCandidates" :key="candidate.id">
            <td>{{candidate.id}}</td>
            <td>{{candidate.name}}</td>
            <td>{{candidate.voteCount}}</td>
          </tr>
        </tbody>
      </table>
      <p v-if="voterData.voted" class="mt-5">You've voted for {{votedFor}}!</p>
      <form v-else-if="isElectionOpen" class="form-group" @submit.prevent="submit">
        <div class="row">
          <div class="col-12 col-md">
            <select class="form-control select" v-model="selectedCandidateId" :disabled="isLoading">
              <option :value="candidate.id" :key="candidate.id" v-for="candidate in candidates">
                {{candidate.name}}
              </option>
            </select>
          </div>
          <div class="col-12 col-md-auto">
            <button type="submit" class="btn btn-dark px-5" :disabled="!selectedCandidateId || isLoading">
              Vote
            </button>
          </div>
        </div>
      </form>
    </section>
    <p class="text-center mt-5">Your account: {{address}}</p>
  </div>
</template>

<script>
import moment from 'moment';
import { mapGetters, mapActions, mapMutations } from 'vuex';

export default {
  data () {
    return {
      selectedCandidateId: 0,
      isLoading: false,
    };
  },

  computed: {
    ...mapGetters({
      candidates: 'election/candidates',
      time: 'election/time',
      isElectionOpen: 'election/isOpen',
      address: 'currentUser/address',
      voterData: 'currentUser/voterData',
    }),
    sortedCandidates() {
      return JSON.parse(JSON.stringify(this.candidates)).sort((a, b) => b.voteCount - a.voteCount);
    },
    votedFor() {
      if (!this.voterData.vote) {
        return 'Noone';
      }
      const candidate = this.candidates.filter(c => c.id === this.voterData.vote)[0];
      if (!candidate) {
        return 'Noone';
      }
      return candidate.name;
    },
  },

  mounted() {
    this.loadCandidates();
    this.loadDuration();
  },

  methods: {
    ...mapActions({
      vote: 'election/vote',
      loadCandidates: 'election/loadCandidates',
      loadDuration: 'election/loadDuration',
      loadVoterData: 'currentUser/loadVoterData',
    }),
    submit() {
      this.isLoading = true;
      this.vote(this.selectedCandidateId).then(() => {
        setTimeout(() => {
          this.isLoading = false;
          this.loadVoterData();
          this.loadCandidates();
        }, 2000);
      });
    },
  },
}

</script>
