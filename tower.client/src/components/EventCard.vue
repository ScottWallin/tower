<template>

  <router-link :to="{name: 'EventDetails', params: {id: event.id}}">
    <div class="rounded border border-4 border-dark event-card m-2">
      <img :srcset="event.coverImg" alt="event.title" class="rounded-top">
      <div class="text-center rounded-bottom text-white">
        <h5 class="class"> {{event.name }} </h5>
        <p> {{ event.location }}</p>
        <div class="d-flex justify-content-between">
          <div v-if="event.isCancelled == true" class="text-warning">Event Cancelled</div>
          <div v-if="event.capacity > 0">{{ event.capacity }} spots left</div>
          <div v-else class="text-danger">No more space</div>
        </div>
      </div>
    </div>
  </router-link>
  
</template>

<script>
import { Event } from '../models/Event.js'

export default {
props: {
  event: { type: Event, required: true}
},
  setup() {
    return{
      
    }
  },
}
</script>

<style scoped>
img{
  height: 30vh;
  width: 100%;
  object-fit: cover;
}
</style>