<template>
  <div>
    <h1>{{ msg }}</h1>
    <button @click="soma(2,2)">Somar</button>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: 'HelloWorld',
  data (){
    return {
      msg: 'MAKOTERA MONSTRO',
      produtos: []
    }
  },
  methods: {
    soma (n, n2){
      this.msg = n + n2
    },
    makotoGostaDeSomar(n, n2) {
      this.soma(n,n2)
    },
    buscaProdutos (){
      return axios.get('http://www.mocky.io/v2/5afaf6cd2f00006d00f7c699')
        .then( (response) => {
          this.produtos = response.data;
        })
        .catch(function (error) {
          throw new TypeError('Erro ao buscar produtos.')
        });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
