<template>
<div class="container-fluid">
  <!-- SECTION top photo thing -->
  <section class="row justify-content-center">
    <div class="col-11">
      <img class="img-fluid rounded-2 border border-dark border-2 entry-photo" src="https://images.unsplash.com/photo-1483032469466-b937c425697b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2670&q=80" alt="'Welcome to the Tower!'">
      <p class="text-dark"></p>
    </div>
  </section>
  <!-- SECTION buttons for filtering -->
  <section class="row text-center">
    <div class="col-10 m-2">
      <button @click="filterBy =''" class="ben btn-outline-dark w-24 mx-1">All Events</button>
      <button @click="filterBy ='concert'" class="ben btn-outline-dark w-24 mx-1">Concerts</button>
      <button @click="filterBy ='convention'" class="ben btn-outline-dark w-24 mx-1">Conventions</button>
      <button @click="filterBy ='sport'" class="ben btn-outline-dark w-24 mx-1">Sports</button>
      <button @click="filterBy ='digital'" class="ben btn-outline-dark w-24 mx-1">Digital Events</button>
    </div>
  </section>
  <!-- SECTION all events -->
  <section class="row">
    <div class="col-md-3 text-light" v-for="e in events" :key="e.id">
    <EventCard :event="e" />
    <!-- {{ e.name }} -->
  </div>
  </section>
</div>
</template>

<script>
import { onMounted, computed, ref } from "vue";
import { eventsService } from "../services/EventsService.js";
// import { logger } from "../utils/Logger.js";
import Pop from "../utils/Pop.js";
import { AppState } from "../AppState.js";
import { logger } from "../utils/Logger.js";

export default {
    setup() {
        const filterBy = ref('');
        async function getEvents() {
            try {
                logger.log("grabbed events");
                await eventsService.getEvents();
            }
            catch (error) {
                Pop.error(error.message);
                logger.log(error);
            }
        }
        onMounted(() => {
            getEvents();
        });
        return {
          filterBy,
            events: computed(() => {
              if(filterBy.value == ""){
                return AppState.events
              } else {
                return AppState.events.filter(e => e.type == filterBy.value)
              }
            })
            
        };
    },
}

</script>

<style scoped lang="scss">
.home {
  display: grid;
  height: 80vh;
  place-content: center;
  text-align: center;
  user-select: none;
  


    .entry-photo {
      height: 15vh;
      max-width: auto;
      width: 100%;
      object-fit: contain;
      object-position: center;
    }
  
}
</style>
