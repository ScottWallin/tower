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
            <p class="text-white p-2">Location: {{ event.location }}</p>
            <p class="text-white p-2">Date: {{ computeDate(event.startDate) }}</p>
            <div v-if="event.isCancelled == false">
              <p v-if="event.capacity != 0" class="mb-2 p-1">Spots left: {{ event.capacity }}</p>
              <p v-else class="mb-2 p-1">No spots available</p>
            </div>
            <button v-if="event.isCancelled == false && !myTicket && event.capacity > 0" @click="createTicket()" :disabled="event.capacity == 0" class="bg-info rounded mb-2 p-1 text-white fw-bold border-info" title="Grab a your ticket">Grab your ticket!</button>
            <button v-else-if="event.isCancelled == false && myTicket" @click="removeTicket(myTicket.id)" class="rounded mb-2 text-white btn btn-danger" title="Sell your ticket">Sell your ticket</button>
            <div v-else-if="event.capacity === 0" class="text-danger fw-bold">Sold out</div>
            <div v-if="event.isCancelled == true" class="mt-4 p-1 text-danger fs-3 fw-bold">Event is cancelled</div>
            <!-- //TODO - Come back to this to figure out button disabling.  -->
          </div>
          <div v-if="event.creatorId == account.id && event.isCancelled == false"  @click="removeEvent(event.id)"><button class="btn btn-danger m-1" title="Cancel this Event?"><i class="mdi mdi-cancel text-white fw-bold fs-1"></i></button>
          </div>

        </div>
        <div class="col-md-12 bg-secondary d-flex">
          <div v-for="t in tickets"  :key="t.id">
            <img :src="t.profile.picture" alt="ticket holder picture" class="img-fluid elevation-6 rounded-circle profile-picture m-3" :title="t.profile.name">
          </div>
        </div>
        <!-- <div class="col-md-6 text-white text-center rounded"> -->
          <!-- <p>{{ event.ticketCount }}</p>
          <p>Event Attendees</p> -->
          <!-- FIXME render ticket holders (attendees)...reference how Sam drew the collabs on the albumDetails page in PostIt -->
        <!-- </div> -->
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
                  <button class="btn btn-danger" @click="removeComment(c.id)">Delete</button>
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
  // props: {
  //   comment: {
  //     type: Object,
  //     required: true
  //   },
  // },
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
    async function getTicketsByEventId() {
      try {
        await ticketsService.getTicketsByEventId(route.params.eventId)
      } catch (error) {
        logger.log(error)
        Pop.error(error.message)
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
      tickets: computed(() => AppState.tickets),
      myTicket: computed(() => AppState.tickets.find(a => a.accountId == AppState.user.id)),
      user: computed(() => AppState.user),
      account: computed(() => AppState.account), 

// FIXME write out deleteComment method...you can refer to Gregslist Vue here for the delete

// FIXME finish removeEvent() method here....again refer to Postman/your server for what endpoint to hit.....reference the arcvhiveAlbum() method in PostIt
      async removeEvent() {
        try {
          if(await Pop.confirm()){
            // await eventsService.removeEvent(route.params.id)
                        await eventsService.removeEvent(AppState.activeEvent.id)
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
      },
      async createTicket(){
        // debugger
        const eventId = route.params.id
        await ticketsService.createTicket(eventId)
      },
      computeDate(date) {
      return date.toLocaleDateString('en-us', { weekday: "long", year: "numeric", month: "short", dat: "numeric", time: "short" }) + ":" + date.toLocaleTimeString('en-us', { timeStyle: "medium" })
    },
    }
  }
}
</script>

<style>
.card{
  background-color: #1985a1;
}
</style>