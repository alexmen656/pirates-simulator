<template>
    <div class="docu-view">
      <div class="overlay"></div>
      <div class="content">
        <h1>Welcome to Pirates Simulator</h1>
        <p>Embark on an epic adventure as a pirate captain. Build your fleet, conquer territories, and become the most feared pirate on the seas.</p>
        
        <h2>How to Play</h2>
        <p>Use the map to navigate and explore new territories. Place your ships by holding the Alt key and clicking on the sea. You can create a new city by holding the Shift key and clicking on the land.</p>
        
        <h2>Game Features</h2>
        <p>Discover hidden treasures, engage in battles with other pirates, and expand your empire. Manage your resources wisely to ensure your fleet remains strong and your cities prosper.</p>
        
        <h2>Tips and Tricks</h2>
        <p>Keep an eye on your coin count and make sure you have enough resources to build and maintain your fleet. Use the tooltip to get helpful hints and strategies.</p>
      </div>
    </div>
  </template>
  
  <script>
  export default {};
  </script>
  
  <style scoped>
  .docu-view {
    position: relative;
    background-image: url("@/bg.png");
    background-size: cover;
    min-height: 100vh; /* Ensure the container takes at least the full viewport height */
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    font-size: 1.5rem;
    overflow-y: auto; /* Ensure the content is scrollable */
  }
  
  .overlay {
    position: fixed; /* Use fixed positioning to cover the entire viewport */
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.7); /* Dark overlay with 70% opacity */
    z-index: 1;
  }
  
  .content {
    position: relative;
    z-index: 2;
    color: white; /* Ensure text is readable on dark overlay */
    padding: 20px;
    max-width: 800px; /* Optional: limit the width of the content for better readability */
  }
  </style>