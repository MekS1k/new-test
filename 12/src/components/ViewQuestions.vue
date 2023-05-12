<template>
  <div class="container">
    <div class="headerSection">
      <div class="headerSection__content">
        <div v-for="(question, index) in filteredQuestions" :key="question.id">
          <div>
            <div class="headerSection__question">
              <img
                src="../assets/svg/QuestionSVG.svg"
                draggable="false"
                ondragstart="return false;"
                alt="Question svg"
              />
              <p>Вопрос {{ index + 1 }} / {{ filteredQuestions.length }}.</p>
              <p class="currentQuestion">{{ question.TextQuestion }}?</p>
            </div>

            <div class="QuestionsSection">
              <div
                class="Answers"
                v-for="answer in shuffle([
                  question.Answer1,
                  question.Answer2,
                  question.Answer3,
                  question.AnswerQuestion,
                ])"
                :key="answer"
              >
                <input
                  type="checkbox"
                  :id="'Answer-' + question.id + '-' + answer"
                  :value="answer"
                  class="Answers__input"
                  @click="TestResult"
                />
                <label
                  class="Answers__active"
                  :for="'Answer-' + question.id + '-' + answer"
                >
                  <p class="Answers__text">{{ answer }}</p>
                </label>
              </div>
            </div>
          </div>
        </div>

        <div>
          <router-link to="/ResultTest">
            <p class="Answers__result">Показать результат</p>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SingIn",
  data() {
    return {
      questions: [],
      testID: this.$store.state.testID,
      result: 0,
      filteredQuestions: [],
    };
  },

  methods: {
    async ViewQuestions() {
      try {
        const questions = await fetch("http://localhost:5000/questions");
        const data = await questions.json();
        this.questions = data;
        console.log(this.questions, "q");

        this.filteredQuestions = this.questions.filter(
          (question) => question.test_id == this.testID
        );
        this.$store.state.AllQuestions = this.filteredQuestions;
        console.log(this.$store.state.AllQuestions, "!!!");
      } catch (err) {
        console.log(err);
      }
    },
    beforeRouteLeave() {
      this.$store.state.TestResult = 0;
      this.$store.state.AllQuestions = [];
    },

    TestResult(event) {
      const userAnswer = event.target.value;
      const selectedQuestion = this.filteredQuestions.find(
        (question) => question.AnswerQuestion === userAnswer
      );

      if (event.target.checked && selectedQuestion) {
        if (selectedQuestion.isAnsweredCorrectly === undefined) {
          selectedQuestion.isAnsweredCorrectly =
            userAnswer === selectedQuestion.AnswerQuestion;
          this.result += selectedQuestion.isAnsweredCorrectly ? 1 : 0;
        } else if (
          !selectedQuestion.isAnsweredCorrectly &&
          userAnswer === selectedQuestion.AnswerQuestion
        ) {
          selectedQuestion.isAnsweredCorrectly = true;
          this.result += 1;
        }
      } else if (selectedQuestion && selectedQuestion.isAnsweredCorrectly) {
        selectedQuestion.isAnsweredCorrectly = false;
        this.result -= 1;
      }
      this.$store.state.TestResult = this.result;
      console.log(this.result);
    },

    shuffle(array) {
      let currentIndex = array.length;
      let temporaryValue, randomIndex;

      // While there remain elements to shuffle...
      while (0 !== currentIndex) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
      }

      return array;
    },
  },
  async mounted() {
    await this.ViewQuestions();
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
.headerSection {
  padding: 2rem 0;
  margin: 5rem 0;
  background-color: #405e8b;
  color: #fff;
  font-family: "Jost", sans-serif;
  font-size: 2rem;
  width: 55rem;
  min-width: 50rem;
  height: 80rem;

  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 0.7rem;

  &__content {
    overflow: hidden;
    overflow-y: auto;
    width: calc(100% - 1.5rem);
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  &__questonBlock {
    overflow: hidden;
    overflow-x: hidden;
    overflow-y: auto;
  }
  &__question {
    display: flex;
    gap: 2rem;
    justify-content: center;
    align-items: center;
  }
  img {
    width: 7rem;
    height: 7rem;
    margin-top: 1rem;
  }
}
.QuestionsSection {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 2rem;
  width: 100%;
  margin: 3rem 0;
}
.Answers {
  display: flex;
  justify-content: center;
  align-items: center;

  &__active {
    display: inline-block;
    // padding: 0.5rem 0.5rem;
    border: none;
    background: rgba(142, 196, 245, 0.53);
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.5);
    border-radius: 0.5rem;
    color: #fff;
    // width: 50%;
    width: 25rem;
    max-width: 90rem;
    text-align: center;
    font-family: "Jost", sans-serif;
    font-size: 2.2rem;
    /* добавляем переход */
    transition: all 0.3s ease;
    white-space: break-spaces;
    cursor: pointer;
  }
  &__active:hover {
    opacity: 0.8;
  }

  &__text {
    overflow: hidden;
    text-overflow: ellipsis;
    word-wrap: break-word;
  }
  &__active::before {
    content: "";
    position: absolute;
    display: none;
    left: 0;
    top: 0;
    width: 18px;
    height: 18px;
    border: 1px solid #aaa;

    background-color: #fff;
  }

  &__input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
    transition: all 0.5s ease;
  }
  &__result {
    color: #fff;
    text-decoration: none;
    background: #5463ed;
    border-radius: 0.6rem;
    padding: 1rem;
    font-family: "Jost", sans-serif;
    font-size: 2rem;
    transition: all 0.3s ease;
  }
  &__result:hover {
    background: #7682e8;
  }

  .Answers__input:checked + .Answers__active {
    background-color: #2b7bad;
  }
}
a {
  text-decoration: none;
}

.currentQuestion {
  background: #08a4d3;
  border-radius: 0.6rem;
  border: none;
  padding: 0.5rem 1rem;
  font-weight: bold;
  margin: 0;
}

@media (max-width: 560px) {
  .container {
    background-image: none;
    height: max-content;
  }
  img {
    width: 5rem !important;
    height: 5rem !important;
    margin-top: 1rem;
  }
  .headerSection {
    width: 100%;
    height: 100%;
    margin: 0;
    border-radius: 0;
    min-width: max-content;
    &__content {
      margin-top: 2.5rem;
      font-size: 2rem;
      width: 80%;
    }

    &__content {
      overflow-y: auto;
      -webkit-overflow-scrolling: touch;
    }
    &__content::-webkit-scrollbar {
      width: 0;
      height: 0;
    }
    &__content::-webkit-scrollbar-thumb {
      background-color: transparent;
    }

    &__content::-webkit-scrollbar-track {
      background-color: transparent;
    }
    &__question {
      max-width: 99%;
      flex-wrap: wrap;
      margin: 0;
    }
  }
  .Answers {
    &__active {
      width: 22rem;
      max-width: none;
      font-size: 2rem;
    }
  }
}
</style>
