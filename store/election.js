export const state = () => ({
  candidates:[
    {
      id:1,
      candidate_name:'User 1',
      kargaxos:'Kargaxos 1'
    },{
      id:2,
      candidate_name:'User 2',
      kargaxos:'Kargaxos 2'
    },{
      id:3,
      candidate_name:'User 3',
      kargaxos:'Kargaxos 3'
    },{
      id:4,
      candidate_name:'User 4',
      kargaxos:'Kargaxos 4'
    },{
      id:5,
      candidate_name:'User 5',
      kargaxos:'Kargaxos 5'
    },
  ],
  time: 'asd',
  election_isOpen: true,
});

export const getters = {
  data: (state) => {
    return {
      candidates: state.candidates,
      time: state.time,
      election_isOpen: state.election_isOpen,
    };
  },
};
