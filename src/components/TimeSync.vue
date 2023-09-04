<template>
    <ul>
        <template v-for="(key) in state.fileNames">
            <li :key="key" class="field">
                <label>{{ key }}</label>
                <input class="plotname" v-debounce="1000" @input="event=>onChange(key, event.target.value)">
            </li>
        </template>
    </ul>
</template>
<script>
import { store } from './Globals.js'
import debounce from 'v-debounce'

export default {
    name: 'timeSync',
    data () {
        return {
            state: store,
            name: ''
        }
    },
    methods: {
        onChange (key, value) {
            this.$eventHub.$emit('syncTime', key, value)
        },
        createNewExpression () {
            this.state.plotOn = true
            this.$nextTick(() => {
                this.state.expressions.push({
                    name: '1+1',
                    color: this.getFirstFreeColor(),
                    axis: this.getFirstFreeAxis()
                })
            })
        },
        // TODO: this is duplicated in Plotly.vue, refactor it out!
        getFirstFreeAxis () {
            // get free axis number
            for (const i of this.state.allAxis) {
                let taken = false
                for (const field of this.state.expressions) {
                    // eslint-disable-next-line
                    if (field.axis == i) {
                        taken = true
                    }
                }
                if (!taken) {
                    return i
                }
            }
            return this.state.allAxis.length - 1
        },
        getFirstFreeColor () {
            // get free color
            for (const i of this.state.allColors) {
                let taken = false
                for (const field of this.state.expressions) {
                    // eslint-disable-next-line
                    if (field.color == i) {
                        taken = true
                    }
                }
                if (!taken) {
                    return i
                }
            }
            return this.state.allColors[this.state.allColors.length - 1]
        },
        savePreset (name) {
            const myStorage = window.localStorage
            let saved = myStorage.getItem('savedFields')
            if (saved === null) {
                saved = {}
            } else {
                saved = JSON.parse(saved)
            }
            saved[name] = []
            for (const field of this.state.expressions) {
                saved[name].push([field.name, field.axis, field.color, field.function])
            }
            myStorage.setItem('savedFields', JSON.stringify(saved))
            this.$eventHub.$emit('presetsChanged')
        },

        resetModal () {
            this.name = ''
        },
        handleOk (bvModalEvt) {
            // Prevent modal from closing
            bvModalEvt.preventDefault()

            if (this.name.lenght > 0) {
                return
            }
            this.savePreset(this.name)

            // Hide the modal manually
            this.$nextTick(() => {
                this.$refs.modal.hide()
            })
        }
    },
    directives: {
        debounce
    }
}
</script>
<style>

</style>
