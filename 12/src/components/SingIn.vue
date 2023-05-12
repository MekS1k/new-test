<template>
  <div class="Container">
    <div class="Container__SignIn">
      <img class="mobileArt" src="../assets/svg/SignInArt.svg" alt="art" />
      <form action="#">
        <div class="Form">
          <h1 class="Form__title">Здравствуйте!</h1>
          <!-- <div class="social-container">
						<a href="#" class="social"><i class="fab fa-facebook-f"></i></a>
						<a href="#" class="social"><i class="fab fa-google-plus-g"></i></a>
						<a href="#" class="social"><i class="fab fa-linkedin-in"></i></a>
					</div> -->

          <div class="inputBlock">
            <div class="Form__input">
              <img
                src="../assets/svg/Login.svg"
                class="inputImg"
                draggable="false"
                ondragstart="return false;"
                alt="loginlogo"
              />
              <p>Логин</p>
            </div>
            <input
              type="text"
              v-model="login"
              placeholder="Введите логин"
              class="input"
            />
          </div>

          <div class="inputBlock">
            <div class="Form__input">
              <img
                src="../assets/svg/Password.svg"
                class="inputImg"
                draggable="false"
                ondragstart="return false;"
                alt="passlogo"
              />
              <p>Пароль</p>
            </div>
            <input
              type="password"
              v-model="pass"
              placeholder="🞄🞄🞄🞄🞄🞄🞄🞄🞄🞄"
              class="input"
            />
          </div>

          <div class="Form__EnterBtn">
            <button class="Form__button" @click="signIn">Войти</button>
          </div>
        </div>
        <p
          class="Form__loginFail"
          :class="{ 'Form__loginFail--show': loginFailed }"
        >
          Неверный логин или пароль
        </p>
      </form>
    </div>
    <div class="Container__SvgBlock">
      <div class="Container__logo">
        <img
          src="../assets/svg/SignInLogo.svg"
          draggable="false"
          ondragstart="return false;"
          alt="Artlogo"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SingIn",
  data() {
    return {
      credentials: [],
      login: "",
      pass: "",
      role: [],
      UserID: "",
      loginFailed: false,
    };
  },
  methods: {
    // Create New product
    async TakeUser() {
      try {
        const credentials = await fetch("http://localhost:5000/credentials");
        const data = await credentials.json();
        this.credentials = data;
        this.$store.state.users = this.credentials;
        console.log(this.$store.state.users);
      } catch (err) {
        console.log(err);
      }
    },

    async takeRole() {
      try {
        const role = await fetch("http://localhost:5000/role");
        const data = await role.json();
        console.log(data);
        this.role = data;
        this.$store.state.role = this.role;
      } catch (err) {
        console.log(err);
      }
    },

    signIn() {
      this.loginFailed = false;
      console.log(this.credentials);
      const user = this.credentials.find(
        (cred) => cred.Логин === this.login && cred.Пароль === this.pass
      );
      if (user) {
        this.$router.push({ name: "AddAndViewTest" });
        this.UserID = user.UserID;
        this.$store.state.roleForUnderstande = user.IDРоли;
        this.$store.state.UserID = this.UserID;
      } else {
        this.loginFailed = true;
        console.log("Данные не верны");
      }
    },
  },
  mounted() {
    this.TakeUser();
    this.takeRole();
  },
};
</script>

<style lang="scss" scoped>
.Container {
  color: #4a4543;
  width: 100%;
  max-width: 100%;
  height: 100%;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 1rem;
  font-size: 3rem;

  &__SignIn {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%; /* ширина 100% */
    max-width: 36rem;
    margin: 0 auto;
    font-size: 3rem;
    color: #4a4543;
  }
  &__SvgBlock {
    width: 100%;
    background-color: #3d9dd3;
    display: flex;
    justify-content: center;
    align-items: center;

    img {
      width: 45rem;
    }
  }
  &__logo {
    display: flex;
    justify-content: center;
  }

  form {
    width: 100%;
  }
  .input {
    width: 98%;
    font-size: 3rem;
  }
  .inputBlock {
    width: 100%;
    font-size: 3rem;
  }
}
.mobileArt {
  display: none;
}

h1 {
  margin: 0;
}
.Form {
  font-size: 4rem;
  display: flex;
  flex-direction: column;
  img {
    width: 7%;
  }
  &__title {
    text-align: center;
    font-weight: 400;
    font-size: 4rem;
    color: black;
  }
  &__input {
    display: flex;
    gap: 0.5rem;
    justify-content: start;
    align-items: center;
    height: 5rem;
    margin-top: 1.5rem;
  }
  &__EnterBtn {
    margin: 2rem 0;
    display: flex;
    justify-content: center;
    width: 100%;
  }
  &__button {
    padding: 0;
    color: #ffffff;
    width: 100%;
    height: 4.5rem;
    font-size: 2.7rem;
    text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    background-color: #3d9dd3;
    border: none;
    border-radius: 0.6rem;
    cursor: pointer;
    transition: all 0.3s ease;
  }
  &__button:hover {
    opacity: 0.8;
  }
  &__loginFail {
    opacity: 0;
    color: #cb0000;
    font-size: 2rem;
    text-align: center;
    transition: all 0.5s ease;
    transform: translateY(1rem);
  }

  &__loginFail--show {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 820px) {
  .Container {
    grid-template-columns: 1fr;
    font-size: 2rem;
  }

  .Container__SvgBlock {
    display: none;
  }
  .mobileArt {
    display: block;
    width: 25rem;
    height: 25rem;
  }
  .Form {
    &__title {
      font-size: 3.5rem;
    }
    img {
      width: 100%;
    }
    &__button {
      width: 50%;
      font-size: 2rem;
    }
  }
  .inputBlock {
    font-size: 2rem !important;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .input {
    width: 80% !important;
  }

  p {
    padding-top: 0.5rem;
  }
}
</style>
