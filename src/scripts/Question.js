import Vue from 'vue'

import PageHeader from '../pages/module/PageHeader.vue'
import PageFooter from '../pages/module/PageFooter.vue'

export default {
    name: 'Question',
    components: {
        PageHeader,
        PageFooter
    },
    data() {
      return {
        new_question: 'new_question',
        unsolved_question: 'unsolved_question',
        solved_question: 'solved_question',

        active_tab: 'new_question'
      }
    },
    computed: {
        isActive_new_question: function() {
            return this.active_tab == this.new_question
        },
        isActive_unsolved_question: function() {
            return this.active_tab == this.unsolved_question
        },
        isActive_solved_question: function() {
            return this.active_tab == this.solved_question
        }
    }
}