<template>
  <div class="container">
    <div class="Result">
      <img src="../assets/svg/ResultArt.svg" alt="ResultArt" />
      <div class="Result__ScoreBlock">
        <div class="Result__grade">
          <span>Вы набрали: </span>
          <div class="Result__circle">
            <h1 class="scorePercent">{{ score }}%</h1>
          </div>
        </div>

        <div class="Result__grade">
          <span>Ваша оценка: </span>
          <div class="Result__circle">
            <h1 class="grade">{{ grade }}</h1>
          </div>
        </div>
      </div>
      <router-link to="/AddAndViewTest" class="Result__back">
        <button class="Result__backBtn">Вернуться</button>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      TestResult: this.$store.state.TestResult,
      AllQuestions: this.$store.state.AllQuestions,
      score: 0,
      grade: 0,
    };
  },
  methods: {
    ShowResultTest() {
      this.score = 0;
      this.grade = 0;
      this.score = (this.TestResult / this.AllQuestions.length) * 100;

      if (this.score <= 100 && this.score >= 80) {
        this.grade = 5;
      } else if (this.score <= 79 && this.score >= 60) {
        this.grade = 4;
      } else if (this.score <= 59 && this.score >= 40) {
        this.grade = 3;
      } else {
        this.grade = 2;
      }
      this.score = Math.round(this.score);
    },
  },
  mounted() {
    this.score = 0;
    this.grade = 0;
    this.ShowResultTest();
  },
};
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-image: url(../assets/BackgroundLayout.png);
  background-size: cover;
  height: 100%;
}
span {
  font-size: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;
}
.scorePercent {
  font-size: 2.8rem;
  text-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
}

.grade {
  font-size: 4rem;
  text-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
}
.Result {
  position: relative;
  padding: 2rem 0;
  margin: 5rem 0;
  background-color: #405e8b;
  color: #fff;
  font-family: "Jost", sans-serif;
  font-size: 2rem;
  width: 80rem;
  min-width: 50rem;
  height: 80rem;

  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 0.7rem;

  &__ScoreBlock {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    width: 100%;
    margin: 4rem 0;
  }
  &__circle {
    background: #8ec4f5;
    border: 2px solid #8ec4f5;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 100%;
    box-sizing: border-box;
    width: 10rem;
    height: 10rem;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 1rem;
  }
  &__grade {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 3rem;
    flex: 1;
  }
  &__back {
    display: flex;
    position: absolute;
    bottom: 0;
    text-decoration: none;

    margin-bottom: 5rem;
  }
  &__backBtn {
    background: #2b7bad;
    border-radius: 0.6rem;
    width: 20rem;
    height: 4.5rem;
    border: none;
    font-family: "Jost", sans-serif;
    font-size: 2.5rem;
    color: #fff;
    cursor: pointer;
    transition: all 0.3s ease;
  }
  &__backBtn:hover {
    background: #3ea1de;
  }
}

@media (max-width: 806px) {
  .container {
    background-image: none;
  }
  .Result {
    width: 100%;
    height: 100%;
    margin: 0;
    border-radius: 0;
    min-width: min-content;

    &__ScoreBlock {
      max-width: 60%;
      flex-wrap: wrap;
      justify-content: space-around;
      align-items: center;
      align-content: center;
      gap: 4rem;
    }
    span {
      // max-width: 20rem;
      font-size: 2.5rem;
    }
  }
  img {
    width: 30rem;
    height: 30rem;
  }
}

@media (max-width: 478px) {
  img {
    width: 25rem;
    height: 25rem;
  }

  span {
    // max-width: 20rem;
    font-size: 2rem !important;
    text-align: center;
  }
  .Result__circle {
    width: 6.5rem;
    height: 6rem;
  }
  .scorePercent {
    font-size: 1.5rem;
  }
  .grade {
    font-size: 2.5rem !important;
  }
}
</style>
