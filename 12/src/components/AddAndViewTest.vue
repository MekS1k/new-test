<template>
  <div class="Container">
    <div class="ChooseQuestion">
      <img class="testsArt" src="../assets/svg/TestsArt.svg" alt="testsArt" />
      <div v-if="teacher" class="ChooseQuestion__adminSection">
        <button @click="createTest()" class="ChooseQuestion__addBtn">
          Создать тест
        </button>
      </div>
      <span class="ChooseQuestion__title"
        >Список всех тестов, всего: {{ filteredTests.length }}</span
      >
      <div class="ChooseQuestion__loader" v-if="dataLoad">
        <h2>Пожалуйста, подождите, идет загрузка</h2>
        <img src="../assets/svg/Loader.svg" alt="loader" />
      </div>
      <div class="ChooseQuestion__content">
        <div
          class="ChooseQuestion__testsBlock"
          v-for="test in filteredTests"
          :key="test.id"
        >
          <div>
            <button
              @click="getTestID(test.idTest)"
              class="ChooseQuestion__tests"
            >
              {{ test.TestName }}
            </button>
          </div>
        </div>
      </div>
      <router-link class="ChooseQuestion__adminSection" to="/">
        <button class="ChooseQuestion__addBtn">Выйти</button>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      test: [],
      teacher: true,
      userID: this.$store.state.UserID,
      dataLoad: true,
      filteredTests: [],
      role: this.$store.state.role,
    };
  },
  methods: {
    createTest() {
      this.$router.push({ name: "CreateDataTests" });
    },

    getTestID(testID) {
      const selectedTest = this.test.find((test) => test.idTest === testID);
      const endDate = new Date(selectedTest.DateOfFinishTest);
      const currentDate = new Date();
      const today = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate()
      );
      if (today > endDate) {
        alert("Извините, но время прохождения теста истекло.");
      } else {
        this.$store.state.testID = testID;
        console.log(this.$store.state.testID + "testID");
        this.$router.push({ name: "ViewQuestions" });
      }
    },

    async viewTest() {
      try {
        const test = await fetch("http://localhost:5000/Tests");
        const testJson = await test.json();
        console.log(testJson, "!!");
        this.test = testJson;
        this.$store.state.AllTests = this.test;

        this.dataLoad = false;
      } catch (err) {
        console.log(err);
        this.dataLoad = false;
      }
      this.filteredTests = this.test.filter(
        (test) =>
          test.TestCreator == this.userID ||
          test.Tested == this.$store.state.roleForUnderstande
      );
    },

    checkTeacher() {
      if (this.$store.state.roleForUnderstande == 2) {
        this.teacher = false;
      }
    },
  },
  mounted() {
    this.viewTest();
    this.checkTeacher();
    console.log(this.$store.state.UserID);
  },
};
</script>

<style lang="scss" scoped>
a {
  text-decoration: none;
  margin-bottom: 3rem;
}
.exit {
  bottom: 0;
  margin: 5rem 0;
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
  }
  .createButton:hover {
    background: #417c9e;
  }
}

.Container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-image: url(../assets/BackgroundLayout.png);
  background-size: cover;
  height: 100%;
}
.ChooseQuestion {
  padding: 1rem 0;
  margin: 5rem 0;
  background-color: #405e8b;
  color: #fff;
  font-family: "Jost", sans-serif;
  width: 60rem;
  height: 70rem;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 0.7rem;
  &__content {
    overflow: hidden;
    overflow-x: hidden;
    overflow-y: auto;
    width: 95%;
    height: 100%;
    margin-bottom: 2rem;
  }
  &__adminSection {
    width: 25rem;

    display: flex;
    justify-content: center;
    align-items: center;
  }
  &__addBtn {
    cursor: pointer;
    transition: all 0.3s ease;
    transform: translateY(1rem);
    margin: 1rem 0;
    padding: 0;
    background-color: #3d9dd3;
    color: #ffff;
    border: none;
    border-radius: 0.6rem;
    font-size: 3rem;
    font-family: "Jost", sans-serif;
    font-weight: bold;

    width: 100%;
    height: 5rem;
  }
  &__addBtn:hover {
    transform: translateY(0.5rem);
  }
  &__title {
    font-size: 3rem;
    font-family: "Jost", sans-serif;
    font-weight: bold;
    text-align: center;
    margin: 2rem;
    position: relative;
  }
  &__title::after {
    content: "";
    position: absolute;

    bottom: 0;
    left: 20%;
    width: 60%;
    margin: -5px 0;
    height: 1px; /* толщина подчеркивания */
    background-color: #ffffff; /* цвет подчеркивания */
  }
  &__loader {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    img {
      width: 10rem;
    }
  }
  &__testsBlock {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    gap: 1.5rem;
    padding: 2rem 0;
    margin-left: 1.4rem;
  }
  &__tests {
    background: rgba(142, 196, 245, 0.53);
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.5);
    border-radius: 0.5rem;
    border: none;
    width: 32rem;
    text-align: center;
    min-height: 3rem;
    color: #fff;
    font-family: "Jost", sans-serif;
    font-weight: bold;
    font-size: 3rem;
    max-width: 90%;
    max-height: 12rem;
    word-wrap: break-word;
    cursor: pointer;
    transition: all 0.2s ease;
  }
  &__tests:hover {
    background: rgba(26, 142, 250, 0.53);
  }
}
.testsArt {
  display: none;
}

//* Адаптив
@media (max-width: 600px) {
  /* CSS стили, применяемые для мобильных устройств */

  .testsArt {
    display: block;
  }
  .Container {
    background-image: none;
  }
  .ChooseQuestion {
    width: 100%;
    height: 100%;
    margin: 0;
    border-radius: 0;

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

    &__tests {
      font-size: 2rem;
      width: 25rem;
      min-height: 4rem;
    }
    &__testsBlock {
      gap: 1rem;
      padding: 1.5rem 0;
      margin-left: 1.5rem;
    }
    &__addBtn {
      font-size: 2rem;
    }
    &__adminSection {
      width: 20rem;
    }
    &__title {
      margin: 2.5rem 0 2rem 0;
      font-size: 2.2rem;
    }
  }
}
</style>
