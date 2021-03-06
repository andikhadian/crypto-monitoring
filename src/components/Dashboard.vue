<template>
  <div>
      <div class="container">
          <a class="logo" href="#">
              <img src="@/assets/logo.png" alt="">
          </a>

          <p class="heading"><span>Crypto</span> Monitoring</p>

          <form @submit.prevent="getAllCryptoCompare">
              <div class="form-group">
                  <!-- <label for="crypto">Crypto:</label> -->
                  <div class="form-group-inner">
                      <input v-model="crypto.name" placeholder="BTC" type="text" name="crypto" id="crypto" required>
                      <button class="add">{{loading ? 'Searching...' : 'Search Crypto'}}</button>
                      <!-- <p class="info">Use Name or Symbol</p> -->
                  </div>
              </div>
          </form>

          <div class="crypto-container">
              <div v-for="item in cryptosList" :key="item.id" class="crypts">
                  <p class="price">{{parsePrice(item.quote.USD.price)}}</p>
                  <div class="lower">
                      <p class="crypto-label">{{item.name}} ({{item.symbol}})</p>
                  </div>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
    data() {
        return {
            loading: false,
            baseApiUrl: 'https://cryptocurrency-monitoring.herokuapp.com/api',
            cryptosList: {},
            crypto: {
                name: '',
            },
        }
    },
    created() {
        this.getAllCryptoCompare()
    },
    methods: {
        parsePrice(value) {
            return  '$'+ value.toString().replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, '$1,')
        },
        getAllCryptoCompare() {
            this.loading = true
            axios.get(`${this.baseApiUrl}/all`, {
                params: {
                    search: this.crypto.name
                }
            })
                .then(res => {
                    this.loading = false
                    this.cryptosList = res.data
                })
                .catch(err => {
                    console.log(err);
                })
        } ,
    }
}
</script>

<style>
.container {
    text-align: center;
    margin: 0 1em;
}

.logo img {
    width: 10em;
    margin: 1em 0;
}

.heading {
    font-size: 3em;
    font-weight: 500;
}

.heading span {
    color: #FECE45;
}

.form-group {
    text-align: left;
    width: 100%;
    margin: 4em auto;
    box-shadow: 0 6px 10px rgba(0,0,0,.08), 0 0 6px rgba(0,0,0,.05);
      transition: .3s transform cubic-bezier(.155,1.105,.295,1.12),.3s box-shadow,.3s -webkit-transform cubic-bezier(.155,1.105,.295,1.12);
    cursor: pointer;
}

.form-group:hover{
    transform: scale(1.05);
    box-shadow: 0 10px 20px rgba(0,0,0,.12), 0 4px 8px rgba(0,0,0,.06);
}

label {
    font-weight: bold;
    margin-bottom: .7em;
    display: block;
}

input {
    padding: 1em;
    outline: none;
    border: 2px solid #24262A;
    border-top-left-radius: .3em;
    border-bottom-left-radius: .3em;
    font-size: 1.3em;
}

.form-group-inner {
    display: grid;
    grid-template-columns: 50% auto;
}

button.add {
    font-size: 1.2em;
    font-weight: bold;
    color: #24262A;
    background: #FECE45;
    border: 2px solid #24262A;
    border-left: none;
    border-top-right-radius: .3em;
    border-bottom-right-radius: .3em;
    outline: none;
    cursor: pointer;
}

p.info {
    color: #24262A;
    margin-top: .5em;
    font-size: .8em;
}

.crypto-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(100%, 1fr));
    grid-gap: 2em;
    padding-bottom: 5em;
}

.crypts {
    position: relative;
    background: #FECE45;
    border-radius: .3em;
    border: 2px solid #24262A;
    height: 12em;
    box-shadow: 0 6px 10px rgba(0,0,0,.08), 0 0 6px rgba(0,0,0,.05);
      transition: .3s transform cubic-bezier(.155,1.105,.295,1.12),.3s box-shadow,.3s -webkit-transform cubic-bezier(.155,1.105,.295,1.12);
    cursor: pointer;
}

.crypts:hover{
    transform: scale(1.05);
    box-shadow: 0 10px 20px rgba(0,0,0,.12), 0 4px 8px rgba(0,0,0,.06);
}

.price {
    font-size: 1.8em;
    font-weight: 500;
    padding: 1em;
}

.lower {
    position: absolute;
    bottom: 0;
    width: 100%;
    background: #f0bb2a;
    padding: 1em;
    /* position: relative; */
    /* height: 50px; */
    /* display: flex; */
}


.crypto-label {
    text-transform: uppercase;
    font-size: 1.5em;
    font-weight: 500;
}

.delete-btn {
    background: none;
    position: absolute;
    right: 2em;
    top: 1em;
}

@media (min-width: 365px) {
    .crypto-container {
        grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
    }
}

@media (min-width: 1000px) {
    .form-group {
        width: 500px;
    }
}


</style>