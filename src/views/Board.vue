<template>
  <v-container fill-height fluid class="pa-0">
    <v-layout column>
      <v-flex v-if="loading" shrink>
        <v-toolbar
          flat
          dense
          class="transparent"
        />
      </v-flex>
      <v-flex v-else shrink>
        <BoardToolbar/>
      </v-flex>
      <v-flex v-if="loading" grow>
        <board-pipeline-skeleton/>
      </v-flex>
      <v-flex v-else grow class="pa-1">
        <draggable
          class="layout row fill-height justify-start align-start"
          v-model="pipelines"
          group="pipelines"
          handle=".pipeline-header"
        >
          <v-flex
            v-for="(pipelines, i) in pipelines"
            :key="'flex-pipelines'+i"
            pa-1
            style="max-width:300px"
            fill-height
          >
            <board-pipeline :pipeline="pipelines"/>
          </v-flex>
        </draggable>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import draggable from 'vuedraggable'

export default {
  name: 'Board',
  components: {
    draggable,
    BoardPipelineSkeleton: () => import('@/components/BoardPipelineSkeleton'),
    BoardToolbar: () => import('@/components/BoardToolbar'),
    BoardPipeline: () => import('@/components/BoardPipeline')
  },
  created () {
    this.fetch()
  },
  data: () => ({
    loading: false
  }),
  computed: {
    pipelines: {
      get () {
        return this.$store.state.pipelines.data
      },
      set (value) {
        /*
        * When handling draging, its important that we inverse the vuex
        * paradime for the UX to remain seemless. First we update the vuex store
        * then send the update out to the API
        */
        this.$store.commit('pipelines/UPDATE_ORDER', value)
        this.$store.dispatch('pipelines/updateBatch')
      }
    }
  },
  methods: {
    async fetch () {
      // If data has been loaded previously
      if (!this.loaded()) {
        this.loading = true
      }
      await Promise.all([
        this.$store.dispatch('pipelines/fetch'),
        this.$store.dispatch('requests/fetch'),
        this.$store.dispatch('labels/fetch')
      ])
      this.loading = false
    },
    loaded () {
      if (this.$store.state.pipelines.data.length &&
        this.$store.state.requests.data.length &&
        this.$store.state.labels.data.length) {
        return true
      }
      return false
    }
  }
}
</script>
