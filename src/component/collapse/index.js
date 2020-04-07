import Vue from 'vue'
import { v4 as uuidv4 } from 'uuid'

import './index.css'

Vue.component('collapse', {
  props: {
    'aria-expanded': {
      type: Boolean,
      default: false
    },
    'data-label-collapse': {
      type: String,
      default: 'Expand'
    },
    'data-label-expanded': {
      type: String,
      default: 'Collapse'
    },
    id: {
      type: String,
      default: `advance-options-${uuidv4()}`
    }
  },
  data: function () {
    return {
      isExpanded: this.ariaExpanded
    }
  },

  template: `
      <div class="collapse">
          <a href="#" 
          class="collapse__button"
          role="button" 
          v-on:click.prevent="toggleExpanded"
          v-bind:aria-expanded="isExpanded" 
          v-bind:aria-controls="id" 
          v-bind:data-label-collapse="dataLabelExpanded" 
          v-bind:data-label-expanded="dataLabelCollapse">
              <span data-collapse-text="true">{{ isExpanded ? dataLabelCollapse : dataLabelExpanded }}</span>
          </a>  
          <div ref="content" class="collapse__content" v-bind:id="id" >
              <slot></slot>
          </div>      
      </div>  
  `,

  methods: {
    toggleExpanded () {
      this.isExpanded = !this.isExpanded
    }
  },
  watch: {
    isExpanded: function (newIsExpanded) {
      const { content } = this.$refs

      const height = newIsExpanded ? content.scrollHeight : 0
      content.style.height = `${height}px`
    }
  }
})
