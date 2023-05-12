<template>
	<div id="app" class="container">
		<!-- <transition mode="out-in"> -->
		<router-view />
		<!-- </transition> -->
	</div>
</template>

<script>
export default {
	name: "App",
};
</script>

<style lang="scss">
@import "@/assets/global.css";
@import url("https://fonts.googleapis.com/css2?family=Jost:wght@300;400;500;600&display=swap");
#app {
	font-family: "Jost", sans-serif;
	height: 100%;
	width: 100%;
	margin: 0;
}

body {
	height: 100%;
	width: 100%;
	margin: 0;
}
html {
	height: 100%;
	width: 100%;
	margin: 0;
	font-size: 62.5%;
}

v-enter-active {
	opacity: 0;
}
.v-enter-to {
	opacity: 1;
	transition: all 0.3s ease-out;
}

.v-leave-from {
	opacity: 1;
}

.v-leave-to {
	opacity: 0;
	transition: all 0.3s ease-out;
}

// Стили для скроллбара
::-webkit-scrollbar {
	width: 8px;
}

// Стили для ползунка скроллбара
::-webkit-scrollbar-thumb {
	background-color: #0ac4ff;
	border-radius: 10px;
}

// Стили для заднего фона скроллбара
::-webkit-scrollbar-track {
	background-color: #f4f2f2c9;
	border-radius: 10px;
}
</style>
