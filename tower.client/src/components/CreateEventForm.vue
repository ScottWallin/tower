<template>
  <div class="modal-content">
    <div class="modal-header">
      <h1 class="modal-title fs-4" id="createEvent">Create Event</h1>
      <button type="button" class="btn-close btn btn-danger" data-bs-dismiss="modal" aria-label="Close"></button>
    </div>
    <form @submit.prevent="createEvent()">
      <div class="modal-body">
        <div class="form-floating my-1">
          <input type="text" class="form-control" id="floatingInput" placeholder="Event Name" v-model="editable.name">
          <label for="floatingInput">Event Title</label>
        </div>
        <div class="form-floating my-1">
          <input type="text" class="form-control" id="floatingImg" placeholder="Cover Image" v-model="editable.coverImg">
          <label for="floatingImg">Cover Image</label>
        </div>
        <div class="form-floating my-1">
          <input type="text" class="form-control" id="floatingDesc" placeholder="Description" v-model="editable.description">
          <label for="floatingDesc">Description</label>
        </div>
        <div class="form-floating my-1">
          <input type="text" class="form-control" id="floatingLoc" placeholder="Location" v-model="editable.location">
          <label for="floatingLoc">Location</label>
        </div>
        <div class="form-floating my-1">
          <input type="date" id="startDate" placeholder="Date" v-model="editable.startDate">
        </div>
        <div class="form-floating my-1">
          <input type="number" id="capacity" placeholder="Capacity" v-model="editable.capacity">
        </div>
        <div>
          <select name="type" id="type" placeholder="Type" v-model="editable.type">
          <option value="concert">Concert</option>
          <option value="convention">Convention</option>
          <option value="sport">Sport</option>
          <option value="digital">Digital</option>
        </select>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Close</button>
        <button type="submit" class="btn btn-success">Create Event</button>
      </div>
    </form>
  </div>
</template>

<script>
import Pop from "../utils/Pop.js";
import { eventsService } from "../services/EventsService.js";
import { Modal } from 'bootstrap';
import { ref } from "vue";
import { useRouter } from "vue-router";
import { logger } from "../utils/Logger.js";


export default {
setup(){
  const editable = ref({})
  const router = useRouter()
  return{
    editable,
    async createEvent(){
      try {
        const formData = editable.value
        const newEvent = await eventsService.createEvent(formData)
        Modal.getOrCreateInstance('#createEvent').hide()
        editable.value ={}
        router.push({name: 'EventDetails', params: {id: newEvent.id}})
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

</style>