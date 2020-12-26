<template>
  <div>
    <b-container>
      <b-card class="mt-5">
        <b-form>
          <b-row cols="2">
            <b-col>
              <b-form-group label="Número lote">
                <b-form-input
                  type="number"
                  v-model="lote.num_lote"
                  placeholder="Digite o número do lote"
                  required
                ></b-form-input>
              </b-form-group>
            </b-col>

            <b-col>
              <b-form-group label="Descrição do lote:">
                <b-form-input
                  type="text"
                  v-model="lote.desc_lote"
                  placeholder="Digite o nome da raça"
                  required
                ></b-form-input>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row class="mt-4 d-flex"
            ><b-col cols="1" align-self="start"
              ><b-button
                :variant="isEdit ? 'success' : 'primary'"
                size="lg"
                @click="cadastrarLote"
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
          :items="lotes"
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      lotes: [],
      isEdit: false,
      id: null,
      lote: {
        num_lote: 0,
        desc_lote: "",
      },
      perPage: 3,
      currentPage: 1,
      filter: null,
      fields: [
        { key: "num_lote", label: "Número do lote" },
        {
          key: "desc_lote",
          label: "Descrição",
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
      this.lote = {};
      this.id = null;
    },
    cadastrarLote() {
      let metodo = this.id ? "patch" : "post";
      let finalUrl = this.id ? `/${this.id}` : ``;

      console.log(finalUrl);

      this.$http[metodo](`/lote${finalUrl}`, this.lote).then(() => {
        this.limpar();
        this.isEdit = false;
      });
    },
    editar(lote) {
      let idLote = this.lotes.findIndex((item) => item.id == lote.id);

      this.isEdit = true;
      this.id = this.lotes[idLote].id;
      this.lote = { ...this.lotes[idLote] };
    },
    excluir(id) {
      this.$http
        .delete(`/lote/${id}`)
        .then(() => this.limpar())
        .catch((error) => {
          console.log(error);
        });
    },
  },
  computed: {
    rows() {
      return this.lotes.length;
    },
  },
  created() {
    this.$http.get("/lote").then((response) => {
      const array = [];
      for (let chave in response.data) {
        let { id, num_lote, desc_lote } = response.data[chave];
        array.push({ id, num_lote, desc_lote });
      }
      this.lotes = array;
    });
  },
};
</script>

<style>
</style>