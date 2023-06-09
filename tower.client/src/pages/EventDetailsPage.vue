<template>
  <div class="container-fluid">
    <section class="row" v-if="event">
    <!-- <div class="col-md-4"> -->
      <!-- <div class="row justify-content-evenly"> -->
        <div class="col-7">
          <img :src="event.coverImg" :alt="event.name" class="img-fluid rounded">
        </div>
        <div class="col-5">
          <div class="bg-secondary rounded">
            <img :src="event.creator?.picture" :alt="event.creator" class="rounded event-creator">
            <p>created by {{ event.creator?.name }}</p>
            <p class="text-white">{{ event.name }}</p>
            <p class="text-white">{{ event.description }}</p>
          </div>
          <!-- //TODO - Come back to this to figure out button disabling.  -->
          <!-- <button v-if="{{event.capacity >= 1}}" class="rounded btn btn-">Attend Event<i class="mdi mdi-ticket-confirmation"></i></button> -->
          <button class="btn btn-danger" v-if="event.creatorId == user.id" @click="removeEvent()">Remove Event</button>
        </div>
        <div class="col-6 text-white text-center rounded">
          <p>{{ event.ticketCount }}</p>
          <p>Event Attendees</p>
        </div>
        <div class="col-6">
          <!-- <button v-if="!isAttendee" cla></button> -->
  
      </div>
      <!-- </div> -->
    <!-- </div> -->
  </section>
  </div>
</template>

<script>
import { computed, onMounted } from 'vue';
import { logger } from "../utils/Logger.js";
import Pop from "../utils/Pop.js";
import { useRoute } from "vue-router";
import { AppState } from "../AppState.js";
import { eventsService } from '../services/EventsService.js'

export default {
  setup() {
    const route = useRoute()
    async function getEventById() {
      try {
        const eventId = route.params.id
        await eventsService.getEventById(eventId)
      } catch (error) {
        logger.log(error)
        Pop.toast(error.message, 'error')
      }
    }
    onMounted(()=> {
      getEventById()
      // getAttendeesByEventId()
      // getCommentsByEventId()s
    })
    return {
      event: computed(() => AppState.activeEvent),
      comments: computed(() => AppState.comments),
      attendees: computed(() => AppState.tickets),
      attendee: computed(() => AppState.tickets.find(a => a.accountId == AppState.user.id)),
      user: computed(() => AppState.user),
    }
  }
}
</script>

<style>

</style>