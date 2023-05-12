<template>
  <div class="container">
    <div class="questions">
      <div class="questions__inputsBlock">
        <input
          class="questions__input"
          placeholder="Введите название теста"
          type="text"
          v-model="TestName"
        />
        <div class="inputSection">
          <p>Введите дату создания теста</p>
          <input
            class="questions__date"
            placeholder="Введите дату создания теста"
            type="date"
            v-model="DateOfCreateTest"
          />
        </div>
        <div class="inputSection">
          <p>Введите дату окончания теста</p>
          <input
            class="questions__date"
            placeholder="Введите дату окончания теста"
            type="date"
            v-model="DateOfFinishTest"
          />
        </div>

        <!-- Тестирующихся может быть много - доработать -->
        <div class="questions__selectBlock">
          <select
            v-model="selected"
            @change="getRoleID(selected)"
            name=""
            id=""
            class="questions__select"
          >
            <option value="">Выберите кто проходит тест</option>
            <option
              v-for="RoleName in allRole"
              :key="RoleName.id"
              :value="RoleName.ID"
            >
              {{ RoleName.roule_name }}
            </option>
          </select>
        </div>
      </div>

      <div class="createQuestion">
        <button @click="saveTest" class="createButton">Добавить вопросы</button>
        <router-link to="/AddAndViewTest">
          <button class="createButton">Назад</button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      TestName: "",
      DateOfCreateTest: "",
      DateOfFinishTest: "",
      TestCreator: "",
      Tested: "",
      selected: "",
      allRole: this.$store.state.role,
      UserID: this.$store.state.UserID,
    };
  },
  methods: {
    async saveTest() {
      try {
        await axios.post("http://localhost:5000/Tests", {
          TestName: this.TestName,
          DateOfCreateTest: this.DateOfCreateTest,
          DateOfFinishTest: this.DateOfFinishTest,
          TestCreator: this.UserID,
          Tested: this.Tested,
        });
        this.TestName = "";
        this.DateOfCreateTest = "";
        this.DateOfFinishTest = "";
        this.TestCreator = "";
        this.Tested = "";
        this.$router.push("/CreateQuestionsForTests");
      } catch (err) {
        console.log(err);
      }
    },

    getRoleID(id) {
      this.Tested = id;
      console.log(this.Tested);
    },
  },
};
</script>

<style lang="scss" lang="scss" scoped>
.createQuestion {
  position: absolute;
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
    width: 20rem;
  }
  .createButton:hover {
    background: #417c9e;
  }
}

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
    width: 50%;
    height: 3.5rem;
    font-size: 2rem;
    border-radius: 0.6rem;
    border: 1px solid #dadada;
    background: rgba(142, 196, 245, 0.41);
    color: #ffff;
    padding: 0 3.5rem 0 1.5rem;
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
  &__date {
    box-sizing: border-box;
    width: 50%;
    height: 3.5rem;
    font-size: 2rem;
    border-radius: 0.6rem;
    border: 1px solid #dadada;
    background: rgba(142, 196, 245, 0.41);
    color: #ffff;
    padding: 0 1rem;
    cursor: pointer;
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
    width: 50%;
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
  }
  .createButton:hover {
    background: #417c9e;
  }
}
.inputSection {
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  margin: 0;
  padding: 0;
  gap: 0;
  p {
    margin: 0 0 0.5rem 0;
  }
}
input[type="date"]::-webkit-calendar-picker-indicator {
  filter: invert(1);
}
</style>
