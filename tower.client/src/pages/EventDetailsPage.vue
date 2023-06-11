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
          <!-- FIXME render ticket holders (attendees)...reference how Sam drew the collabs on the albumDetails page in PostIt -->
        </div>
        <!-- TODO conditional button -->

<!-- FIXME for UI prevents multiple tickets....you need some kind of check to see if the account already has a ticket for this event -->
<!-- FIXME ^^^ easiest way to handle this is to add the ':disabled' and bind it to your check LOOK AT HOW SAM CONDITIONALLY RENDER THE COLLAB BUTTON IN POSTIT -->

          <!-- <button v-if="!isAttendee" cla></button> -->
          <!-- TODO ticket holders / atttendees -->
          <!-- TODO comments -->
          <div class="col-md-8">
            <div class="row card m-2">
              <CommentForm />
            </div>
            <div class="row text-white" v-for="c in comments" :key="c.id">
              <div class="card m-2">
                <div class="d-flex">
                  <img  class="pe-2 rounded mt-1" :src="c.creator?.picture" :alt="c.creator?.name">
                  <p>{{ c.creator.name }}</p>
                </div>
                <p>{{ c.body }}</p>
                <div class="text-end">
                  <!-- FIXME delete comment here... think ab what value you may need to pass to remove a specific comment (c.id)-->
                  <button class="btn btn-danger" @click="removeComment()">Delete</button>
                </div>
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
import { ticketsService } from "../services/TicketsService.js";

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

// FIXME need function to get tickets by event id....you will need to pass the event Id to hit the correct endpoint in the service layer

    onMounted(()=> {
      getEventById()
      getTicketsByEventId()
      // FIXME call the get tickets by event id function here
      getCommentsByEventId()
    })
    return {
      // FIXME isAttendee computed...refer to PostIt
      event: computed(() => AppState.activeEvent),
      comments: computed(() => AppState.comments),
      attendees: computed(() => AppState.tickets),
      attendee: computed(() => AppState.tickets.find(a => a.accountId == AppState.user.id)),
      user: computed(() => AppState.user),

// FIXME write out deleteComment method...you can refer to Gregslist Vue here for the delete

// FIXME finish removeEvent() method here....again refer to Postman/your server for what endpoint to hit.....reference the arcvhiveAlbum() method in PostIt
      async removeEvent() {
        try {
          if(await Pop.confirm()){
            await eventsService.removeEvent(route.params.id)
          }
        } catch (error) {
          logger.log(error)
          Pop.toast(error.message, 'error')
        }
      },
      async removeComment(commentId) {
        try {
          if (await Pop.confirm){
            await commentsService.removeComment(commentId)
          }
        } catch (error) {
          logger.log(error)
          Pop.toast(error.message, 'error')
        }
      }
    }
  }
}
</script>

<style>
.card{
  background-color: #1985a1;
}
</style>