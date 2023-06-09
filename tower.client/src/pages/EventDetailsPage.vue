<template>
  <div class="container-fluid">
    <section class="row" v-if="event">
    <div class="col-md-4">
      <div class="row">
        <div class="col-7">
          <img src="event.creator.picture" alt="event.title" class="rounded event-creator">
        </div>
        <div class="col-5">
          <div class="bg-secondary rounded">
            <p class="text-white">{{ event.title }}</p>
            <p>created by {{ event.creator.name }}</p>
          </div>
          <!-- //TODO - Come back to this to figure out button disabling.  -->
          <!-- <button v-if="{{event.capacity >= 1}}" class="rounded btn btn-">Attend Event<i class="mdi mdi-ticket-confirmation"></i></button> -->
          <button class="btn btn-danger" v-if="event.creatorId == user.id" @click="removeEvent()">Remove Event</button>
        </div>
        <div class="col-6 text-white rounded">
          <p>{{ event.ticketCount }}</p>
          <p>Event Attendees</p>
        </div>
        <div class="col-6">
          <button v-if="!isAttendee" cla></button>
                            <!-- <div class="col-6 pt-3 ">
                            <button v-if="!isCollaborator" class="btn btn-info text-center white-shadow fs-5 text-white fw-bold"
                                @click="createCollab()"><i class="mdi mdi-heart"></i>
                                Collab</button>
                            <button v-else class="btn btn-dark text-center white-shadow fs-5 text-white fw-bold"
                                @click="removeCollab()"><i class="mdi mdi-heart-broken"></i>
                                Uncollab</button>
                        </div> -->
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
      getAttendeesByEventId()
      getCommentsByEventId()
    })
    return {
      event: computed(() => AppState.activeEvent),
      comments: computed(() AppState.comments),
      attendees: computed(() Appstate.tickets),
      attendee: computed(() => AppState.tickets.find(a => a.accountId == AppState.user.id)),
      user: computed(() => AppState.user),
    }
  }
}
</script>

<style>

</style>