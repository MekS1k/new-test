<template>
  <div class="container">
    <div class="questions">
      <div class="questions__inputsBlock">
        <input
          class="questions__input"
          placeholder="Введите текст вопроса"
          type="text"
          v-model="TextQuestion"
        />
        <input
          class="questions__input"
          placeholder="Введите вариант ответа"
          type="text"
          v-model="Answer1"
        />
        <input
          class="questions__input"
          placeholder="Введите вариант ответа"
          type="text"
          v-model="Answer2"
        />
        <input
          class="questions__input"
          placeholder="Введите вариант ответа"
          type="text"
          v-model="Answer3"
        />
        <input
          class="questions__input"
          placeholder="Введите правильный ответ"
          type="text"
          v-model="AnswerQuestion"
        />

        <div class="questions__selectBlock">
          <select
            v-model="selected"
            @change="getTestID(selected)"
            name=""
            id=""
            class="questions__select"
          >
            <option value="">Тест которому нужно добавить вопрос</option>

            <option
              v-for="testName in filteredTests"
              :key="testName.id"
              :value="testName.idTest"
            >
              {{ testName.TestName }}
            </option>
          </select>
        </div>
        <div class="createQuestion">
          <button @click="saveQuestions" class="createButton">
            Сохранить вопрос
          </button>
          <router-link to="/AddAndViewTest">
            <button class="createButton">На главную</button>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      selected: "",
      AnswerQuestion: "",
      TextQuestion: "",
      Answer1: "",
      Answer2: "",
      Answer3: "",
      test_id: "",
      AllTests: [],
      userID: this.$store.state.UserID,
    };
  },
  methods: {
    async viewTest() {
      try {
        const testResponse = await axios.get("http://localhost:5000/Tests");
        const allTests = testResponse.data;
        this.AllTests = allTests;
      } catch (err) {
        console.log(err);
      }
    },

    async saveQuestions() {
      try {
        await axios.post("http://localhost:5000/Questions", {
          AnswerQuestion: this.AnswerQuestion,
          TextQuestion: this.TextQuestion,
          Answer1: this.Answer1,
          Answer2: this.Answer2,
          Answer3: this.Answer3,
          test_id: this.test_id,
        });
        this.AnswerQuestion = "";
        this.TextQuestion = "";
        this.Answer1 = "";
        this.Answer2 = "";
        this.Answer3 = "";
      } catch (err) {
        console.log(err);
      }
    },

    getTestID(id) {
      this.test_id = id;
    },
  },
  computed: {
    filteredTests() {
      return this.AllTests.filter((test) => test.TestCreator == this.userID);
    },
  },
  mounted() {
    this.viewTest();
  },
};
</script>

<style lang="scss" lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-image: url(../assets/BackgroundLayout.png);
  background-size: cover;
  height: 100%;
  overflow-x: hidden;
  overflow: hidden;
}

.questions {
  padding: 2rem 0;
  margin: 5rem 0;
  background-color: #405e8b;
  color: #fff;
  font-family: "Jost", sans-serif;
  font-size: 2rem;
  width: 70rem;
  min-width: 50rem;
  height: 50rem;
  overflow-y: auto;
  position: relative;

  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 0.7rem;

  &__inputsBlock {
    overflow: hidden;
    overflow-y: auto;
    width: calc(100% - 1.5rem);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2.5rem;
    margin: 2rem 0;
  }
  &__input {
    box-sizing: border-box;
    width: 60%;
    height: 3.5rem;
    font-size: 2rem;
    border-radius: 0.6rem;
    border: 1px solid #dadada;
    background: rgba(142, 196, 245, 0.41);
    color: #ffff;
    padding: 0 3rem 0 1.5rem;
    position: relative;

    background-image: url("../assets/svg/text.svg");
    background-repeat: no-repeat;
    background-position: right center;
    background-size: 2.5rem;
    padding-right: 3rem;
  }

  &__input::placeholder {
    color: #fff;
  }
  &__input:focus {
    outline: none;
  }

  &__selectBlock {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  &__select {
    box-sizing: border-box;
    cursor: pointer;
    width: 60%;
    font-size: 2rem;
    height: 3.5rem;
    border-radius: 0.6rem;
    border: 1px solid #dadada;
    background: rgba(142, 196, 245, 0.41);
    color: #ffff;
    padding: 0 1rem;
  }
  &__select:focus {
    outline: none;
  }
}

select option {
  background-color: #417c9e;
  color: #ffff;
}

.createQuestion {
  position: absolute;
  bottom: 0;
  margin: 5rem 0;
  display: flex;
  gap: 3rem;
  .createButton {
    color: #fff;
    text-decoration: none;
    background: #3d9dd3;
    border-radius: 0.6rem;
    border: none;
    padding: 1rem;
    font-family: "Jost", sans-serif;
    font-size: 2rem;
    transition: all 0.3s ease;
    cursor: pointer;
    width: 20rem;
  }
  .createButton:hover {
    background: #417c9e;
  }
}
</style>
