<template>
  <b-container>
    <b-card class="mt-5">
      <b-form>
        <b-row cols="3">
          <b-col>
            <b-form-group label="Nome">
              <b-form-input
                type="text"
                v-model="pessoa.nome"
                placeholder="Digite o nome"
                required
              ></b-form-input>
            </b-form-group>
          </b-col>

          <b-col>
            <b-form-group label="E-mail">
              <b-form-input
                type="email"
                v-model="pessoa.email"
                placeholder="Digite o E-mail"
                required
              ></b-form-input>
            </b-form-group>
          </b-col>

          <b-col>
            <b-form-group label="Sexo">
              <b-form-select v-model="pessoa.sexo" class="select-sexo">
                <b-form-select-option value="M">Masculino</b-form-select-option>
                <b-form-select-option value="F">Feminino</b-form-select-option>
              </b-form-select>
            </b-form-group>
          </b-col>

          <b-col
            ><b-form-checkbox
              v-model="pessoa.ativo"
              @click="pessoa.ativo = !pessoa.ativo"
            >
              Ativo
            </b-form-checkbox></b-col
          >
        </b-row>
        <b-row class="mt-4 d-flex"
          ><b-col cols="1" align-self="start"
            ><b-button
              :variant="isEdit ? 'success' : 'primary'"
              size="lg"
              @click="cadastrarPessoa"
              >{{ this.isEdit ? "Salvar Edições" : "Cadastrar" }}</b-button
            ></b-col
          >
        </b-row>
      </b-form>
    </b-card>
    <hr />

    <b-row class="mt-5">
      <b-col lg="6" class="my-1">
        <b-form-group
          label="Filtro"
          label-for="filter-input"
          label-cols-sm="3"
          label-align-sm="right"
          label-size="sm"
          class="mb-0"
        >
          <b-input-group size="sm">
            <b-form-input
              id="filter-input"
              v-model="filter"
              type="search"
              placeholder="Pesquisar resultado na tabela"
            ></b-form-input>

            <b-input-group-append>
              <b-button :disabled="!filter" @click="filter = ''"
                >Limpar</b-button
              >
            </b-input-group-append>
          </b-input-group>
        </b-form-group>
      </b-col>
    </b-row>
    <b-row>
      <b-table
        id="table"
        :items="pessoas"
        :per-page="perPage"
        :current-page="currentPage"
        small
        :fields="fields"
        :filter="filter"
      >
        <template #cell(excluir)="row">
          <b-button variant="danger" @click="excluir(row.item.id)">
            Excluir
          </b-button>
        </template>
        <template #cell(editar)="row">
          <b-button variant="warning" @click="editar(row.item)">
            Editar
          </b-button>
        </template></b-table
      >
    </b-row>
    <b-row>
      <b-pagination
        v-model="currentPage"
        :total-rows="rows"
        :per-page="perPage"
        aria-controls="my-table"
      ></b-pagination>
    </b-row>
  </b-container>
</template>

<script>
export default {
  data() {
    return {
      pessoas: [],
      isEdit: false,
      id: null,
      pessoa: {
        nome: "",
        email: "",
        endereco: "",
        sexo: "",
        ativo: false,
      },
      /* Paginação */
      perPage: 3,
      currentPage: 1,
      filter: null,
      /* Campos que irá aparecer na tabela */
      fields: [
        { key: "nome", label: "Nome" },
        {
          key: "email",
          label: "E-mail",
        },
        {
          key: "sexo",
          label: "Sexo",
          formatter: (value) => {
            return value == "M" ? "Masculino" : "Feminino";
          },
        },
        {
          key: "ativo",
          label: "Ativo",
          formatter: (value) => {
            return value ? "Ativado" : "Desativado";
          },
        },
        { key: "excluir", label: "Excluir" },
        { key: "editar", label: "Editar" },
      ],
      Excluir: {
        id: "Excluir",
        title: "",
        content: "",
      },
      Editar: {
        id: "Editar",
        title: "",
        content: "",
      },
    };
  },
  computed: {
    rows() {
      return this.pessoas.length;
    },
  },

  methods: {
    /* Método para cadastrar. Caso o id seja diferente de null, ele faz uma requisição patch */
    cadastrarPessoa() {
      let metodo = this.id ? "patch" : "post";
      let finalUrl = this.id ? `/${this.id}` : ``;

      this.$http[metodo](`/pessoa${finalUrl}`, this.pessoa).then(() => {
        this.limpar();
        this.isEdit = false;
      });
    },
    /* Método para editar os dados contidos na tabela. Ao clicar em Editar os valores são recuperados 
      e inseridos no formulário */
    editar(user) {
      let idUser = this.pessoas.findIndex((item) => item.id == user.id);
      this.isEdit = true;

      this.id = this.pessoas[idUser].id;
      this.pessoa = { ...this.pessoas[idUser] };
    },
    /* Método para limpar o formulário após editá-lo ou salvá-lo */
    limpar() {
      this.pessoa = {};
      this.id = null;
    },
    excluir(id) {
      this.$http
        .delete(`/pessoa/${id}`)
        .then(() => console.log("Dado excluído"))
        .catch((error) => {
          console.log(error);
        });
    },
  },

  created() {
    this.$http.get("/pessoa").then((response) => {
      const array = [];
      /* Realizando a requisição e tratando os dados para que somente os dados principais, sejam salvos no array */
      for (let chave in response.data) {
        let { id, nome, email, endereco, sexo, ativo } = response.data[chave];
        array.push({ id, nome, email, endereco, sexo, ativo });
      }
      this.pessoas = array;
    });
  },
};
</script>

<style>
.select-sexo {
  width: 100%;
  height: 38px;
  border-radius: 5px;
}
</style>