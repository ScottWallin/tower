<template>
  <div class="modal-content">
    <div class="modal-header">
      <h1 class="modal-title fs-5" id="newComment">Create Comment</h1>
      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
    </div>
    <form @submit.prevent="createComment()">
    <div class="modal-body">
      <div class="form-floating">
        <textarea type="text" class="form-control" id="commentBody" placeholder="Comment" v-model="editable.body"></textarea>
        <label for="commentBody">Comment</label>
      </div>
      <div class="modal-footer">
        <button type="submit" class="btn btn-primary m-1">Comment</button>
      </div>
    </div>
  </form>
  </div>
</template>
<textarea name="" id="" cols="30" rows="10"></textarea>
<script>
import { ref } from "vue";
import { useRoute } from "vue-router";
import { logger } from "../utils/Logger.js";
import Pop from "../utils/Pop.js";
import { commentsService } from '../services/CommentsService.js';
import { Modal } from "bootstrap";
export default {
  setup(){
    const editable = ref({})
    const route = useRoute()
    return {
      editable,
      async createComment(){
        try {
          const formData = editable.value
          formData.eventId = route.params.id
          await commentsService.createComment(formData)
          Modal.getOrCreateInstance('#createComment').hide()
          editable.value = {}
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