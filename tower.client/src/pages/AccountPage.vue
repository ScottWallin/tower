<!-- <template>
  <div class="about text-center">
    <h1>Welcome {{ account.name }}</h1>
    <img class="rounded" :src="account.picture" alt="" />
    <p>{{ account.email }}</p>
  </div> -->
  <!-- FIXME draw my events here (events I have tickets to ) -->
  <!-- FIXME refer to the 'my albums' section of the homepage on PostIt -->
  <!-- FIXME handle the deletion of the tickets here.... -->
<!-- </template> -->
<!-- 
<script>
import { computed } from 'vue';
import { AppState } from '../AppState';
export default {
  setup() {
    return {
      account: computed(() => AppState.account)
    }
  }
}
</script>

<style scoped>
img {
  max-width: 100px;
}
</style> -->
<template>
  <div class="container-fluid text-white">
    <div v-if="account.id" class="row">
      <div class="col-md-12 p-1">
        <div class="fw-bold mx-2">Here is where I'd place my events...IF I HAD ANY</div>
      </div>
      <div class="col-12 col-md-3 mb-4 p-3" v-for="t in myTickets" :key="t.id">
        <EventCard :event="t.event"  />
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router';
import { AppState } from '../AppState'
import EventCard from '../components/EventCard.vue';
import { ticketsService } from '../services/TicketsService';
import { logger } from '../utils/Logger';
import Pop from '../utils/Pop';
export default {
  setup() {
    async function getMyTickets() {
      try {
        await ticketsService.getMyTickets()
      } catch (error) {
        logger.log(error)
        Pop.error(error.message)
      }
    }
    onMounted(() => {
      getMyTickets()
    })
    return {
      account: computed(() => AppState.account),
      myTickets: computed(() => AppState.myTickets),
    };
  },
  components: { EventCard }
}
</script>

<style scoped></style>
