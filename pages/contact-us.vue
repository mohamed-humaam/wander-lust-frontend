<template>
  <div>
    <PageTitle pageTitle="Contact" />
    <ContactDetails />
  </div>
</template>

<script>
import ContactDetails from "~/components/contactPage/Contact";
export default {
  name: "contact",
  components: {
    // Navbar,
    // PageTitle,
    ContactDetails,
    // Footer,
  },
  // head() {
  //   return {
  //     title: "CODIUX | Contact",
  //   };
  // },
};
</script>

<style scoped>
h2 {
  margin-bottom: 20px;
  font-size: 36px;
}

p {
  margin: 20px 0;
}
</style>