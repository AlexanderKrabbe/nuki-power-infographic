Vue.component('flow-arrow', {
    props: ['layout'],
    template: '<div v-if="layout" class="ed-flow-arrow" :style="style">➔</div>',
    computed: {
        style: function() {
            if (this.layout) {
                return 'top: ' + this.layout[0] + '; right: ' + this.layout[1] + '; bottom: ' + this.layout[2] + '; left: ' + this.layout[3] + '; transform: rotate(' + this.layout[4] + ')' 
            } else {
                return false
            }   
        }
    }
})

Vue.component('unit', {
    props: ['titleDa', 'titleKl', 'kw', 'link', 'graphic', 'layout'],
    template: '<a v-if="kw" class="ed-unit" :href="link" target="_blank" :style="style"><img :src="graphic" alt="" class="ed-img"><p class="ed-heading ed-title"><span class="ed-title-da">{{ titleDa }}</span> <span class="ed-title-kl">{{ titleKl }}</span></p><p class="ed-unit-output ed-output">{{ kw.toFixed(1) }} kW</p></a>',
    computed: {
        style: function() {
            if (this.layout) {
                return 'top: ' + this.layout[0] + '; right: ' + this.layout[1] + '; bottom: ' + this.layout[2] + '; left: ' + this.layout[3] + ';'
            } else {
                return false
            }
            
        }
    }
})

Vue.component('consumer', {
    props: ['title', 'kw'],
    template: '<div v-if="kw" class="ed-dest"><h2 class="ed-dest-title">{{ title }}</h2><p class="ed-dest-output ed-output">{{ kw.toFixed(1) }} kW</p></div>'
})

Vue.component('battery', {
    props: ['titleDa', 'titleKl', 'charging', 'voltage', 'charge', 'layout'],
    template: '<div v-if="charge" class="ed-battery ed-unit" :style="style"><div :class="charge_style"><span class="charge"></span></div><p class="ed-battery-title ed-title"><span class="ed-title-da">{{ titleDa}}</span><span class="ed-title-kl">{{ titleKl }}</span> {{ voltage }}V - {{ charge }}%</p></div>',
    computed: {
        style: function() {
            if (this.layout) {
                return 'top: ' + this.layout[0] + '; right: ' + this.layout[1] + '; bottom: ' + this.layout[2] + '; left: ' + this.layout[3] + ';'
            } else {
                return false
            }
        },
        charge_style: function() {
            if (!this.charging) {
                return 'ed-charge discharging'
            } else {
                return 'ed-charge charging'
            }
        }
    }
})

var ed_app = new Vue({
    el: '#ed-app',
    data: {
        consumer: {},
        units: [],
        battery: {},
        config_data: GLOBAL_CONFIG
    },
    methods: {
        fetchData: function(url, callback) {
            var ajax = new XMLHttpRequest()
            function ajaxLoaded() {
                callback(this.response)
            }
            function ajaxFail() {
                if (this.responseType === 'text') {
                    console.log('error', this.responseText)
                }
                console.log(this)
            }
            ajax.responseType = 'json'
            ajax.addEventListener("load", ajaxLoaded)
            ajax.addEventListener("error", ajaxFail)
            ajax.addEventListener("abort", ajaxFail)
            ajax.open('GET', url)
            ajax.send()
        },
        mergeData: function(data) {
            for (var d in data.consumer) {
                this.consumer[d] = data.consumer[d]
            }
            for (var d in data.battery) {
                this.battery[d] = data.battery[d]
            }
            for (var d in data.units) {
                if (!this.units[d]) {
                    this.units[d] = {}
                } 
                for (var u in data.units[d]) {
                    this.units[d][u] = data.units[d][u]
                }
            }
            this.$forceUpdate()
        },
        update: function() {
            this.mergeData(this.config_data)
            this.fetchData(this.config_data.base_url + 'data.json', this.mergeData)
        }
    },
    created: function() {
        setInterval(this.update(), 60000)
    }
})
