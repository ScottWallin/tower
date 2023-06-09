<template>
  <div class="container-fluid">
    <section class="row" v-if="event">
    <!-- <div class="col-md-4"> -->
      <!-- <div class="row justify-content-evenly"> -->
        <div class="col-md-7">
          <img :src="event.coverImg" :alt="event.name" class="img-fluid rounded p-2">
        </div>
        <div class="col-md-5">
          <div class="bg-secondary rounded">
            <img :src="event.creator?.picture" :alt="event.creator" class=" p-2 rounded event-creator">
            <p class="p-2">created by {{ event.creator?.name }}</p>
            <p class="text-white p-2">{{ event.name }}</p>
            <p class="text-white p-2">{{ event.description }}</p>
          </div>
          <!-- //TODO - Come back to this to figure out button disabling.  -->
          <button class="btn btn-danger" v-if="event.creatorId == user.id" @click="removeEvent()">Remove Event</button>
        </div>
        <div class="col-md-6 text-white text-center rounded">
          <p>{{ event.ticketCount }}</p>
          <p>Event Attendees</p>
        </div>
        <!-- TODO conditional button -->
          <!-- <button v-if="!isAttendee" cla></button> -->
          <!-- TODO ticket holders / atttendees -->
          <!-- TODO comments -->
          <div class="col-md-8">
            <div class="row">
              <CommentForm />
            </div>
            <div class="row text-white" v-for="c in comments" :key="c.id">
              <div>
                <p>{{ c.creator.name }}</p>
                <p>{{ c.body }}</p>
              </div>
            </div>
          </div>
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
import { commentsService } from "../services/CommentsService.js";

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
    async function getCommentsByEventId(){
      try {
        const eventId = route.params.id
        await commentsService.getCommentsByEventId(eventId)
      } catch (error) {
        logger.error(error)
        Pop.toast(error.message, 'error')
      }
    }
    onMounted(()=> {
      getEventById()
      // getAttendeesByEventId()
      getCommentsByEventId()
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