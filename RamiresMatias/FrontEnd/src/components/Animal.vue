<template>
  <b-container>
    <b-card class="mt-5">
      <b-form>
        <b-row cols="3">
          <b-col>
            <b-form-group label="Nome animal:">
              <b-form-input
                type="text"
                v-model="animal.nome"
                placeholder="Digite o nome do animal"
                required
              ></b-form-input>
            </b-form-group>
          </b-col>

          <b-col>
            <b-form-group label="Nome da raça:">
              <b-form-input
                v-model="animal.raca"
                placeholder="Digite o nome da raça"
                required
              ></b-form-input>
            </b-form-group>
          </b-col>

          <b-col>
            <b-form-group label="Peso:">
              <b-form-input
                v-model="animal.peso"
                type="number"
                placeholder="Digite o peso"
                required
              ></b-form-input>
            </b-form-group>
          </b-col>
          <b-col>
            <b-form-group label="Código da fazenda(id):">
              <b-form-input
                v-model="animal.id_fazenda"
                type="number"
                placeholder="Digite o código da fazenda"
                required
              ></b-form-input>
            </b-form-group>
          </b-col>
          <b-col
            ><b-form-group label="Data nascimento:">
              <b-form-input
                v-model="animal.dt_nascimento"
                type="date"
                placeholder="Digite o peso"
                required
              ></b-form-input> </b-form-group
          ></b-col>
          <b-col
            ><b-form-group label="Pessoa">
              <b-row>
                <b-col cols="8">
                  <b-form-input
                    v-model="animal.fk_id_pessoa"
                    type="number"
                    placeholder="Digite o código da pessoa"
                    required
                  ></b-form-input>
                </b-col>
                <b-col>
                  <b-button v-b-toggle.my-collapse>Procurar</b-button>
                </b-col>
              </b-row>
            </b-form-group></b-col
          >

          <b-collapse id="my-collapse">
            <b-card title="Collapsible card"> Hello world! </b-card>
          </b-collapse>
          <b-col>
            <b-form-group label="Sexo">
              <b-form-select v-model="animal.sexo" class="select-sexo">
                <b-form-select-option value="M">Macho</b-form-select-option>
                <b-form-select-option value="F">Fêmea</b-form-select-option>
              </b-form-select>
            </b-form-group>
          </b-col>
        </b-row>
        <b-row class="mt-4 d-flex"
          ><b-col cols="1" align-self="start"
            ><b-button
              :variant="isEdit ? 'success' : 'primary'"
              size="lg"
              @click="cadastrarAnimal"
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
        :items="animais"
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
import moment from "moment";
export default {
  data() {
    return {
      id: null,
      isEdit: false,
      pessoas: [],
      animais: [],
      animal: {
        fk_id_pessoa: 0,
        id_fazenda: 0,
        nome: "",
        raca: "",
        sexo: "",
        peso: 0,
        dt_nascimento: "",
      },
      perPage: 3,
      currentPage: 1,
      filter: null,
      fields: [
        {
          key: "fk_id_pessoa",
          label: "Pessoa",
          /* Formtação para aparecer o nome da pessoa, ao invés do id na tabela */
          formatter: (value) => {
            let pessoa = this.pessoas.find((item) => {
              if (item.id == value) {
                return item.nome;
              }
            });
            return pessoa.nome;
          },
        },
        {
          key: "id_fazenda",
          label: "Fazenda",
        },
        {
          key: "sexo",
          label: "Sexo",
          formatter: (value) => {
            return value == "M" ? "Macho" : "Fêmea";
          },
        },
        {
          key: "nome",
          label: "Nome",
        },
        {
          key: "raca",
          label: "Raça",
        },
        {
          key: "peso",
          label: "Peso",
        },
        {
          key: "dt_nascimento",
          label: "Data de Nascimento",
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

  methods: {
    limpar() {
      this.animal = {};
      this.id = null;
    },
    cadastrarAnimal() {
      let metodo = this.id ? "patch" : "post";
      let finalUrl = this.id ? `/${this.id}` : ``;

      this.$http[metodo](`/animal${finalUrl}`, this.animal).then(() => {
        this.limpar();
        this.isEdit = false;
      });
    },
    editar(animal) {
      let idAnimal = this.animais.findIndex((item) => item.id == animal.id);

      this.isEdit = true;
      this.id = this.animais[idAnimal].id;
      this.animal = { ...this.animais[idAnimal] };
    },
    excluir(id) {
      this.$http
        .delete(`/animal/${id}`)
        .then(() => this.limpar())
        .catch((error) => {
          console.log(error);
        });
    },
  },
  created() {
    var arrayPessoa = [];
    this.$http.get("/pessoa").then((response) => {
      for (let chave in response.data) {
        let { id, nome } = response.data[chave];
        arrayPessoa.push({ id, nome });
      }
    });

    this.pessoas = arrayPessoa;

    this.$http.get("/animal").then((response) => {
      const array = [];
      for (let chave in response.data) {
        let {
          id,
          fk_id_pessoa,
          id_fazenda,
          nome,
          raca,
          sexo,
          peso,
          dt_nascimento,
        } = response.data[chave];
        array.push({
          id,
          fk_id_pessoa,
          id_fazenda,
          nome,
          raca,
          sexo,
          peso,
          dt_nascimento: moment(dt_nascimento).format("DD-MM-YYYY"),
        });
      }
      this.animais = array;
    });
  },
  computed: {
    rows() {
      return this.animais.length;
    },
  },
};
</script>