<template lang="html">
  <Layout>
    <h1>{{$page.event.title}} (PHP {{$page.event.price}})</h1>
    <p>{{formatDate($page.event.date)}} ({{$page.event.duration}} hours)</p>
    <img :src="`http://localhost:1337${$page.event.image}`" />
    <p>Description of Event: {{$page.event.description}}</p>
  </Layout>
</template>

<page-query>
  query($id:ID!){
    event(id:$id){
      id,
      title,
      duration,
      price,
      date,
      description,
      image
    }
  }
</page-query>

<script>
import moment from "moment";
export default {
  metaInfo() {
    return {
      title: this.$page.event.title,
    };
  },

  methods: {
    formatDate(date) {
      return moment(date).format("MMMM Do YYYY, h:mm a");
    },
  },
};
</script>
